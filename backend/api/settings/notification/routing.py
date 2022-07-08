from django.urls import path

from .consumers import NotificationConsumer

websocket_urlpatterns = [

    path('', NotificationConsumer.as_asgi()),
]
