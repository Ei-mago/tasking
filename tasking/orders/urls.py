

from django.conf.urls import url

from orders import views

urlpatterns = [
    url(r'^ticket/(?P<page>\d+)$', views.ticket, name='ticket'),
    url(r'^newticket/$', views.new_ticket, name='new_ticket'),



]
