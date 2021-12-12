from django.contrib import admin

from .models import (Author, Dependency, Error, Input, Microbot, Output,
                     Specification)

# Register your models here.

admin.site.register(Microbot)
admin.site.register(Specification)
admin.site.register(Input)
admin.site.register(Output)
admin.site.register(Dependency)
admin.site.register(Author)
admin.site.register(Error)
