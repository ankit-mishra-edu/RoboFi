import json

from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer

from .serializers import NotificationSerializer


@database_sync_to_async
def create_notification(notification):
    notification = json.loads(notification)
    serializer = NotificationSerializer(data=notification)

    if serializer.is_valid():
        serializer.save()
        return (serializer.data)
    return(serializer.errors)


class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        user = self.scope['url_route']['kwargs'].get('user', None)
        self.room_group_name = f"notification_{'broadcast' if user is None else user.id}"

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        await create_notification(text_data)

    async def notify(self, event):
        await self.send(text_data=json.dumps(event))
