from .views import *

from django.urls import path

urlpatterns = [
    path('sign-in', SignInView.as_view(), name='sign_in'),
    path('sign-up', SignUpView.as_view(), name='sign_up'),
    path('sign-out', SignOutView.as_view(), name='sign_out'),
    path('token', SignInView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path(r'activation/<uidb64>/<token>',
         ActivationView.as_view(), name="user_activation"),
    # path('forgot-password/', admin.site.urls),
    # path('password-reset/', admin.site.urls),
]
