from django.shortcuts import render
from rest_framework import authentication, permissions
from rest_framework.response import Response
from django.contrib.auth import logout as django_logout

from rest_framework import views

# Create your views here.


class SignOutView(views.APIView):
    permission_classes = (permissions.IsAuthenticated, )
    authentication_classes = (authentication.TokenAuthentication, )

    def post(self, request):
        try:
            # print(request)
            django_logout(request)
        except Exception as exception:
            return(Response(False, status=401))
        else:
            return(Response(True, status=200))
