from django.contrib import admin
from django.urls import path

from .views import *

urlpatterns = [
    path('sign-in/', SignInView.as_view()),
    path('sign-up/', SignUpView.as_view()),
    path('sign-out/', SignOutView.as_view()),
    path('activation/', ActivationView.as_view()),
    # path('forgot-password/', admin.site.urls),
    # path('password-reset/', admin.site.urls),
]