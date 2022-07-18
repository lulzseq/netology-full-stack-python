# Generated by Django 4.0.5 on 2022-07-18 22:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('advertisements', '0003_delete_favourites'),
    ]

    operations = [
        migrations.AddField(
            model_name='advertisement',
            name='draft',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='advertisement',
            name='status',
            field=models.TextField(choices=[('OPEN', 'Открыто'), ('CLOSED', 'Закрыто')], default='OPEN'),
        ),
    ]
