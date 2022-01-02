from django.db import models
from rest_framework import serializers

from ..models import Address, Profile, User


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


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['user', 'city', 'state', 'street', 'zip_code']

        extra_kwargs = {
            'user': {'read_only': True}
        }


class ProfileSerializer(serializers.ModelSerializer):
    address = AddressSerializer()

    class Meta:
        model = Profile
        fields = ['user', 'bio', 'address',
                  'birth_date', 'email_confirmed', 'image']

        extra_kwargs = {
            'user': {'read_only': True},
            'address.user': {'validators': []}
        }

    def update(self, instance, validated_data):
        for field in validated_data:
            if (field == 'address'):
                for field_address in validated_data['address']:
                    instance.address.__setattr__(
                        field_address, validated_data['address'].get(field_address))
                    instance.address.save()

            else:
                instance.__setattr__(field, validated_data.get(field))
        instance.save()
        return(instance)
