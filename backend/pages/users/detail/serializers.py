from django.db import models
from pages.users.models import Address, Profile, Token, User
from rest_framework import serializers

# Serializers define the API representation.


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
        # abstract = False
