from django.db import models
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from ..models import User


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name',
                  'last_name', 'email', 'password')
        extra_kwargs = {
            'id': {'read_only': True},
            'password': {'write_only': True},
            'username': {'validators': []},
            'email': {'validators': []}
        }


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name',
                  'last_name', 'email')
        extra_kwargs = {
            'id': {'read_only': True},
        }

    def update(self, instance, validated_data):
        if (self.context.get('is_active') is not None):
            instance.is_active = self.context.get('is_active')

        else:
            for field in validated_data:
                instance.__setattr__(
                    field, validated_data.get(field))
        instance.save()
        return instance


class ChangePasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'password')
        extra_kwargs = {
            'id': {'read_only': True},
        }

    def update(self, instance, validated_data):
        instance.set_password(validated_data.get('password'))
        instance.save()
        try:
            user = User.objects.get(pk=instance.id)
        except User.DoesNotExist:
            return ValidationError(detail="User does not exists")
        return user
