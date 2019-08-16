

from orders.models import OrderInfo
from usermanage.models import User


def orderinfo(username):
    username = 'niezi'
    opreate_id = User.objects.filter(username=username)
    data = OrderInfo.objects.filter(opreate_id=opreate_id)
    return data


def orderdetail(id):
    order = OrderInfo.objects.get(pk=id)
    return  order