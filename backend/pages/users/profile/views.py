from rest_framework import authentication, permissions, views
# All rest framework imports
from rest_framework.response import Response

from ..models import Profile, User
from .serializers import ProfileSerializer


class UserProfileView(views.APIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    # permission_classes = (permissions.IsAuthenticated, )
    # authentication_classes = (authentication.TokenAuthentication,)

    def get(self, request, pk=None, *args, **kwargs):
        if pk is not None:
            try:
                profile = Profile.objects.get(pk=pk)
            except Profile.DoesNotExist:
                return Response(data={'detail': f"Invalid id {pk} for Profile"}, status=404)

            serializer = self.serializer_class(profile)
            return Response(serializer.data)

        profiles = Profile.objects.all()
        serializer = self.serializer_class(profiles, many=True)
        return Response(serializer.data)

    def patch(self, request, pk, *args, **kwargs):
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response(data={'detail': f"Invalid id {pk} for User"}, status=404)

        try:
            profile = Profile.objects.get(user=user)
        except Profile.DoesNotExist:
            return Response(data={'detail': f"Invalid id {pk} for Profile"}, status=404)

        try:
            serializer = self.serializer_class(
                profile, data=request.data, partial=True)
            if serializer.is_valid(raise_exception=False):
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors)
        except Exception as exception:
            return Response(data={'detail': str(exception)}, status=500)
