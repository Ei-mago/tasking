from django import forms
from django.core.exceptions import ValidationError

class NewTicketForm(forms.Form):
    customer = forms.CharField(required=True, max_length=50,strip=True, error_messages={'required': '客户名称必须填写'})
    opreate = forms.CharField(required=True)
    copyfor = forms.CharField(required=False, max_length=50)
    question = forms.CharField(required=False, max_length=20)
    service_list = forms.CharField(required=False, max_length=50)
    sign = forms.CharField(required=False, max_length=30,strip=True)
    title = forms.CharField(required=True, max_length=50,strip=True, error_messages={'required': '工单主题必须填写'})
    content = forms.CharField(required=False, max_length=256,strip=True)
    # remarks = forms.CharField(required=False, max_length=256,strip=True)
    priority = forms.CharField(required=False, max_length=10)
    # create_time = forms.DateTimeField(required=False)
    # modify_time = forms.DateTimeField(required=False)
    # finish_time = forms.DateTimeField(required=False)


