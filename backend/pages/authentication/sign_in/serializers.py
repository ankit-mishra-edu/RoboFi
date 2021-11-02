from django.contrib.auth import authenticate
from django.db import models
from pages.users.detail.serializers import UserSerializer
from pages.users.models import Token, User
from rest_framework import exceptions as drf_exceptions
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class SignInSerializer(serializers.Serializer):
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


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['user'] = UserSerializer(user).data

        return token
