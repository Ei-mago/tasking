from datetime import datetime

from django.http import HttpResponse
from django.shortcuts import render

from orders.controle import *
from tasking.do_pagination import do_pagination
from orders.NewTicketForm import NewTicketForm
from orders.models import OrderInfo

from usermanage.models import User, ClientTable


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




def new_ticket(request):
    '''
    新建工单
    :param request:
    :return:
    '''
    id = request.GET.get('id')
    now_user = User.objects.filter(id=id).first()
    customer_list = ClientTable.objects.all()

    if request.method == 'POST':
        form = NewTicketForm(request.POST)
        create_time = datetime.now()
        # create_time = str(create_time).split('.')[0]
        # print(create_time)
        # print(type(create_time))
        modify_time = create_time
        finish_time = request.POST['finish_time']
        if form.is_valid():
            if request.POST.get('sunbmit_finish') and request.POST['sunbmit_finish'] == '提交并处理完毕':
                print(request.POST)
                print(form.cleaned_data)
                order_status = 2
                if request.POST.get('opreate') and request.POST['opreate'] == '后台系统':
                    del form.cleaned_data['opreate']
                    opreate_id = 1000
                    # print(finish_time)
                    OrderInfo.objects.create(order_status=order_status, opreate_id=opreate_id, finish_time=finish_time, create_time=create_time,modify_time=modify_time, **form.cleaned_data)
                    return HttpResponse("成了1")
                else:
                    del form.cleaned_data['opreate']
                    opreate_id = request.POST['opreate_id']
                    OrderInfo.objects.create(order_status=order_status, opreate_id=opreate_id, finish_time=finish_time, create_time=create_time, modify_time=modify_time, **form.cleaned_data)
                    return HttpResponse("成了1")
            elif request.POST.get('sunbmit_stop') and request.POST['sunbmit_stop'] == '提交并暂停工单':
                # print(request.POST)
                # print(form.cleaned_data)
                order_status = 1
                if request.POST.get('opreate') and request.POST['opreate'] == '后台系统':
                    del form.cleaned_data['opreate']
                    opreate_id = 1000
                    # print(finish_time)
                    OrderInfo.objects.create(order_status=order_status, opreate_id=opreate_id, finish_time=finish_time,
                                             create_time=create_time, modify_time=modify_time, **form.cleaned_data)
                    return HttpResponse("成了2")
                else:
                    del form.cleaned_data['opreate']
                    opreate_id = request.POST['opreate_id']
                    OrderInfo.objects.create(order_status=order_status, opreate_id=opreate_id, finish_time=finish_time,
                                             create_time=create_time, modify_time=modify_time, **form.cleaned_data)
                    return HttpResponse("成了2")
        return HttpResponse("<h1>菜</h1>")
    return render(request, 'eimago/new_ticket.html', context={'now_user':now_user, 'customer_list':customer_list})

