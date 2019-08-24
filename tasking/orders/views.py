
from datetime import datetime

from django.core.cache import cache
from django.db.models import Q
from django.db.models import Q
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.urls import reverse

from orders.controle import *
from tasking.do_pagination import do_pagination
from orders.NewTicketForm import NewTicketForm
from orders.models import OrderInfo, ServiceList

from users.models import User, ClientTable, UserGroupTable
import xlwt

def ticket(request,page=1):
    username = request.session.get('username')
    user1 = User.objects.filter(username=username).first()
    data = order_info(username)
    page_list = do_pagination(data,page)
    pager = page_list[1]
    count = page_list[0]
    order_list = page_list[2]
    return  render(request,'niezi/manage1.html',locals())


def state_condition(request):
    '''
    确认工单提交时的工单状态
    :param request: request
    :return: order_status
    '''
    if request.POST.get('sunbmit_finish') and request.POST['sunbmit_finish'] == '提交并处理完毕':
        order_status = 9
        return  order_status


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

    # 查询当前用户
    username = request.session.get('username')
    user1 = User.objects.filter(username=username).first()

    # 查询数据库数据信息
    # id = request.GET.get('id')
    # now_user = User.objects.filter(id=id).first()
    customer_list = ClientTable.objects.all()
    big_service = UserGroupTable.objects.filter(pid=0)
    small_service = UserGroupTable.objects.exclude(pid=0)
    print('----',big_service)
    print('-----',small_service)
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
            print('----1---')
            if not ClientTable.objects.filter(cname=now_customer).exists():
                error_total = '客户不存在'
                return render(request, 'eimago/new_ticket.html', locals())
            order_status = state_condition(request)
            opreate_id = now_operator(request, form)
            finish_time = request.POST['finish_time']

            # 将信息写入OrderInfo表
            OrderInfo.objects.create(order_status=order_status,
                                     opreate_id=opreate_id,
                                     finish_time=finish_time,
                                     create_time=create_time,
                                     modify_time=modify_time,
                                     **form.cleaned_data)

            # 将信息写入OrderOperate表
            order = OrderInfo.objects.all().order_by('-id').first()
            order_opreate = OrderOperate()
            order_opreate.order_id = order.id
            order_opreate.opreate_name = username
            order_opreate.from_opreate_id=user1.id
            order_opreate.to_opreate_id = user1.id
            order_opreate.from_priority = order.priority
            order_opreate.to_priority = order.priority
            order_opreate.from_status = 0
            order_opreate.to_status = order_status
            order_opreate.from_copyfor = order.copyfor
            order_opreate.to_copyfor = order.copyfor
            order_opreate.replay = '创建工单'
            order_opreate.save()
            return redirect(reverse('orders:ticket',kwargs={'page':1}))

        # return HttpResponse("<h1>404</h1>")
        # return redirect(reverse('orders:new_ticket',kwargs={'form':form}),locals())
        return render(request,'eimago/new_ticket.html',locals())
    return render(request, 'eimago/new_ticket.html',locals())



def detail(request,id):
    username = request.session.get('username')
    user1 = User.objects.filter(username=username).first()
    data = get_order(id)
    order = data[0]
    opreate = data[1]
    opreates = data[2]
    questions = questions_type()
    comment_data = OrderOperate.objects.filter(~Q(replay = '')).filter(order_id=id).order_by('-id')
    # if order.order_status==9:
    #     render(request,'niezi/orderfinish.html',locals())
    return render(request, 'niezi/detail.html', locals())


def test(request):
    return render(request,'base.html')


def change_order_status(request,id,status):
    print('------++++++++',id,status)
    order = order_status(id,status)
    return redirect(reverse('orders:detail',kwargs={'id':id}),locals())


def delete(request,id):
    order = OrderInfo.objects.get(pk=id)
    order.isdelete = 1
    order.save()
    return redirect(reverse('orders:ticket',kwargs={'page':1}))


def comments(request,id):
    comment = request.POST.get('replay')
    order_log = OrderOperate.objects.filter(order_id=id).first()
    order_log1 = OrderOperate()
    order_log1.order_id=order_log.id
    order_log1.from_opreate_id = order_log.from_opreate_id
    user = User.objects.filter(pk=order_log.from_opreate_id).first()
    username = user.username
    order_log1.to_opreate_id = order_log.to_opreate_id
    order_log1.from_priority=order_log.from_priority
    order_log1.to_priority = order_log.to_priority
    order_log1.from_status=order_log.from_status
    order_log1.to_status = order_log.to_status
    order_log1.from_copyfor = order_log.from_copyfor
    order_log1.to_copyfor = order_log.to_copyfor
    order_log1.replay = comment
    order_log1.opreate_name = username
    order_log1.save()
    return redirect(reverse('orders:detail',kwargs={'id':id}))


def change_info(request,id):
    #获取 表单的最新数据
     data = request.POST
    # 查询原来的order信息
     orign_order= OrderInfo.objects.get(pk=id)
    # 给order提交新的值
     new_order = OrderInfo.objects.get(pk=id)
     question = data.get('question')
     select_priority = data.get('select_priority')
     data1 = data.get('replay_user').split('(')
     opreate_name = data1[0]
     print('---77777777-----',opreate_name)
     opreate_user = User.objects.filter(username=opreate_name).first()
     opreate_id = opreate_user.id
     new_order.opreate_id = opreate_id
     new_order.opreate_name = opreate_name
     new_order.question = question
     new_order.priority = select_priority
     new_order.save()
     # 发邮件准备数据
     user = User.objects.filter(id=orign_order.opreate_id).first()
     boss = User.objects.get(pk=user.id)
     boss_email = boss.email
     boss_name = boss.username

    # 写操作纪录表


     order_log = OrderOperate()
     order_log.order_id = id
     order_log.from_opreate_id=orign_order.opreate_id
     order_log.to_opreate_id = opreate_id
     order_log.from_status = orign_order.order_status
     order_log.to_status = orign_order.order_status
     order_log.from_priority = orign_order.priority
     order_log.to_priority = select_priority
     order_log.from_copyfor = orign_order.copyfor
     order_log.save()
     if  order_log.from_opreate_id != order_log.to_opreate_id:
         send_mail('hello,{}'.format(boss_name), '工单(工单ID：{}) 已由 {} 转移给了 {}'.format( id,boss_name,opreate_name),settings.EMAIL_FROM, [boss_email])
     return redirect(reverse('orders:detail',kwargs={'id':id}))


def export_orders(request):
    response = HttpResponse(content_type='application/ms-excel')
    # response['Content-Disposition'] = 'attachment;filename="工单.xls"'
    # response['Content-Disposition'] = 'attachment; filename="{}工单表.xls"'.format(datetime.now().strftime('%Y-%m-%d'))
    wb = xlwt.Workbook(encoding='utf-8')
    ws = wb.add_sheet('orders')
    row_num = 0
    font_style = xlwt.XFStyle()
    font_style.font.bold = True
    columns = ['工单id','工单标题','工单内容', '工单状态', '处理人', '客户']
    for col_num in range(len(columns)):
        ws.write(row_num, col_num, columns[col_num], font_style)
    font_style = xlwt.XFStyle()
    rows = OrderInfo.objects.filter(opreate_name='niezi').all().values_list('id','title','content','order_status','opreate_name','customer')
    for row in rows:
        row_num += 1
        for col_num in range(len(row)):
            ws.write(row_num, col_num, row[col_num], font_style)
    wb.save(filename_or_stream='工单.xls')
    return response


def batch_processing(request):

    return render(request, 'eimago/batch.html',locals())







