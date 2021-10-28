from django.http import Http404
from pages.users.models import Profile, User
from rest_framework import authentication, permissions, status, views, viewsets
from rest_framework.decorators import action
# All rest framework imports
from rest_framework.response import Response

from .serializers import UserSerializer


class UserDetailView(viewsets.ModelViewSet):
    http_method_names = ['get']
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
