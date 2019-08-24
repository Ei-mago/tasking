

from django.conf.urls import url

from users import views

urlpatterns = [
    url(r'^register/$', views.register, name='register'),
    url(r'^login/$', views.login, name='login'),
    url(r'^retreve/$', views.retreve, name='retreve'),
    url(r'^logout/$',views.logout,name='logout'),
    url(r'^user_list/$',views.user_list,name='user_list'),
    url(r'^customer/$',views.customer,name='customer'),
    url(r'^customer_list/$',views.customer_list,name='customer_list'),
    url(r'^changeword/$', views.changeword, name='changeword'),
    url(r'^check/$', views.check, name='check'),
    # url(r'^activate/(?P<token>.+)/$', views.activate, name='activate'),
]