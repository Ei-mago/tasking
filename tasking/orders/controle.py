from django.core.mail import send_mail

from orders.models import OrderInfo, OrderOperate
from tasking import settings
from users.models import User, TypesTable, ClientTable


def order_info(username):
    username = 'niezi'
    opreate_id = User.objects.filter(username=username)
    data = OrderInfo.objects.filter(opreate_id=opreate_id)
    return data


def get_order(id):
    order = OrderInfo.objects.get(pk=id)
    opreate_id = order.opreate_id
    opreate = User.objects.get(pk=opreate_id)
 # 根据订单所属客户 查 客服组别 ，返回 客服列表
    group_id = opreate.ugid
    opreates = User.objects.filter(ugid=group_id)
    order_data = []
    order_data.append(order)
    order_data.append(opreate)
    order_data.append(opreates)
    return  order_data

def order_status(id,status):
    #查询工单当前数据
    order = OrderInfo.objects.get(pk=id)
    order_status = order.order_status
    opreate_id = order.opreate_id
    priority = order.priority
    customer = order.customer
    user = User.objects.get(pk=opreate_id)
    ocustomer = ClientTable.objects.filter(cname=customer).first()
    # 发给客户的邮件
    customer_email = ocustomer.ccontactemail
    status_name = order.get_order_status_display()
    title = order.title
    order_time = order.create_time
    # 发给上司的邮件
    boss = User.objects.get(pk=user.pid)
    boss_email = boss.email
    order_id = order.id
    # 更新order_info
    order.order_status=status
    order.save()

    # 更新order_opreate
    order = OrderOperate()
    order.order_id = id
    order.operate_id = opreate_id
    order.from_status = order_status
    order.to_status = status
    order.from_priority = priority
    order.to_priority = priority
    order.save()
    order1 = OrderOperate.objects.filter(order_id=id).first()
    if status == 9:
        send_mail('hello,{}'.format(boss.username),'下属{} 提交的工单(工单ID：{}) 已经处理完成'.format(user.username,order_id),settings.EMAIL_FROM,[boss_email])
        send_mail('hello,{}'.format(customer),'您在 {} 咨询的问题 {} 已经处理完毕，请及时查看哦'.format(order_time,title),settings.EMAIL_FROM,[customer_email])
    else:
        send_mail('hello,{}'.format(boss.username), '下属{} 提交的工单: (工单ID：{})  状态更新为：{}'.format(user.username,order_id,status_name), settings.EMAIL_FROM, [boss_email])
        send_mail('hello,{}'.format(customer), '您在 {} 咨询的问题: {} 状态更新为：{}'.format(order_time, title, status_name),settings.EMAIL_FROM, [customer_email])

    return  order


def questions_type():
    questions =TypesTable.objects.all()
    return  questions








