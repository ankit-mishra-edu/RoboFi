"""
ASGI config for robofi project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/howto/deployment/asgi/
"""

import os

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'robofi.settings.base')

# Initialize Django ASGI application early to ensure the AppRegistry
# is populated before importing code that may import ORM models.
django_asgi_app = get_asgi_application()

from ..routes.urls import websocket_urlpatterns

# application = ProtocolTypeRouter({
#     'http': django_asgi_app,
#     # Websocket handler
#     'websocket': AllowedHostsOriginValidator(  # Only allow socket connections from the Allowed hosts in the settings.py file
#         AuthMiddlewareStack(  # Session Authentication, required to use if we want to access the user details in the consumer
#             URLRouter(websocket_urlpatterns)
#         ),
#     ),
# })

application = ProtocolTypeRouter({
    'http': django_asgi_app,
    # Websocket handler
    'websocket': AuthMiddlewareStack(  # Session Authentication, required to use if we want to access the user details in the consumer
        URLRouter(websocket_urlpatterns)
    ),
})
