# Generated by Django 4.1.5 on 2023-01-24 13:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0002_service'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='service',
            name='description',
        ),
        migrations.RemoveField(
            model_name='service',
            name='title',
        ),
    ]
