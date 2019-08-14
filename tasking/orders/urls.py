

from django.conf.urls import url

from orders import views

urlpatterns = [
    url(r'^ticket/(?P<page>\d+)$', views.ticket, name='ticket')


]
