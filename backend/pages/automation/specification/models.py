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


class Specification(models.Model):
    id: int = models.AutoField(primary_key=True)
    Name: str = models.CharField(
        max_length=120, db_index=True, null=False, blank=False)
    Description: str = models.CharField(max_length=300, null=True, blank=True)
    Category: str = models.CharField(
        max_length=50, db_index=True, null=False, blank=False)
    Version: str = models.CharField(
        max_length=20, db_index=True, default="1.0.0")
    Inputs: List[Input] = models.ManyToManyField(
        Input, related_name='microbot_inputs', blank=True)
    Outputs: List[Output] = models.ManyToManyField(
        Output, related_name='microbot_outputs', blank=True)
    Dependencies: List[Dependency] = models.ManyToManyField(
        Dependency, related_name='microbot_dependencies', blank=True)
    Authors: List[Author] = models.ManyToManyField(
        Author, related_name='microbot_authors', blank=True)
    Errors: List[Error] = models.ManyToManyField(
        Error, related_name='microbot_errors', blank=True)

    def __str__(self) -> str:
        return f"{self.Name}_V{self.Version.replace('.', '_')}"


@receiver(pre_delete, sender=Specification)
def delete_all_many_to_many(sender, instance: Specification, using, **kwargs):
    try:
        instance.Authors.all().delete()
        instance.Dependencies.all().delete()
        instance.Inputs.all().delete()
        instance.Outputs.all().delete()
        instance.Errors.all().delete()
    except:
        pass
