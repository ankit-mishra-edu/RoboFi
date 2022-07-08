import asyncio
import json

from api.users.models import User
from channels.layers import get_channel_layer
from django.conf import settings
from django.core.mail import EmailMultiAlternatives, get_connection
from django.template.loader import render_to_string
from django.utils.html import strip_tags

from celery import shared_task
from celery.utils.log import get_task_logger

logger = get_task_logger(__name__)


@shared_task()
def test_shared_task():
    logger.info("Execution completed for Shared task using Celery Beat")
    return "Done"


@shared_task(bind=True)
def create_email(self, user_id: int, **kwargs):
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return 'Failed'
    email_account = kwargs.get("email_account")
    subject = kwargs.get("subject", "")
    email = kwargs.get("email")
    template = kwargs.get("template")
    cc_email = kwargs.get("cc_email")
    context = kwargs.get("context", {})

    email_accounts = {
        "do not reply": {
            'name': settings.EMAIL_HOST_USER,
            'password': settings.EMAIL_HOST_PASSWORD,
            'from': settings.EMAIL_HOST_USER,
            'display_name': "Ankit Mishra"},
    }

    html_content = render_to_string(
        template, context)  # render with dynamic value
    # Strip the html tag. So people can see the pure text at least.
    text_content = strip_tags(html_content)

    with get_connection(
        host=settings.EMAIL_HOST,
        port=settings.EMAIL_PORT,
        username=email_accounts[email_account]["name"],
        password=email_accounts[email_account]["password"],
        use_tls=settings.EMAIL_USE_TLS,
    ) as connection:
        email = EmailMultiAlternatives(
            subject,
            text_content,
            f'{email_accounts[email_account]["display_name"]} <{email_accounts[email_account]["from"]}>',
            [email],
            cc=[cc_email],
            connection=connection)
        email.attach_alternative(html_content, "text/html")
        email.send()
    return "Done"


@shared_task(bind=True)
def schedule_notification(self, notification, room_group_name):
    asyncio.run((get_channel_layer().group_send)(
        room_group_name,
        {
            "type": "notify",
            "notification": notification
        }
    ))
    return json.dumps(notification)
