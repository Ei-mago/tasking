

from django.conf.urls import url

from usermanage import views

urlpatterns = [
    url(r'^test/$',views.test,name='test'),
    url(r'^login/$', views.login, name='login'),
]

















