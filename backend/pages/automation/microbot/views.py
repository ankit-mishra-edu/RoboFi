from copy import deepcopy

from django.conf import settings
from rest_framework import permissions, serializers, status, views
from rest_framework.response import Response

from ..Framework.DetailsJSON import (create_details_file, delete_details_file,
                                     update_details_file)
from ..models import Microbot
from .serializers import MicrobotSerializer

# Create your views here.


class MicrobotList(views.APIView):
    queryset = Microbot.objects.all()
    serializer_class = MicrobotSerializer
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    authentication_classes = []

    def get(self, request, *args, **kwargs):
        microbots = Microbot.objects.all()
        serializer = self.serializer_class(microbots, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            create_details_file(deepcopy(serializer.data))
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MicrobotDetail(views.APIView):
    queryset = Microbot.objects.all()
    serializer_class = MicrobotSerializer
    # permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, pk, *args, **kwargs):
        try:
            microbot = Microbot.objects.get(pk=pk)
        except Microbot.DoesNotExist:
            return Response(data={'detail': f"Invalid id {pk} for Microbot"}, status=404)

        serializer = self.serializer_class(microbot)
        return Response(serializer.data)

    def patch(self, request, pk, *args, **kwargs):
        try:
            microbot = Microbot.objects.get(pk=pk)
        except Microbot.DoesNotExist:
            return Response(data={'detail': f"Invalid id {pk} for Microbot"}, status=404)

        try:
            serializer = self.serializer_class(
                microbot, data=request.data, partial=True)
            if serializer.is_valid(raise_exception=False):
                serializer.save()
                update_details_file(deepcopy(serializer.data))
                return Response(serializer.data)
            return Response(serializer.errors)
        except Exception as exception:
            return Response(data={'detail': str(exception)}, status=500)

    def delete(self, request, pk, *args, **kwargs):
        try:
            microbot_to_be_deleted: Microbot = Microbot.objects.get(pk=pk)
        except Microbot.DoesNotExist:
            return Response(data={'detail': f"Invalid id {pk} for Microbot"}, status=404)

        serializer = self.serializer_class(microbot_to_be_deleted)
        delete_details_file(deepcopy(serializer.data))
        microbot_to_be_deleted.delete()
        return Response(serializer.data, status=204)
