from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import EmailMessage
from django.http import HttpResponseRedirect
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from rest_framework import permissions, views
from rest_framework.response import Response
from robofi.celery.tasks import create_email

from ...users.models import Token, User
from .serializers import ActivationSerializer, SignUpSerializer


class SignUpView(views.APIView):
    queryset = User.objects.all()
    serializer_class = SignUpSerializer
    authentication_classes = []

    @classmethod
    def get_extra_actions(cls):
        return([])

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

    def send_email(self, request, user, token):

        uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
        current_site = get_current_site(request)
        activation_link = f"https://{current_site.domain}/api/authentication/activation/{uidb64}/{token}"

        subject = "Activation link for RoboFi Application."
        create_email.delay(
            user_id=token.user.id,  # user ID - this must be added
            email_account="do not reply",  # the email account being used
            subject=subject,
            email=token.user.username,  # who to email
            cc=[],
            template="email.html",  # template to be used
            context={"username": token.user.username,
                     "activation_link": activation_link}
        )


class ActivationView(views.APIView):
    queryset = User.objects.all()
    serializer_class = ActivationSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )

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
