from django.db import models

from ..specification.models import Specification

# Create your models here.


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
