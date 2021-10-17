from django.db import models
from django.contrib.auth import authenticate

from rest_framework import serializers
from rest_framework import exceptions as drf_exceptions
from pages.users.models import User
from pages.users.serializers import UserSerializer

# Serializers define the API representation.

from rest_framework.authtoken.models import Token


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


class LoginSerializer(serializers.Serializer):
    user = UserSerializer()
    key = serializers.ReadOnlyField()

    class Meta:
        model = Token
        fields = ('user', 'key')
        extra_kwargs = {
            'key': {'read_only': True},
            'user.password': {'write_only': True},
            'user.email': {'read_only': True},
        }

    def validate(self, loginData):
        username = loginData['user'].get('username', "")
        password = loginData['user'].get('password', "")
        try:
            loginData["user"] = user = None
            if (username and password):
                user = authenticate(username=username, password=password)
                if (user is not None):
                    if (user.is_active):
                        token = Token.objects.filter(user=user).first()
                        # print(Token.objects.all())
                        loginData["user"] = token.user
                        loginData["key"] = token.key
                        # print("Valudated_data", loginData)
                        return(token)
                    else:
                        raise (drf_exceptions.ValidationError(
                            "User is not Active"))
                else:
                    raise (drf_exceptions.AuthenticationFailed(
                        "User is not found"))

            else:
                msg = "Must provide username and Password"
                raise drf_exceptions.ValidationError(msg)
        except Exception as e:
            print("Exception in serializer validate", e)
            print(loginData)
            return(loginData)


class TokenSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Token
        fields = ('key', 'user')
