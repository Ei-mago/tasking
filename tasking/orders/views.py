from django.db.models import Q
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.urls import reverse

from orders.controle import *
from tasking.do_pagination import do_pagination


def ticket(request,page=1):
    data = order_info('niezi')
    page_list = do_pagination(data,page)
    pager = page_list[1]
    count = page_list[0]
    order_list = page_list[2]
    return  render(request,'niezi/ordermanage.html',locals())


def detail(request,id):
    data = get_order(id)
    order = data[0]
    opreate = data[1]
    opreates = data[2]
    questions = questions_type()
    comment_data = OrderOperate.objects.filter(~Q(replay = ''))
    if order.order_status==9:
        render(request,'niezi/orderfinish.html',locals())
    return render(request, 'niezi/orderdetail1.html', locals())


def test(request,id):
    return HttpResponse('hah')


def change_order_status(request,id,status):
    order = order_status(id,status)
    return redirect(reverse('orders:detail',kwargs={'id':id}),locals())


def delete(request,id):
    order = OrderInfo.objects.get(pk=id)
    order.delete = 1
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
     print('---------------',data)
    # 查询原来的order信息
     orign_order= OrderInfo.objects.get(pk=id)
    # 给order提交新的值
     new_order = OrderInfo.objects.get(pk=id)
     question = data.get('question')
     select_priority = data.get('select_priority')
     data1 = data.get('replay_user').split('(')
     print('---------------',data1)
     opreate_name = data1[0]
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
     print(boss.email)

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
     print('---1---')
     order_log.save()

     order_log1 = OrderOperate.objects.filter(order_id=id).first()
     print('---2---')
     if  order_log1.from_opreate_id != order_log.to_opreate_id:
         print('---3---')
         send_mail('hello,{}'.format(boss.username), '工单(工单ID：{}) 已由 {} 转移给了 {}'.format(boss_name, id,opreate_name),settings.EMAIL_FROM, [boss_email])

     return redirect(reverse('orders:detail',kwargs={'id':id}))