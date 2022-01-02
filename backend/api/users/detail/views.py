from rest_framework import permissions, views
# All rest framework imports
from rest_framework.response import Response

from ..models import User
from .serializers import ChangePasswordSerializer, UserDetailSerializer


class UsersDetailsView(views.APIView):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    authentication_classes = []

    def get(self, request, pk=None, *args, **kwargs):
        users = User.objects.all()
        serializer = self.serializer_class(users, many=True)
        return Response(serializer.data)


class UserDetailView(views.APIView):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer
    # permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, pk, *args, **kwargs):
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response(data={'detail': f"Invalid id {pk} for User"}, status=404)

        serializer = self.serializer_class(user)
        return Response(serializer.data)

    def patch(self, request, pk, *args, **kwargs):
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response(data={'detail': f"Invalid id {pk} for User"}, status=404)

        try:
            serializer = self.serializer_class(
                user, data=request.data, context={'is_active': request.data.get(
                    'is_active', None)}, partial=True)
            if serializer.is_valid(raise_exception=False):
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors)
        except Exception as exception:
            return Response(data={'detail': str(exception)}, status=500)

    def delete(self, request, pk, *args, **kwargs):
        try:
            user_to_be_deleted = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response(data={'detail': f"Invalid id {pk} for User"}, status=404)

        serializer = self.serializer_class(data=user_to_be_deleted)
        if serializer.is_valid():
            return Response(data=serializer.data, status=204)
        return Response(data=serializer.errors, status=400)


class ChangePassowordView(views.APIView):
    queryset = User.objects.all()
    serializer_class = ChangePasswordSerializer
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    authentication_classes = []

    def patch(self, request, pk, *args, **kwargs):
        try:
            original_user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response(status=404)

        serializer = self.serializer_class(
            original_user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)

        return Response(serializer.errors, status=404)
