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

        if adv_count > 10:
            raise serializers.ValidationError('Too many advertisements.')
        return data


class FavouriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favourite
        fields = ['id']

    def validate(self, attrs):
        user = self.context['request'].user
        advertisement = attrs['advertisement']
        creator = attrs['advertisement'].creator
        advertisement_in_favourites = Favourite.objects.filter(user=user).filter(advertisement=attrs['advertisement'])

        if advertisement.draft:
            raise ValidationError({'error': 'You cannot add draft to fav'})

        if advertisement_in_favourites.exists():
            raise ValidationError({'error': 'Adv already have in fav'})

        if user == creator:
            raise ValidationError({'error': 'Your own adv cannot be in fav'})

        return attrs
