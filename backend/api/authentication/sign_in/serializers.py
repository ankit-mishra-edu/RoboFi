from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from ...users.detail.serializers import UserSerializer


class SignInSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['user'] = UserSerializer(user).data

        return token
