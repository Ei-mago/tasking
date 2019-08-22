from django.contrib.auth import authenticate, login
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
import random

from django.urls import reverse

from usermanage.forms import RegisterForm
from usermanage.models import User

# 注册
from usermanage.sms import send_sms


def register(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        print(request.POST)
        if form.is_valid():
            # 保存用户
            User.objects.create_user(**form.cleaned_data)
            return render(request, 'usermanage/register.html', {'form': form})
        return render(request, 'usermanage/register.html/', {'form': form})
    else:
        form = RegisterForm()
        return render(request, 'usermanage/register.html', {'form': form})


# 登录
def login(request):
    if request.method == 'POST':
        # form = LoginForm()
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)

        if user:
            # 将用户信息写入session
            request.session['username'] = user.username

            # 修改
            # return HttpResponse("登录成功")
            return redirect(reverse('orders:new_ticket'))
        else:
            error_total = '用户名或者密码错误'
            return render(request, 'usermanage/login.html', {'error_total': error_total})
    # form = LoginForm()
    return render(request, 'usermanage/login.html')


def ccode():
    str = ""
    for i in range(6):
        ch = chr(random.randrange(ord('0'), ord('9') + 1))
        str += ch
    return str


# 验证用户名与手机号是否正确
def retreve(request):
    if request.method == 'POST':
        print("-----------------------------------------------------")
        username = request.POST.get('username')
        phone = request.POST.get('phone')
        print(username, phone)
        user = User.objects.filter(username=username, phone=phone)
        print(user)
        # 发送验证码
        if user:
            print("asdf", dict(request.POST))
            scode = ccode()
            request.session['scode'] = scode
            print(scode)
            send_sms(request.POST.get("phone"), {'code': scode})
            return JsonResponse({'msg': "ok"})


        else:
            error_total = '用户名或者手机错误'
            return JsonResponse({'msg': error_total})  # 返回一个json格式的数据

    return render(request, 'usermanage/retrieve.html')


# 验证验证码是否正确
def check(request):
    if request.method == 'POST':
        ucode = request.POST.get("ucode")
        scode = request.session.get("scode")

        if scode == ucode:
            print("asdf", dict(request.POST))
            scode = ccode()
            request.session['scode'] = scode
            print(scode)
            # send_sms(request.POST.get("phone"), {'code': scode})

            # 验证码输入正确返回 重置密码页面
            return JsonResponse({'msg': "ok", "url": "/changeword"})

            # if request.method == 'POST':
            #     scode = request.POST.get('scode')
            #     uid = request.session.get('uid')
        else:
            error_total = '验证码输入错误'
            return JsonResponse({'msg': error_total})


def changeword(request):
    if request.method == 'POST':
        pass

    return render(request, 'usermanage/changword.html')
