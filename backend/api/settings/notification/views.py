from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.http import HttpResponse
from django.shortcuts import render


def home(request):
    pass


def notification_room(request):
    return render(request, 'settings/room.html')


def test(request):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        "notification_0",
        {
            "type": "notify",
            "notification": {
                "sender": 1,
                "receiver": 1,
                "content": "Test Notification"
            }
        }
    )
    return HttpResponse("Done")
