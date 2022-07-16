from django.urls import path
from .views import get_sensors

urlpatterns = [
    # TODO: зарегистрируйте необходимые маршруты
    path('', get_sensors)
]
