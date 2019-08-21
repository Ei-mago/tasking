


from django.contrib.auth.models import AbstractUser
from django.db import models


class ClientGroupTable(models.Model):
    cgid = models.AutoField(primary_key=True)
    cgname = models.CharField(max_length=32, blank=True, null=True)
    cgnotes = models.CharField(max_length=255, blank=True, null=True)
    createdat = models.DateTimeField(db_column='createdAt', blank=True, null=True)  # Field name made lowercase.
    updatedat = models.DateTimeField(db_column='updatedAt', blank=True, null=True)  # Field name made lowercase.
    ugid = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'client_group_table'


class ClientTable(models.Model):
    cid = models.AutoField(primary_key=True)
    cname = models.CharField(max_length=32, blank=True, null=True)
    cnickname = models.CharField(max_length=32, blank=True, null=True)
    ccontactemail = models.CharField(db_column='ccontactEmail', max_length=128, blank=True, null=True)  # Field name made lowercase.
    cvalid = models.IntegerField(blank=True, null=True)
    cmobilephone = models.CharField(db_column='cmobilePhone', blank=True, null=True,max_length=11)  # Field name made lowercase.
    cnotes = models.CharField(max_length=255, blank=True, null=True)
    ccreatedat = models.DateTimeField(db_column='ccreatedAt', blank=True, null=True)  # Field name made lowercase.
    cupdatedat = models.DateTimeField(db_column='cupdatedAt', blank=True, null=True)  # Field name made lowercase.
    cgid = models.CharField(blank=True, null=True,max_length=8)
    uid = models.IntegerField(blank=True, null=True)
    customercustomfields = models.CharField(db_column='customerCustomFields', max_length=255, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'client_table'


class TypesTable(models.Model):
    name = models.CharField(max_length=64, blank=True, null=True)
    description = models.CharField(max_length=255, blank=True, null=True)
    createdat = models.DateTimeField(db_column='createdAt', blank=True, null=True)  # Field name made lowercase.
    updatedat = models.DateTimeField(db_column='updatedAt', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'types_table'


class UserGroupTable(models.Model):
    ugid = models.AutoField(primary_key=True)
    ugname = models.CharField(max_length=32, blank=True, null=True)
    ugdescription = models.CharField(max_length=255, blank=True, null=True)
    pid = models.IntegerField(blank=True, null=True)
    createdat = models.DateTimeField(db_column='createdAt', blank=True, null=True)  # Field name made lowercase.
    updatedat = models.DateTimeField(db_column='updatedAt', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'user_group_table'


class User(AbstractUser):
    is_superuser = models.IntegerField(default=0)
    first_name = models.CharField(default='0',max_length=1)
    last_name = models.CharField(default='0',max_length=1)
    is_staff = models.IntegerField(default=0)
    phone = models.CharField(blank=True, null=True,max_length=11) #手机号
    urole = models.IntegerField(blank=True, null=True)  # 角色
    pid = models.IntegerField(blank=True, null=True)    # pid
    ugid = models.CharField(max_length=11, blank=True, null=True)   # ugid

    class Meta:
        managed = True
        db_table = 'user'
