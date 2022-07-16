from django.contrib import admin
from .models import Sensor


# Register your models here.

class SensorAdmin(admin.ModelAdmin):
    model = Sensor
    list_display = ['id', 'name', 'description']


admin.site.register(Sensor, SensorAdmin)
