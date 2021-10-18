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


class PasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {
            'id': {'read_only': True},
            'username': {'read_only': True},
            # 'password': {'write_only': True},
        }


class TokenSerializer(serializers.HyperlinkedModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Token
        fields = ('key', 'user')
        extra_kwargs = {
            'key': {'read_only': True}
        }


class AddressSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Address
        fields = ['user', 'city', 'state', 'street', 'zip_code']

    extra_kwargs = {
        'user': {'validators': []}
    }
    depth = 1


class ProfileSerializer(serializers.ModelSerializer):
    address = AddressSerializer()

    class Meta:
        model = Profile
        fields = ['user', 'bio', 'address',
                  'birth_date', 'email_confirmed', 'image']

        extra_kwargs = {
            'address.user': {'validators': []}
        }

        depth = 1

    def create(self, validated_data):
        return(Profile.objects.create(user=validated_data['user']))

    def update(self, instance, validated_data):
        for field in validated_data:
            if (field == 'address'):
                validated_data.get('address').pop('user')
                for field_address in validated_data['address']:
                    instance.address.__setattr__(
                        field_address, validated_data['address'].get(field_address))
                    instance.address.save()

            else:
                instance.__setattr__(field, validated_data.get(field))
        instance.save()
        return(instance)
