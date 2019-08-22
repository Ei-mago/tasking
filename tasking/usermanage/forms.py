
import re
from django import forms
from django.http import request
from django.contrib.auth import authenticate
from django.core.exceptions import ValidationError
from django.forms import ModelForm
from usermanage.models import User



def check_password(password):
    if re.match(r'\d+$', password):
        raise ValidationError('密码不能是纯数字')


class RegisterForm(ModelForm):
    class Meta:
        model = User
        fields = ['username', 'phone', 'email', 'password']

    username = forms.CharField(label='用户名', max_length=8,
                               min_length=2,
                               error_messages={
                                   'required': '请输入用户名',
                                   'max_length': '        用户名最多8个字符',
                                   'min_length': '        用户名最少2个字符'
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


# class LoginForm(ModelForm):
#
#
#     class Meta:
#         model = User
#         fields = ['password',  'username']
#
#     password = forms.CharField(label='密码', max_length=16,
#                                min_length=8,
#                                widget=forms.PasswordInput(attrs={
#                                    'required': '请输入密码',
#                                    'class': 'password'
#                                }),
#                                error_messages={
#                                    'required': '请输入密码',
#                                    'max_length': '密码最多16个字符',
#                                    'min_length': '密码最少8个字符'
#                                },
#                                validators=[check_password]
#                                )
#
#     username = forms.CharField(label='用户名', max_length=30,
#                                min_length=3,
#                                error_messages={
#                                    'required': '        请输入用户名',
#                                    'max_length': '        用户名最多30个字符',
#                                    'min_length': '        用户名最少3个字符'
#                                }
#                                )
#     def clean(self):
#         print('-----------5---------')
#         username = self.cleaned_data.get('username')
#         password = self.cleaned_data.get('password')
#         user = authenticate(request, username=username, password=password)
#
#         if user:
#             return self.cleaned_data
#         else:
#             print('-----------6-----')
#             raise ValidationError({'password': '账号或密码错误'})
#
