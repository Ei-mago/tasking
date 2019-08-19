

from django.conf.urls import url

from orders import views

urlpatterns = [
    url(r'^ticket/(?P<page>\d+)$', views.ticket, name='ticket'),
    url(r'^detail/(?P<id>\d+)$',views.detail,name='detail'),
    url(r'^opreate/(?P<id>\d+)/(?P<status>\d+)$',views.change_order_status ,name ='opreate'),
    url(r'^delete/(?P<id>\d+)$',views.delete,name='delete'),
    url(r'^replay/(?P<id>\d+)$',views.repaly,name='replay'),
    url(r'^change_info/(?P<id>\d+)$',views.change_info,name='change_info'),
    url(r'^test/',views.test, name= 'test')


]
