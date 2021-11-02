from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import *

urlpatterns = [
    path('sign-in/', SignInView.as_view()),
    path('sign-up/', SignUpView.as_view()),
    path('sign-out/', SignOutView.as_view()),
    path(r'activation/<uidb64>/<token>/',
         ActivationView.as_view(), name="activation"),
    # path('forgot-password/', admin.site.urls),
    # path('password-reset/', admin.site.urls),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
