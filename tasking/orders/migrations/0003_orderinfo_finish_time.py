# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2019-08-18 21:36
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0002_auto_20190812_1913'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderinfo',
            name='finish_time',
            field=models.DateTimeField(null=True),
        ),
    ]
