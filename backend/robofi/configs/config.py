import os
import mimetypes
import dj_database_url
from pathlib import Path
from datetime import timedelta


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent.parent

# Setting Environment variables

if (os.path.exists(os.path.join(Path(__file__).resolve().parent, 'environment.py'))):
    from .environment import environment
else:
    environment = os.environ

CORS_ORIGIN_ALLOW_ALL = False
CORS_ALLOW_CREDENTIALS = True

DEBUG = environment.get('DEBUG')

SECRET_KEY = environment.get('SECRET_KEY')

ALLOWED_HOSTS = environment.get('ALLOWED_HOSTS').split(',')
CORS_ORIGIN_WHITELIST = environment.get('ALLOWED_ORIGINS').split(',')
CSRF_TRUSTED_ORIGINS = environment.get('ALLOWED_ORIGINS').split(',')

if DEBUG:
    mimetypes.add_type("application/javascript", ".js", True)

# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases
DATABASES = {
    'default': dj_database_url.parse(
        environment.get('DATABASE_URL'), conn_max_age=600)
}

SPLITTED_CLOUDINARY_URL = environment.get('CLOUDINARY_URL').split(':')

CLOUDINARY = {
    'cloud_name': SPLITTED_CLOUDINARY_URL[2].split('@')[1],
    'api_key': SPLITTED_CLOUDINARY_URL[1][2:],
    'api_secret': SPLITTED_CLOUDINARY_URL[2].split('@')[0],
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=int(environment.get('ACCESS_TOKEN_EXPIRATION_TIME'))),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=int(environment.get('REFRESH_TOKEN_EXPIRATION_TIME'))),
    'UPDATE_LAST_LOGIN': True,
}

# Default primary key field type
# https://docs.djangoproject.com/en/4.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Extra places for collectstatic to find static files.
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
]

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

EMAIL_PORT = 587
EMAIL_USE_TLS = True

EMAIL_HOST = "smtp.gmail.com"
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST_USER = environment.get('EMAIL_HOST_USER', '')
EMAIL_HOST_PASSWORD = environment.get('EMAIL_HOST_PASSWORD', '')
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER
