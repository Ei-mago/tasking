

from orders.models import OrderInfo, OrderOperate
from users.models import User, TypesTable


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

    return  order


def questions_type():
    questions =TypesTable.objects.all()
    return  questions






