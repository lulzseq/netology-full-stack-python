# Generated by Django 4.0.5 on 2022-06-27 16:09

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('phones', '0009_rename_slugging_phone_slug_alter_phone_release_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='phone',
            name='release_date',
            field=models.DateField(default=datetime.datetime(2022, 6, 27, 16, 9, 36, 148255, tzinfo=utc)),
        ),
    ]
