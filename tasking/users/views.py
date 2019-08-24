import random
from datetime import datetime

from django.contrib.auth import authenticate, login
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect

from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt

from tasking.do_pagination import do_pagination
from users.forms import RegisterForm, Customer, ChangwordForm
from users.models import User, ClientTable

# 注册
from users.sms import send_sms


def register(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        print(request.POST)
        if form.is_valid():

            # 保存用户
            User.objects.create_user(**form.cleaned_data)
            users = User.objects.filter(urole=2).all()

            username = request.session.get('username')
            if username:
                user1 = User.objects.filter(username=username).first()
            return render(request,'userlist.html',locals())
        return render(request, 'usermanage/register.html/', {'form': form})
    else:
        form = RegisterForm()
        return render(request, 'usermanage/register.html', {'form': form})


# 登录
def login(request):
    print("------------3------------")
    if request.method == 'POST':
        print("-------4--------")
        # form = LoginForm()
        username = request.POST.get('username')
        password = request.POST.get('password')
        # user = authenticate(request, username=username, password=password)
        user = User.objects.filter(username=username).first()
        if user and user.check_password(password):

            # 将用户信息写入session
            request.session['username'] = user.username
            return redirect(reverse('orders:ticket',kwargs={'page':1}))
        else:
            print('-----------------7-----------faild')
            # form.clean()
            # print('@@@@@@@@@@@@@@@@@@@@@@2')
            error_total = '用户名或者密码错误'
            return render(request, 'usermanage/login.html', {'error_total': error_total})
    return render(request, 'usermanage/login.html')

def ccode():
    str = ""
    for i in range(6):
        ch = chr(random.randrange(ord('0'), ord('9') + 1))
        str += ch
    return str


# 验证用户名与手机号是否正确
@csrf_exempt
def retreve(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        request.session['change_username'] = username
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



@csrf_exempt
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



@csrf_exempt
def changeword(request):
    form = ChangwordForm(request.POST)
    if request.method == 'POST':
        change_password = request.POST.get('password')
        # repassword = request.POST.get('repassword')
        username = request.session.get('change_username')
        print(change_password, "--------------------------1")

        if form.is_valid():
            print(change_password, "--------------------------2")
            print(User.objects.filter(username=username).all())
            user_set = User.objects.filter(username=username).first()
            print(user_set,type(user_set))
            print(user_set.username)
            user_set.set_password(change_password)
            user_set.save()
            toast = '修改成功'
            return render(request,'usermanage/changword.html',locals())
        else:

            return render(request, 'usermanage/changword.html', {'form': form})

    return render(request, 'usermanage/changword.html', {'form': form})


def logout(request):
    request.session.flush()
    return render(request,'niezi/manage1.html')


def user_list(request):
    users = User.objects.filter(urole=2).all().order_by('-id')
    username = request.session.get('username')
    if username:
        user1 = User.objects.filter(username=username).first()
    return render(request,'userlist.html',locals())


def customer(request):
    username = request.session.get('username')
    user1 = User.objects.filter(username=username).first()
    if request.method == 'POST':
        form = Customer(request.POST)
        print('-----2---')
        # if form.is_valid():
        print('-----s------')
        customer = ClientTable()
        cname = request.POST.get('cname')
        ccontactemail = request.POST.get('ccontactemail')
        cmobilephone = request.POST.get('cmobilephone')
        cgid = request.POST.get('cgid')
        time = datetime.now()
        customer.cname=cname
        customer.ccontactemail = ccontactemail
        customer.cmobilephone =cmobilephone
        customer.cgid=cgid
        customer.ccreatedat = time
        customer.save()
        error_total = '添加成功'
        return redirect(reverse('users:customer_list'),locals())
    return render(request,'customer.html',locals())


def customer_list(request):
    customers = ClientTable.objects.all().order_by('-cid')
    username = request.session.get('username')
    if username:
        user1 = User.objects.filter(username=username).first()
    return render(request,'customer_list.html',locals())