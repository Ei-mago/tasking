# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2019-08-19 11:37
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0004_auto_20190819_1055'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderinfo',
            name='opreate_name',
            field=models.CharField(default='niezi', max_length=50),
        ),
    ]
