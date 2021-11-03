from .serializers import SignInSerializer

from rest_framework_simplejwt.views import TokenObtainPairView


class SignInView(TokenObtainPairView):
    serializer_class = SignInSerializer
