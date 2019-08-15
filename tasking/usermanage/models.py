# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from __future__ import unicode_literals

from django.db import models


class ClientGroupTable(models.Model):
    cgid = models.AutoField(primary_key=True)
    cgname = models.CharField(max_length=32, blank=True, null=True)
    cgnotes = models.CharField(max_length=255, blank=True, null=True)
    createdat = models.DateTimeField(db_column='createdAt', blank=True, null=True)  # Field name made lowercase.
    updatedat = models.DateTimeField(db_column='updatedAt', blank=True, null=True)  # Field name made lowercase.
    ugid = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'client_group_table'


class ClientTable(models.Model):
    cid = models.AutoField(primary_key=True)
    cname = models.CharField(max_length=32, blank=True, null=True)
    cnickname = models.CharField(max_length=32, blank=True, null=True)
    ccontactemail = models.CharField(db_column='ccontactEmail', max_length=128, blank=True, null=True)  # Field name made lowercase.
    cvalid = models.IntegerField(blank=True, null=True)
    cmobilephone = models.IntegerField(db_column='cmobilePhone', blank=True, null=True)  # Field name made lowercase.
    cnotes = models.CharField(max_length=255, blank=True, null=True)
    ccreatedat = models.DateTimeField(db_column='ccreatedAt', blank=True, null=True)  # Field name made lowercase.
    cupdatedat = models.DateTimeField(db_column='cupdatedAt', blank=True, null=True)  # Field name made lowercase.
    cgid = models.IntegerField(blank=True, null=True)
    uid = models.IntegerField(blank=True, null=True)
    customercustomfields = models.CharField(db_column='customerCustomFields', max_length=255, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'client_table'


class TypesTable(models.Model):
    name = models.CharField(max_length=64, blank=True, null=True)
    description = models.CharField(max_length=255, blank=True, null=True)
    createdat = models.DateTimeField(db_column='createdAt', blank=True, null=True)  # Field name made lowercase.
    updatedat = models.DateTimeField(db_column='updatedAt', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'types_table'


class UserGroupTable(models.Model):
    ugid = models.AutoField(primary_key=True)
    ugname = models.CharField(max_length=32, blank=True, null=True)
    ugdescription = models.CharField(max_length=255, blank=True, null=True)
    pid = models.IntegerField(blank=True, null=True)
    createdat = models.DateTimeField(db_column='createdAt', blank=True, null=True)  # Field name made lowercase.
    updatedat = models.DateTimeField(db_column='updatedAt', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'user_group_table'


class UserTable(models.Model):
    uid = models.AutoField(primary_key=True)
    uname = models.CharField(max_length=32, blank=True, null=True)
    uemail = models.CharField(max_length=32, blank=True, null=True)
    umobilephone = models.IntegerField(db_column='umobilePhone', blank=True, null=True)  # Field name made lowercase.
    upassword = models.CharField(max_length=128, blank=True, null=True)
    ucreatedat = models.DateTimeField(db_column='ucreatedAt', blank=True, null=True)  # Field name made lowercase.
    ulastloginat = models.DateTimeField(db_column='ulastLoginAt', blank=True, null=True)  # Field name made lowercase.
    urole = models.IntegerField(blank=True, null=True)
    pid = models.IntegerField(blank=True, null=True)
    ugid = models.CharField(max_length=11, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user_table'
