from django.urls import include, path, re_path
from rest_framework import routers

from .views import UserDetailView, UserProfileView

router = routers.DefaultRouter()
router.register(r'details', UserDetailView)

urlpatterns = [
    path(r'profiles/', UserProfileView.as_view(), name="profiles"),
    path(r'profiles/<int:pk>/', UserProfileView.as_view(), name="user-profile"),

    path('', include(router.urls)),
]
