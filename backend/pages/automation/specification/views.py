from copy import deepcopy

from rest_framework import permissions, status, views
from rest_framework.response import Response

from ..models import Specification
from .details import (create_details_file, delete_details_file,
                      update_details_file)
from .serializers import SpecificationSerializer

# Create your views here.


class SpecificationList(views.APIView):
    queryset = Specification.objects.all()
    serializer_class = SpecificationSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    authentication_classes = []

    def get(self, request, *args, **kwargs):
        specifications = Specification.objects.all()
        serializer = self.serializer_class(specifications, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            create_details_file(deepcopy(serializer.data))
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SpecificationDetail(views.APIView):
    queryset = Specification.objects.all()
    serializer_class = SpecificationSerializer
    # permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, pk, *args, **kwargs):
        try:
            specification = Specification.objects.get(pk=pk)
        except Specification.DoesNotExist:
            return Response(data={'detail': f"Invalid id {pk} for Specification"}, status=404)

        serializer = self.serializer_class(specification)
        return Response(serializer.data)

    def patch(self, request, pk, *args, **kwargs):
        try:
            specification = Specification.objects.get(pk=pk)
        except Specification.DoesNotExist:
            return Response(data={'detail': f"Invalid id {pk} for Specification"}, status=404)

        try:
            serializer = self.serializer_class(
                specification, data=request.data, partial=True)
            if serializer.is_valid(raise_exception=False):
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors)
        except Exception as exception:
            return Response(data={'detail': str(exception)}, status=500)

    def delete(self, request, pk, *args, **kwargs):
        try:
            specification_to_be_deleted: Specification = Specification.objects.get(
                pk=pk)
        except Specification.DoesNotExist:
            return Response(data={'detail': f"Invalid id {pk} for Specification"}, status=404)

        specification_to_be_deleted.delete()
        return Response(status=204)
