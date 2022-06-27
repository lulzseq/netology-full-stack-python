# Generated by Django 4.0.5 on 2022-06-22 20:55

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('phones', '0004_alter_phone_image_alter_phone_release_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='phone',
            name='release_date',
            field=models.DateField(default=datetime.datetime(2022, 6, 22, 20, 55, 24, 175600, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='phone',
            name='slug',
            field=models.SlugField(unique=True),
        ),
    ]