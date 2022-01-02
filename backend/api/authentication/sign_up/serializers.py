from rest_framework import serializers

from ...users.detail.serializers import UserSerializer
from ...users.models import Token, User


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
        user = User.objects.create_user(**validated_data['user'])
        user.is_active = False
        token = Token.objects.filter(user=user).first()
        user.save()
        return(token)


class ActivationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Token

        fields = ['key', 'user']
