from django.contrib.auth import authenticate
from django.contrib.auth import login as django_login
from django.contrib.auth import logout as django_logout
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import EmailMessage
from django.http import HttpResponseRedirect
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from pages.users.models import Token, User
from rest_framework import views
from rest_framework.response import Response

from .serializers import ActivationSerializer, SignUpSerializer


class SignUpView(views.APIView):
    queryset = User.objects.all()
    serializer_class = SignUpSerializer
    # authentication_classes = (authentication.TokenAuthentication, )
    # permission_classes = [IsAuthenticated,]

    @classmethod
    def get_extra_actions(cls):
        return([])

    def get(self, request):
        queryset = Token.objects.all()
        serializer = SignUpSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        try:
            serializer = SignUpSerializer(data={'user': request.data})
            serializer.is_valid(raise_exception=True)
            token = serializer.save()
        except Exception as e:
            return(Response(serializer.errors, status=404))
        else:
            self.send_email(request, token.user, token.key)
            return(Response(serializer.data, status=201))

    def patch(self, request, *args, **kwargs):
        try:
            id = request.data.get('id', None)
            original_user = User.objects.get(pk=id)
        except User.DoesNotExist:
            return Response(status=404)

        try:
            serializer = SignUpSerializer(original_user,
                                          data={'user': request.data},
                                          context={'is_active': request.data.get(
                                              'is_active', None)},
                                          partial=True)

            serializer.is_valid(raise_exception=True)

        except Exception as e:
            return(Response(serializer.errors, status=404))

        else:
            updated_user = serializer.save()
            return(Response(serializer.data, status=200))

    def send_email(self, request, user, token):

        uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
        current_site = get_current_site(request)
        activation_link = f"http://{current_site.domain}/authentication/activation/{uidb64}/{token}/"

        subject = "Activation link for RoboFi Application."
        body = f"""Hi {user.username},

Please click on the following link to activate your registered account on AE scheduler web application.

Activation Link : {activation_link}

Regards,
Ankit

"""

        email = EmailMessage(
            subject,
            body,
            'amishm766@gmail.com',
            [request.data['email']]
        )
        email.send()
        # email.send(fail_silently=True)


class ActivationView(views.APIView):
    queryset = User.objects.all()
    serializer_class = ActivationSerializer
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly, )

    def get(self, request, uidb64, token):
        try:
            token = Token.objects.get(key=token)
        except Token.DoesNotExist:
            return Response(status=404)

        try:
            user = token.user
        except:
            return Response(status=404)

        user.is_active = True
        user.save()
        return HttpResponseRedirect(f'https://{get_current_site(request).domain}/')
