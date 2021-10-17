from django.db import models
from django.contrib.auth import authenticate

from rest_framework import serializers
from rest_framework import exceptions as drf_exceptions
from backend.pages.users.models import User, Token
from backend.pages.users.detail.serializers import UserSerializer


class SignUpSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Token
        fields = ['user', 'key']
        extra_kwargs = {
            'key': {'read_only': True},
            'user.password': {'write_only': True},
        }

    def create(self, validated_data):
        """ Parent class create(self, validated_data) is overridden
            to create a User and set the user as inactive till the
            user is activated through email.
            To call this method call :
            serializer = RegisterSerializer(
                data={'user': user_data_dictionary})
            Returns the user object created
        """
        # print(validated_data)
        user = User.objects.create_user(**validated_data['user'])
        user.is_active = False
        key = Token.objects.create(user=user)
        print(key)
        token = Token.objects.filter(user=user).first()
        user.save()
        return(token)

    def update(self, instance, validated_data):
        if (self.context.get('is_active') is not None):
            instance.is_active = False
            instance.save()
            print('in if condition', instance.is_active)

        else:
            for field in validated_data['user']:
                if (field == 'password'):
                    instance.set_password(validated_data['user'].get(field))
                else:
                    instance.__setattr__(
                        field, validated_data['user'].get(field))
        instance.save()
        return(Token.objects.filter(user=instance)[0])


class ActivationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Token

        fields = ['key', 'user']
