# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2019-08-13 17:19
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usermanage', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='modify_time',
            field=models.DateTimeField(null=True),
        ),
    ]
