from cloudinary.models import CloudinaryField
from django.contrib.auth.models import AbstractUser, UserManager
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


class User(AbstractUser):
    id = models.AutoField(primary_key=True)
    # username = models.CharField(max_length=120, unique=True)
    # first_name = models.CharField(max_length=120, blank=True)
    # last_name = models.CharField(max_length=120, blank=True)
    # email = models.EmailField(max_length=254, unique=True)
    # password = models.CharField(max_length=254)

    # USERNAME_FIELD = 'username'
    # objects = UserManager()

    def __str__(self):
        return self.username


Token = Token


class Address(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True)
    street = models.CharField(max_length=200, blank=True, default="")
    city = models.CharField(max_length=50, blank=True, default="")
    state = models.CharField(max_length=30, blank=True, default="")
    zip_code = models.IntegerField(blank=True, default=0)

    def __str__(self):
        return ("{}'s Address".format(self.user.username))


class Profile(models.Model):
    user: User = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True)
    address: Address = models.OneToOneField(
        Address, on_delete=models.CASCADE, null=True)
    bio: str = models.TextField(max_length=500, default="", blank=True)
    birth_date = models.DateField(null=True, default=None)
    email_confirmed: bool = models.BooleanField(default=False)
    image = CloudinaryField('image')

    def __str__(self):
        return ("{}'s Profile".format(self.user.username))


@receiver(post_save, sender=User)
def create_address_for_user(sender, instance, created, **kwargs):
    if created:
        address = Address.objects.create(user=instance)


@receiver(post_save, sender=Address)
def create_profile_for_user(sender, instance, created, **kwargs):
    if created:
        profile = Profile.objects.create(user=instance.user)
        profile.address = instance
        profile.save()
