from typing import List

from django.db import models
from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver

from ...users.models import User

# Create your models here.


class Entry(models.Model):
    class Meta:
        verbose_name = "entry"
        verbose_name_plural = "entries"
        unique_together = ('user', 'name',)

    id: int = models.AutoField(primary_key=True)
    user: User = models.ForeignKey(
        User, db_index=True, on_delete=models.CASCADE)

    name = models.CharField(max_length=300, null=False, blank=False)
    value = models.CharField(max_length=120, null=True, blank=False)

    def __str__(self) -> str:
        return self.name
