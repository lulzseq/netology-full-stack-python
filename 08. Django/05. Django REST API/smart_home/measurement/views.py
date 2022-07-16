# TODO: опишите необходимые обработчики, рекомендуется использовать generics APIView классы:
# TODO: ListCreateAPIView, RetrieveUpdateAPIView, CreateAPIView
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Sensor
from .serializers import SensorSerializer

@api_view(['GET'])
def get_sensors(requests):
    sensors = Sensor.objects.all()
    serializer = SensorSerializer(sensors, many=True)
    return Response(serializer.data)