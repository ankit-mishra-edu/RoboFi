from copy import deepcopy

from rest_framework import permissions, status, views
from rest_framework.response import Response

from ...users.models import User
from ..models import Configuration
from .serializers import ConfigurationSerializer

# Create your views here.


class ConfigurationList(views.APIView):
    queryset = Configuration.objects.all()
    serializer_class = ConfigurationSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        user_id = self.request.query_params.get('user')
        if user_id is not None:
            try:
                user: User = User.objects.get(pk=user_id)
            except User.DoesNotExist:
                return Response(data={'detail': f"Invalid id {user_id} for User"}, status=404)
            try:
                configurations = Configuration.objects.filter(
                    user=user).first()
            except Configuration.DoesNotExist:
                return Response(data={'detail': f"Invalid user id {user_id} for Configuration"}, status=404)

            serializer = self.serializer_class(configurations)
        else:
            configurations = Configuration.objects.all()
            serializer = self.serializer_class(configurations, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ConfigurationDetail(views.APIView):
    queryset = Configuration.objects.all()
    serializer_class = ConfigurationSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, pk, *args, **kwargs):
        try:
            configuration = Configuration.objects.get(pk=pk)
        except Configuration.DoesNotExist:
            return Response(data={'detail': f"Invalid id {pk} for Configuration"}, status=404)

        serializer = self.serializer_class(configuration)
        return Response(serializer.data)

    def patch(self, request, pk, *args, **kwargs):
        try:
            configuration = Configuration.objects.get(pk=pk)
        except Configuration.DoesNotExist:
            return Response(data={'detail': f"Invalid id {pk} for Configuration"}, status=404)

        try:
            serializer = self.serializer_class(
                configuration, data=request.data, partial=True)
            if serializer.is_valid(raise_exception=False):
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors)
        except Exception as exception:
            return Response(data={'detail': str(exception)}, status=500)

    def delete(self, request, pk, *args, **kwargs):
        try:
            configuration_to_be_deleted: Configuration = Configuration.objects.get(
                pk=pk)
        except Configuration.DoesNotExist:
            return Response(data={'detail': f"Invalid id {pk} for Configuration"}, status=404)

        configuration_to_be_deleted.delete()
        return Response(status=204)
