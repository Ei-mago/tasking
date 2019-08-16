


from django.shortcuts import render

from orders.controle import *
from tasking.do_pagination import do_pagination


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