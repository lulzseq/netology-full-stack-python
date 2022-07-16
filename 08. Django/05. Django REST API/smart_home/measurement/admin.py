from django.contrib import admin
from .models import Sensor, Measurement


class SensorAdmin(admin.ModelAdmin):
    model = Sensor
    list_display = ['id', 'name', 'description']


class MeasurementAdmin(admin.ModelAdmin):
    model = Measurement
    list_display = ['id', 'temperature', 'created_at', 'image']


admin.site.register(Sensor, SensorAdmin)
admin.site.register(Measurement, MeasurementAdmin)
