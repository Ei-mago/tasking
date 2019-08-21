

from django.conf.urls import url

from manager import views

urlpatterns = [
    url(r'^test2/$', views.test2, name='test1')

]
