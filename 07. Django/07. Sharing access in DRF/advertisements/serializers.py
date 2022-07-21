from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from .models import Advertisement, Favourite


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name',)


class AdvertisementSerializer(serializers.ModelSerializer):
    creator = UserSerializer(read_only=True)

    class Meta:
        model = Advertisement
        fields = ('id', 'title', 'description', 'creator', 'status', 'created_at',)

    def create(self, validated_data):
        validated_data["creator"] = self.context["request"].user
        return super().create(validated_data)

    def validate(self, data):
        user = self.context["request"].user
        adv_count = len(Advertisement.objects.select_related('creator').filter(creator=user, status='OPEN'))

        if 'status' in data.keys():
            if 'OPEN' in data.values():
                adv_count += 1
            else:
                adv_count -= 1

        if adv_count > 10:
            raise serializers.ValidationError('Too many advertisements.')
        return data
