from django.contrib import admin

from .models import Author, Dependency, Error, Input, Output, Specification

# Register your models here.

admin.site.register(Author)
admin.site.register(Dependency)
admin.site.register(Error)
admin.site.register(Input)
admin.site.register(Output)
admin.site.register(Specification)
