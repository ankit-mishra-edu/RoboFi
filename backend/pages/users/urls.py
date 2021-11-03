from django.urls import include, path
from rest_framework import routers

from .views import *

router = routers.DefaultRouter()
router.register(r'details', UserDetailView)

urlpatterns = [
    path(r'profiles/', UserProfileView.as_view(), name="profiles"),
    path(r'profiles/<int:pk>/', UserProfileView.as_view(), name="user-profile"),

    path('', include(router.urls)),
]
