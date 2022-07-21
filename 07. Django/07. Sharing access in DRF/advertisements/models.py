from django.conf import settings
from django.db import models
from rest_framework.authtoken.admin import User


class AdvertisementStatusChoices(models.TextChoices):
    OPEN = "OPEN", "Открыто"
    CLOSED = "CLOSED", "Закрыто"
    DRAFT = "DRAFT", "Черновик"


class Advertisement(models.Model):
    title = models.TextField()
    description = models.TextField(default='')
    status = models.TextField(choices=AdvertisementStatusChoices.choices, default=AdvertisementStatusChoices.OPEN)
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    draft = models.BooleanField(default=False)
    favourite = models.ManyToManyField(User, through='Favourite', related_name='favourite')

    def __str__(self):
        return str(self.title)


class Favourite(models.Model):
    advertisement = models.ForeignKey(Advertisement, related_name='favourite_user', on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='favourite_adv', on_delete=models.CASCADE)
