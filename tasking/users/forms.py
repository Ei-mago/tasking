
import re
from django import forms
from django.http import request
from django.contrib.auth import authenticate
from django.core.exceptions import ValidationError
from django.forms import ModelForm
from users.models import User, ClientTable


def check_password(password):
    if re.match(r'\d+$', password):
        raise ValidationError('密码不能是纯数字')


class RegisterForm(ModelForm):
    class Meta:
        model = User
        fields = ['username', 'phone', 'email', 'password']

    username = forms.CharField(label='用户名', max_length=8,
                               min_length=3,
                               error_messages={
                                   'required': '请输入用户名',
                                   'max_length': '        用户名最多8个字符',
                                   'min_length': '        用户名最少3个字符'
                               }
                               )

    email = forms.CharField(label='邮箱', max_length=30,
                            min_length=3,
                            error_messages={
                                'required':'        请输入邮箱',
                                'max_length': '        请输入正确的邮箱格式',
                                'min_length': '        请输入正确的邮箱格式'

                            }
                            )
    password = forms.CharField(label='密码', max_length=16,
                               min_length=3,
                               widget=forms.PasswordInput(attrs={
                                   'required': '请输入密码',
                                   'class': 'password'
                               }),
                               error_messages={
                                   'required': '请输入密码',
                                   'max_length': '密码最多16个字符',
                                   'min_length': '密码最少3个字符'
                               },
                               validators=[check_password]
                               )
    phone = forms.CharField(label='手机号',min_length=11,max_length=11,
                            error_messages={
                                'required': '请输入手机号',
                                   'max_length': '手机号格式错误',
                                   'min_length': '手机号格式错误'
                            }
                            )

    def clean_phone(self):
        phone = self.cleaned_data.get('phone')
        if  re.match(r'1[3,5,7,8,9]\d{9}$', phone):
            return phone
        raise ValidationError('手机号格式错误')



class ChangwordForm(ModelForm):
    class Meta:
        model = User
        fields = ['password']

    password = forms.CharField(label='密码', max_length=20,
                               min_length=8,
                               widget=forms.PasswordInput(attrs={
                                   'placehold': '请输入密码',
                                   'class': 'password'
                               }),
                               error_messages={
                                   'required': '请输入密码',
                                   'max_length': '密码最多20个字符',
                                   'min_length': '密码最少8个字符'
                               },
                               validators=[check_password]
                               )
    repassword = forms.CharField(label='密码', max_length=20,
                                 min_length=8,
                                 widget=forms.PasswordInput(attrs={
                                     'placehold': '请输入确认密码',
                                     'class': 'password'
                                 }),
                                 error_messages={
                                     'required': '请输入确认密码',
                                     'max_length': '密码最多16个字符',
                                     'min_length': '密码最少8个字符'
                                 },
                                 )

    def clean(self):
        password1 = self.cleaned_data.get('password')
        password2 = self.cleaned_data.get('repassword')
        print('--------',password1)
        print('--------',password2)
        if password1 == password2:


            return self.cleaned_data
        else:
            raise ValidationError({'repassword':'两次密码不一致哦'})


class Customer(ModelForm):
    class Meta:
        model = ClientTable
        fields = ['cname',  'ccontactemail','cmobilephone','cgid']

    cname = forms.CharField(label='客户名称', max_length=16,
                               min_length=8,
                               error_messages={
                                   'required': '请输入客户名称',

                               },
                               )

    ccontactemail = forms.EmailField(label='邮箱', max_length=30,
                               min_length=3,
                               error_messages={
                                   'required': '        请输入邮箱',
                               }
                               )
    cmobilephone = forms.CharField(label='手机号', min_length=11, max_length=11,
                            error_messages={
                                'required': '请输入手机号',

                            }
                            )
    cgid = forms.CharField(label='等级', min_length=1, max_length=11,
                                   error_messages={
                                       'required': '请输入客户等级',
                                   }
                                   )

    # def clean_cmobilephone(self):
    #     cmobilephone = self.cleaned_data.get('cmobilephone')
    #     if re.match(r'1[3,5,7,8,9]\d{9}$', cmobilephone):
    #         return cmobilephone
    #     raise ValidationError('手机号格式错误')

