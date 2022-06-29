import os
from datetime import timedelta

from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'robofi.settings.base')
app = Celery('robofi')
app.config_from_object('django.conf:settings', namespace='CELERY')

app.conf.timezone = 'Asia/Kolkata'

app.autodiscover_tasks()
