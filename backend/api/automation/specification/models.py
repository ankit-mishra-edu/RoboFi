from typing import List

from django.db import models
from django.db.models.signals import pre_delete
from django.dispatch import receiver

# Create your models here.


class Input(models.Model):
    id: int = models.AutoField(primary_key=True)
    Name: str = models.CharField(
        max_length=120, db_index=True, null=True, blank=False)
    Type: str = models.CharField(max_length=50, null=True, blank=False)
    DefaultValue: str = models.CharField(
        max_length=120, null=True, blank=False)
    Description: str = models.CharField(max_length=300, null=True, blank=False)

    def __str__(self) -> str:
        return self.Name


class Output(models.Model):
    id: int = models.AutoField(primary_key=True)
    Name: str = models.CharField(
        max_length=120, db_index=True, null=True, blank=False)
    Type: str = models.CharField(max_length=50, null=True, blank=False)
    Description: str = models.CharField(max_length=300, null=True, blank=False)

    def __str__(self) -> str:
        return self.Name


class Dependency(models.Model):
    class Meta:
        verbose_name_plural = "dependencies"

    id: int = models.AutoField(primary_key=True)
    Name: str = models.CharField(
        max_length=120, db_index=True, null=True, blank=False)
    Type: str = models.CharField(max_length=50, null=True, blank=False)
    Description: str = models.CharField(max_length=300, null=True, blank=False)

    def __str__(self) -> str:
        return self.Name


class Author(models.Model):
    id: int = models.AutoField(primary_key=True)
    Name: str = models.CharField(
        max_length=120, db_index=True, null=True, blank=False)
    Email: str = models.CharField(max_length=50, null=True, blank=False)
    Contact: str = models.CharField(max_length=20, null=True, blank=False)

    def __str__(self) -> str:
        return self.Name


class Error(models.Model):
    id: int = models.AutoField(primary_key=True)
    Message: str = models.CharField(
        max_length=120, db_index=True, null=True, blank=False)
    Code: str = models.CharField(
        max_length=50, db_index=True, null=True, blank=False)
    Description: str = models.CharField(max_length=300, null=True, blank=True)

    def __str__(self) -> str:
        return self.Message
