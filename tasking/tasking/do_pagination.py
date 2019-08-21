from django.core.paginator import Paginator

from tasking.settings import PERPAGE, PAGERANGE, BISECT


def do_pagination(data,page):

    """
    封装分页的函数
    :param data:  指传过来的要进行分页展示的数据
    :param page:  当前的页数，默认值为1
    :return:  
    """

    data = data
    page = page
    # 生成 分页对象
    paginator = Paginator(data,PERPAGE)
    # 生成单页对象
    pager = paginator.page(page)
    # 获取当页的数据
    pager_data = pager.object_list

    if paginator.num_pages > PAGERANGE:
        if page - BISECT <= 0:
            my_page_range = range(1, PAGERANGE+1)
        elif page + BISECT-1 > paginator.num_pages:
            my_page_range = range(paginator.num_pages - (PAGERANGE-1), paginator.num_pages + 1)
        else:
            my_page_range = range(page - BISECT, page + BISECT)
    else:
        my_page_range = paginator.page_range

    pager.page_range = my_page_range
    count = paginator.count
    page_list =[]
    page_list.append(count)
    page_list.append(pager)
    page_list.append(pager_data)

    return page_list
