from typing import List

from django.core.exceptions import ValidationError
from rest_framework import serializers

from ...users.detail.serializers import UserSerializer
from ...users.models import User
from ..models import Configuration
from .models import Entry


class ConfigurationEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Entry
        fields = ['id', 'user', 'value', 'name']


class ConfigurationSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
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

        configuration.entries.add(
            *tuple(Entry.objects.create(**entry).id for entry in entries))

        configuration.save()

        return configuration

    def update(self, instance: Configuration, validated_data):
        updated_entries = validated_data.pop("entries")
        entries = instance.entries.all()

        instance: Configuration = super().update(instance, validated_data)
        for updated_entry in updated_entries:
            entry: Entry = entries.filter(user=updated_entry.get(
                'user'), name=updated_entry.get('name')).first()
            if entry is not None:
                entry.name = updated_entry.get('name', None)
                entry.value = updated_entry.get('value', None)
                entry.save()
            else:
                instance.entries.add(Entry.objects.create(**updated_entry).id)

        instance.save()
        return instance
