from typing import List

from django.db import models
from django.db.models.signals import post_save, pre_delete, pre_save
from django.dispatch import receiver

from ..users.models import User
from .configuration.models import Entry
from .specification.models import Author, Dependency, Error, Input, Output

# Create your models here.


class Configuration(models.Model):
    class Meta:
        verbose_name = "configuration"
        verbose_name_plural = "configurations"

    id: int = models.AutoField(primary_key=True)
    user: User = models.OneToOneField(
        User, db_index=True, on_delete=models.CASCADE)

    entries: List[Entry] = models.ManyToManyField(Entry, blank=True)

    def __str__(self) -> str:
        return f"{self.user.username}'s automation config entries"


class Specification(models.Model):
    class Meta:
        unique_together = ('Name', 'Version',)

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
    class Meta:
        unique_together = ('Name', 'Version', 'Technology',)

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


@receiver(post_save, sender=User)
def create_address_for_user(sender, instance: User, created, **kwargs):
    if created:
        address = Configuration.objects.create(user=instance)


@receiver(pre_delete, sender=Configuration)
def delete_all_many_to_many(sender, instance: Configuration, using, **kwargs):
    try:
        instance.entries.all().delete()
    except:
        pass


@receiver(post_save, sender=Configuration)
def create_default_entries(sender, instance: Configuration, created, **kwargs):
    if created:
        default_entries = [
            {"name": "gitRemoteRepo", "value": None},
            {'name': "gitRemoteToken", "value": None},
            {'name': "specificationReadmeFileName", 'value': "README.md"},
            {'name': "specificationDetailsFileName", 'value': "Details.json"},
            {'name': "microbotReadmeFileName", 'value': "README.md"},
            {'name': "microbotDetailsFileName", 'value': "Details.json"},
        ]
        entries = tuple(Entry.objects.create(user=instance.user, name=entry.get(
            'name'), value=entry.get('value')) for entry in default_entries)
        instance.entries.add(*entries)
        instance.save()
