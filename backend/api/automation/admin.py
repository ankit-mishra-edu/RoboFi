from django.contrib import admin

from .models import Configuration, Microbot, Specification

# Register your models here.

admin.site.register(Configuration)
admin.site.register(Microbot)
admin.site.register(Specification)
