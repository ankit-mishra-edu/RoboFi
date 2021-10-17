from django.db import models
from django.contrib.auth import authenticate

from rest_framework import serializers
from backend.pages.users.models import User, Token
from backend.pages.users.detail.serializers import UserSerializer


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
