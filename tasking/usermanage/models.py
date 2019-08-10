from datetime import datetime

from django.db import models

class Support(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30,null=False)
    phone = models.CharField(max_length=30,null=False)
    email = models.CharField(max_length=30,null=False)
    support_group_choice  = (
        ('1','售后维护'),
        ('2','it组1')
    )
    support_group = models.CharField(choices=support_group_choice)
    pid = models.IntegerField(null=False)
    create_time = models.DateTimeField(default=datetime.now)

    class Meta:
        db_table = 'support'


class User(models.Model):
    uid = models.AutoField(primary_key=True)
    username = models.CharField(max_length=256, null=False)
    password = models.CharField(max_length=30, default='123456')
    company_name = models.CharField(max_length=30,default='克亚科技公司')
    role_type = (
        ('0','admin'),
        ('1','客服经理'),
        ('2','客服')
    )
    role = models.CharField(default=2,choices=role_type)
    pid = models.IntegerField(null=False)
    email = models.CharField(max_length=30,null=False)
    is_delete = models.IntegerField(null=False,default=0)
    create_time = models.DateTimeField(default=datetime.now)
    modify_time = models.DateTimeField(default=datetime.now)

    class Meta:
        db_table =  'user'



class Customer(models.Model):
    cid = models.AutoField(primary_key=True)
    customer_name = models.CharField(max_length=30,null=False)
    company_name = models.CharField(max_length=30,null=False)
    phone = models.CharField(max_length=30,null=False)
    email = models.CharField(max_length=30,null=False)
    customer_group_choice = (
        ('1','xxx'),
        ('2','xxx'),
        ('3','xxx')
    )
    customer_group = models.CharField(choices=customer_group_choice)
    is_delete = models.IntegerField(null=False,default=0)
    create_time = models.DateTimeField(default=datetime.now)
    modify_time = models.DateTimeField(default=datetime.now)

    class Meta:
        db_table =  'customer'





