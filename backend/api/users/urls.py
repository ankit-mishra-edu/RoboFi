from django.urls import path

from .views import *

urlpatterns = [
    path(r'profiles', UserProfileView.as_view(), name="profiles"),
    path(r'<int:pk>/profiles', UserProfileView.as_view(), name="user-profile"),

    path(r'details', UsersDetailsView.as_view(), name="details"),
    path(r'<int:pk>/details', UserDetailView.as_view(), name="user-detail"),

    path(r'<int:pk>/change-password',
         ChangePassowordView.as_view(), name="change-password"),
]
