from django.http import Http404
from pages.users.models import Profile, User
from rest_framework import authentication, permissions, status, views, viewsets
from rest_framework.decorators import action
# All rest framework imports
from rest_framework.response import Response

from .serializers import UserSerializer


class UserDetailView(viewsets.ModelViewSet):
    http_method_names = ['get', 'delete']
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


# class UserDetailView(views.APIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     # permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

#     def get(self, request, pk=None, *args, **kwargs):
#         if pk is not None:
#             try:
#                 user = User.objects.get(pk=pk)
#             except User.DoesNotExist:
#                 return Response(data={'detail': f"Invalid id {pk} for User"}, status=404)

#             serializer = self.serializer_class(user)
#             return Response(serializer.data)

#         users = User.objects.all()
#         serializer = self.serializer_class(users, many=True)
#         return Response(serializer.data)

#     def delete(self, request, pk, *args, **kwargs):
#         try:
#             user_to_deleted = User.objects.get(pk=pk)
#         except User.DoesNotExist:
#             return Response(data={'detail': f"Invalid id {pk} for User"}, status=404)

#         try:
#             serializer = self.serializer_class(user_to_deleted)
#             user_to_deleted.delete()
#             return Response(serializer.data, status=204)
#         except Exception as exception:
#             return Response(data={'detail': str(exception)}, status=500)
