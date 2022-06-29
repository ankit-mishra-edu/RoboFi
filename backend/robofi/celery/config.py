import os
from pathlib import Path

# Setting Environment variables
if (os.path.exists(os.path.join(Path(__file__).resolve().parent.parent, 'configurations', 'environment.py'))):
    from ..configurations.environment import environment
else:
    environment = os.environ

# Celery, Celery Beat and Redis settings
CELERY_BROKER_URL = environment.get("REDIS_URL", "redis://redis:6379")
CELERY_RESULT_BACKEND = environment.get("CELERY_BACKEND", "redis://redis:6379")

CELERY_ACCEPT_CONTENT = ['application/json']
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TASK_SERIALIZER = 'json'
CELERY_TIMEZONE = 'Asia/Kolkata'
CELERY_BEAT_SCHEDULER = 'django_celery_beat.schedulers:DatabaseScheduler'
