from django.contrib.auth import login
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from ...users.models import User
from .serializers import SignInSerializer


class SignInView(TokenObtainPairView):
    serializer_class = SignInSerializer

    def post(self, request, *args, **kwargs):
        returnValue: Response = super().post(request, *args, **kwargs)
        try:
            user = User.objects.get(username=request.data['username'])
        except User.DoesNotExist:
            return Response(status=404)

        login(request=request, user=user)
        return returnValue
