from typing import List

from django.core.exceptions import ValidationError
from drf_writable_nested.serializers import WritableNestedModelSerializer
from rest_framework import serializers

from ...users.detail.serializers import UserSerializer
from ...users.models import User
from ..models import Configuration
from .models import Entry


class ConfigurationEntrySerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Entry
        fields = ['id', 'user', 'value', 'name']

    def to_internal_value(self, data):
        internal_data = super().to_internal_value(data)
        try:
            user_id = data.get('user').get('id')
        except:
            user_id = data.get('user')
        try:
            user = User.objects.get(pk=user_id)
        except User.DoesNotExist:
            raise ValidationError(
                {'user': ['Invalid user primary key']},
                code='invalid',
            )
        internal_data['user'] = user
        return internal_data


class ConfigurationSerializer(WritableNestedModelSerializer):
    user = UserSerializer(read_only=True)
    entries = ConfigurationEntrySerializer(many=True, read_only=False)

    class Meta:
        model = Configuration
        fields = ['id', 'user', 'entries']
        depth = 1

    def to_internal_value(self, data):
        internal_data = super().to_internal_value(data)
        try:
            user_id = data.get('user').get('id')
        except:
            user_id = data.get('user')
        try:
            user = User.objects.get(pk=user_id)
        except User.DoesNotExist:
            raise ValidationError(
                {'user': ['Invalid user primary key']},
                code='invalid',
            )
        internal_data['user'] = user
        return internal_data
