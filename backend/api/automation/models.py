from typing import List

from django.db import models
from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver

from ..users.models import User
from .specification.models import Author, Dependency, Error, Input, Output

# Create your models here.


class Configuration(models.Model):
    class Meta:
        verbose_name = "configuration"
        verbose_name_plural = "configurations"

    id: int = models.AutoField(primary_key=True)
    user: User = models.ForeignKey(
        User, db_index=True, on_delete=models.CASCADE)

    gitRemoteRepo = models.CharField(max_length=300, null=True, blank=False)
    gitRemoteToken = models.CharField(max_length=120, null=True, blank=False)
    specificationReadmeFileName = models.CharField(
        max_length=300, null=True, blank=False, default="README.md")
    specificationDetailsFileName = models.CharField(
        max_length=300, null=True, blank=False, default="Details.json")
    microbotReadmeFileName = models.CharField(
        max_length=300, null=True, blank=False, default="README.md")
    microbotDetailsFileName = models.CharField(
        max_length=300, null=True, blank=False, default="Details.json")

    def __str__(self) -> str:
        return f"{self.user.username}'s automation configurations"


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


class Microbot(models.Model):
    id: int = models.AutoField(primary_key=True)
    Name: str = models.CharField(
        max_length=120, db_index=True, null=False, blank=False)
    Technology: str = models.CharField(
        max_length=25, db_index=True, null=False, blank=False)
    Description: str = models.CharField(max_length=300, null=True, blank=True)
    Version: str = models.CharField(
        max_length=20, db_index=True, default="1.0.0")
    specification: Specification = models.ForeignKey(
        Specification, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f"{self.Name}_{self.Technology}_V{self.Version.replace('.', '_')}"


@receiver(post_save, sender=User)
def create_address_for_user(sender, instance: User, created, **kwargs):
    if created:
        address = Configuration.objects.create(user=instance)


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
