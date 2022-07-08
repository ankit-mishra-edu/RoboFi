"""robofi URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from api.settings import urls as settings_url
from channels.routing import URLRouter
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic.base import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls, name='admin'),

    path('api/users/', include('api.users.urls'), name='users-api'),
    path('api/authentication/', include('api.authentication.urls'), name='auth-api'),
    path('api/automation/', include('api.automation.urls'), name='automation-api'),
    path('api/settings/', include('api.settings.urls'), name='settings-api'),
    re_path(r'^.*', TemplateView.as_view(template_name="frontend.html"),
            name="frontend"),
]

websocket_urlpatterns = [
    path(r'ws/settings/', URLRouter(settings_url.websocket_urlpatterns)),
]
