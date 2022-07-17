# Generated by Django 4.0.5 on 2022-06-22 21:00

import autoslug.fields
import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('phones', '0006_alter_phone_release_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='phone',
            name='release_date',
            field=models.DateField(default=datetime.datetime(2022, 6, 22, 21, 0, 29, 160298, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='phone',
            name='slug',
            field=autoslug.fields.AutoSlugField(editable=False, populate_from='name', unique=True),
        ),
    ]