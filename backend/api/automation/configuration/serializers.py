from django.core.exceptions import ValidationError
from rest_framework import serializers

from ...users.models import User
from ..models import Configuration
from .models import Entry


class ConfigurationEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Entry
        fields = '__all__'


class ConfigurationSerializer(serializers.ModelSerializer):
    entries = ConfigurationEntrySerializer(many=True, read_only=False)

    class Meta:
        model = Configuration
        fields = ['id', 'user', 'entries']
        depth = 1

    def to_internal_value(self, data):
        internal_data = super().to_internal_value(data)
        try:
            user = User.objects.get(pk=data.get('user'))
        except User.DoesNotExist:
            raise ValidationError(
                {'user': ['Invalid user primary key']},
                code='invalid',
            )
        internal_data['user'] = user
        return internal_data

    def create(self, validated_data: dict):
        entries = validated_data.pop("entries")

        configuration: Configuration = super().create(validated_data)

        for entry in entries:
            configuration.entries.add(Entry.objects.create(**entry).id)

        configuration.save()

        return configuration
