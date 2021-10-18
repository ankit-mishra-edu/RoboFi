from django.http import HttpResponseRedirect
from django.utils.encoding import force_text, force_bytes
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode

from django.core.mail import EmailMessage
from django.contrib.auth import authenticate
from django.contrib.auth import login as django_login
from django.contrib.auth import logout as django_logout
from django.contrib.sites.shortcuts import get_current_site

from .serializers import SignInSerializer

from pages.users.models import User
from rest_framework.response import Response
from rest_framework import views


class SignInView(views.APIView):
    queryset = User.objects.all()

    @classmethod
    def get_extra_actions(cls):
        return([])

    def get(self, request):
        queryset = User.objects.all()
        serializer_class = SignInSerializer(queryset, many=True)
        return Response(serializer_class.data, status=201)

    def post(self, request):
        try:
            # print(request.data)
            serializer_class = SignInSerializer(data={'user': request.data})
            serializer_class.is_valid()

        except Exception as exception:
            print("Exception in Login View : ", exception)
            return(Response(serializer_class.errors, status=500))

        else:
            try:
                user = serializer_class.validated_data.user
            except Exception:
                return(Response("Invalid username or password", status=401))
            else:
                django_login(request, user)
                # print("Serializer Data", serializer_class.data)
                return(Response(serializer_class.data, status=200))
