# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2019-08-20 12:47
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0010_auto_20190820_1204'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderoperate',
            name='order_name',
            field=models.CharField(default='niezi', max_length=30),
        ),
    ]
