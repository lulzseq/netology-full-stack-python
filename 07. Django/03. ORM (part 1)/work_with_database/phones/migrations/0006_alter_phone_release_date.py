# Generated by Django 4.0.5 on 2022-06-22 20:59

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('phones', '0005_alter_phone_release_date_alter_phone_slug'),
    ]

    operations = [
        migrations.AlterField(
            model_name='phone',
            name='release_date',
            field=models.DateField(default=datetime.datetime(2022, 6, 22, 20, 59, 1, 489965, tzinfo=utc)),
        ),
    ]