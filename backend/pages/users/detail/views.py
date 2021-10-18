from django.http import Http404

# All rest framework imports
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import authentication, permissions, status, views, viewsets

from pages.users.models import User, Profile
from .serializers import UserSerializer, PasswordSerializer, ProfileSerializer


class UserDetailView(viewsets.ModelViewSet):
    http_method_names = ['get']
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
