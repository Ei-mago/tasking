from django.contrib.auth import authenticate, login
from django.http import HttpResponse
from django.shortcuts import render, redirect

# Create your views here.
from django.urls import reverse

from users.forms import RegisterForm, LoginForm
from users.models import User


# def signin(request):
#     if request.method == 'POST':
#             pass
#     form = RegisterForm()
#     return render(request, 'usermanage/register.html', {'form': form})


# 注册
from users.sms import send_sms


def register(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        print(request.POST)
        if form.is_valid():
            # create_user
            print(form.cleaned_data)
            # 保存用户
            User.objects.create_user(**form.cleaned_data)
            return render(request, 'usermanage/register.html', {'form': form})
        return render(request, 'usermanage/register.html/', {'form': form})
    else:
        form = RegisterForm()
        return render(request, 'usermanage/register.html', {'form': form})

# 登录
def login(request):
    form = LoginForm(request.POST)
    if request.method == 'POST':

        # print(request.GET.get('next'))
        username = request.POST.get('username')
        password = request.POST.get('password')
        print(username,password)
        # 验证用户
        # 如果用户is_active为False，则验证失败
        user = authenticate(request, username=username, password=password)
        print(user, type(user))
        if user:
            print(user)
            # 将用户信息写入session
            request.session['name'] = user.username

            return HttpResponse("登录成功")
            # if request.POST.get('next'):
            #     return redirect(request.POST.get('next'))
            # else:
        return render(request, 'usermanage/login.html',{'form': form})
        # return HttpResponse("登录失败")

        # return render(request, 'usermanage/login.html', {"form": form})
    if request.GET.get('next'):
        return render(request, 'usermanage/login.html',{'next':request.GET.get('next'),"form":form})
    else:
        return render(request, 'usermanage/login.html',{'form': form})




def index(request):

    return HttpResponse("index")


def retreve(request):
    if request.method == 'POST':

        # print(request.GET.get('next'))
        username = request.POST.get('username')
        phone = request.POST.get('phone')

        print(username,phone)
        # 验证用户
        # 如果用户is_active为False，则验证失败
        user = authenticate(request, username=username, phone=phone)
        print(user, type(user))

    # 发送验证码
        if user:
            print("asdf", dict(request.POST))
            request.session['scode'] = '666666'
            send_sms(request.POST.get("phone"), {'code': '666666'})



        return render(request, 'usermanage/retrieve.html')


    return render(request, 'usermanage/retrieve.html')