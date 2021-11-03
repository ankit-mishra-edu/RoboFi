from pages.users.detail.serializers import UserSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class SignInSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['user'] = UserSerializer(user).data

        return token
