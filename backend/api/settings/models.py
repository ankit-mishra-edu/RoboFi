from typing import List

from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.forms.models import model_to_dict
from robofi.celery.tasks import schedule_notification

from ..users.models import User


# Create your models here.
class Notification(models.Model):
    id = models.AutoField(primary_key=True)
    sender: User = models.ForeignKey(
        to=User, on_delete=models.CASCADE, related_name='notification_sender')
    receivers: List[User] = models.ManyToManyField(
        to=User, related_name='notification_receiver', blank=False)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    read_at = models.DateTimeField(blank=True, null=True)

    def __str__(self) -> str:
        return self.content


@receiver(signal=post_save, sender=Notification)
def send_notification(sender, instance: Notification, created, **kwargs):
    if created:
        notification = model_to_dict(instance)
        schedule_notification.delay(notification, "notification_broadcast")
