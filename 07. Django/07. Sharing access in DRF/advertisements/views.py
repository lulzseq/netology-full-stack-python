from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .models import Advertisement, Favourite
from .serializers import AdvertisementSerializer, FavouriteSerializer
from .filters import AdvertisementFilter


class GetAccessPermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.creator == request.user or request.user.is_superuser


class AdvertisementViewSet(ModelViewSet):
    queryset = Advertisement.objects.all()
    serializer_class = AdvertisementSerializer
    filterset_class = AdvertisementFilter
    filter_backends = [DjangoFilterBackend]

    def get_queryset(self):
        if self.request.user.is_authenticated:
            queryset = Advertisement.objects.filter(creator=self.request.user,
                                                    draft=True) | Advertisement.objects.filter(draft=False)
        else:
            queryset = Advertisement.objects.filter(draft=False)
        return queryset

    def get_permissions(self):
        if self.action == "create":
            return [IsAuthenticated()]
        elif self.action in ["destroy", "update", "partial_update"]:
            return [GetAccessPermission()]
        return []

    @action(detail=True, methods=['GET'], url_path=f'fav')
    def fav(self, request, pk=None):
        advertisement = self.get_object()

        if advertisement.creator == self.request.user:
            return Response({'status': 'You cannot add your own ads'})

        advertisement.favourite.add(self.request.user)
        advertisement.save()
        return Response({'status': f'advertisement #{advertisement.id} was added in favourites'})


class FavouriteViewSet(ModelViewSet):
    serializer_class = FavouriteSerializer
    filter_backends = [DjangoFilterBackend]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Favourite.objects.filter(user=self.request.user)
