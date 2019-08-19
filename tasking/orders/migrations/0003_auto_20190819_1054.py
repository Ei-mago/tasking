# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2019-08-19 10:54
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0002_auto_20190812_1913'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderinfo',
            name='delete',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='orderoperate',
            name='from_opreate_id',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='orderoperate',
            name='to_opreate_id',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='orderinfo',
            name='order_status',
            field=models.IntegerField(choices=[('0', '未受理'), ('1', '处理中'), ('4', '延期'), ('5', '超时'), ('9', '处理完毕')], default=0),
        ),
    ]
