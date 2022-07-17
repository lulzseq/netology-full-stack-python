from django.db import models
from django.utils.timezone import now
from autoslug import AutoSlugField


class Phone(models.Model):
    # TODO: Добавьте требуемые поля
    name = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10, decimal_places=2, default='0.00')
    image = models.URLField(max_length=200)
    release_date = models.DateField(default=now())
    lte_exists = models.BooleanField(default=None)
    slug = AutoSlugField(populate_from='name', unique=True)
