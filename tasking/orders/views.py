from datetime import datetime

from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.urls import reverse

from orders.controle import *
from tasking.do_pagination import do_pagination
from orders.NewTicketForm import NewTicketForm
from orders.models import OrderInfo, ServiceList

from usermanage.models import User, ClientTable, TypesTable


def ticket(request,page=1):
    data = orderinfo('niezi')
    page_list = do_pagination(data,page)
    pager = page_list[1]
    count = page_list[0]
    order_list = page_list[2]
    return  render(request,'niezi/ordermanage.html',locals())


def detail(request,id):
    order = orderdetail(id)
    return render(request, 'niezi/orderdetail.html',locals())

def state_condition(request):
    '''
    确认工单提交时的工单状态
    :param request: request
    :return: order_status
    '''
    if request.POST.get('sunbmit_finish') and request.POST['sunbmit_finish'] == '提交并处理完毕':
        order_status = 2
    elif request.POST.get('sunbmit_stop') and request.POST['sunbmit_stop'] == '提交并暂停工单':
        order_status = 1
    return order_status

def now_operator(request, form):
    '''
    判断当前操作人
    :param request: request, form
    :param form:
    :return: opreate_id
    '''
    username = request.session.get('username')
    if request.POST.get('opreate') and request.POST['opreate'] == '后台系统':
        del form.cleaned_data['opreate']
        opreate_id = 1000
    elif request.POST.get('opreate') and request.POST['opreate'] == username:
        now_userid = User.objects.filter(username=username).first().id
        del form.cleaned_data['opreate']
        opreate_id = now_userid
    return opreate_id

def new_ticket(request):
    '''
    新建工单
    :param request:
    :return:
    '''

    # 查询数据库数据信息
    id = request.GET.get('id')
    now_user = User.objects.filter(id=id).first()
    customer_list = ClientTable.objects.all()
    big_service = ServiceList.objects.filter(pid=0)
    small_service = ServiceList.objects.exclude(pid=0)
    tyle_list = TypesTable.objects.all()

    # 获取当前时间信息
    create_time = datetime.now()
    # create_time = str(create_time).split('.')[0]
    # print(create_time)
    # print(type(create_time))
    modify_time = create_time
    form = NewTicketForm(request.POST)

    # 表单提交判断
    if request.method == 'POST':
        now_customer = request.POST.get('customer')
        if form.is_valid():
            if not ClientTable.objects.filter(cname=now_customer).exists():
                return HttpResponse('创建新用户')
            order_status = state_condition(request)
            opreate_id = now_operator(request, form)
            finish_time = request.POST['finish_time']
            OrderInfo.objects.create(order_status=order_status, opreate_id=opreate_id, finish_time=finish_time, create_time=create_time, modify_time=modify_time, **form.cleaned_data)
            return HttpResponse('详情页面')

        # return HttpResponse("<h1>404</h1>")
        # return redirect(reverse('orders:new_ticket',kwargs={'form':form}),locals())
        return render(request,'eimago/new_ticket.html',{'form':form})
    return render(request, 'eimago/new_ticket.html', context={'form':form, 'customer_list':customer_list, 'big_service':big_service, 'small_service':small_service, 'tyle_list':tyle_list})

