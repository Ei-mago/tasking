# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2019-08-19 16:00
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0004_auto_20190819_1554'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orderinfo',
            name='content',
            field=models.CharField(max_length=256, null=True),
        ),
        migrations.AlterField(
            model_name='orderinfo',
            name='priority',
            field=models.CharField(choices=[('P0', '紧急'), ('P1', '高'), ('P2', '中'), ('P3', '低')], max_length=10, null=True),
        ),
        migrations.AlterField(
            model_name='orderinfo',
            name='question',
            field=models.CharField(choices=[('1', '问询'), ('2', '任务'), ('3', '问题'), ('4', '事件'), ('5', '其他')], max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='orderinfo',
            name='remarks',
            field=models.CharField(max_length=256, null=True),
        ),
        migrations.AlterField(
            model_name='orderinfo',
            name='service_list',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='orderinfo',
            name='sign',
            field=models.CharField(max_length=30, null=True),
        ),
    ]