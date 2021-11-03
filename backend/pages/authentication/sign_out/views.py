from django.contrib.auth import logout

from rest_framework.response import Response
from rest_framework import permissions, views


class SignOutView(views.APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def post(self, request):
        try:
            logout(request)
        except Exception as exception:
            return(Response(False, status=401))
        else:
            return(Response(True, status=200))
