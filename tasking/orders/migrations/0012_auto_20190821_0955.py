# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2019-08-21 09:55
from __future__ import unicode_literals

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0011_auto_20190821_0946'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orderinfo',
            name='create_time',
            field=models.DateTimeField(default=datetime.datetime(2019, 8, 21, 9, 55, 43, 123158)),
        ),
        migrations.AlterField(
            model_name='orderinfo',
            name='finish_time',
            field=models.DateTimeField(default=datetime.datetime(2019, 8, 21, 9, 55, 43, 123158)),
        ),
        migrations.AlterField(
            model_name='orderinfo',
            name='modify_time',
            field=models.DateTimeField(default=datetime.datetime(2019, 8, 21, 9, 55, 43, 123158)),
        ),
    ]