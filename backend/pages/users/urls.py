from django.urls import include, path, re_path
from rest_framework import routers

from .views import UserDetailView, UserProfileView

router = routers.DefaultRouter()
router.register(r'detail', UserDetailView)

urlpatterns = [
    path(r'profiles/', UserProfileView.as_view(), name="user-profiles-all"),
    path(r'profiles/<int:pk>/', UserProfileView.as_view(), name="user-profiles"),

    path('', include(router.urls)),
]
