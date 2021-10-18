from django.urls import path, re_path, include
from rest_framework import routers
# from .views import UserAPI, UserDetails, UserDetailsView, ProfileDetailsView
from pages.users.detail.views import UserDetailView

router = routers.DefaultRouter()
router.register(r'', UserDetailView)

urlpatterns = [
    # path(r'profiles/', ProfileView.as_view(), name="user-profiles-all"),
    # path(r'profiles/<int:pk>/', ProfileView.as_view(), name="user-profiles"),

    path('', include(router.urls)),
]
