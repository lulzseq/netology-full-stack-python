from django.db import models
from django.utils import timezone
import random


class Sensor(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=250)

    class Meta:
        ordering = ['-id']

    def __str__(self):
        return self.name


class Measurement(models.Model):
    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE, related_name='measurements')
    temperature = models.DecimalField(max_digits=4, decimal_places=1)
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.sensor

    class Meta:
        ordering = ['-created_at']
