

from django.conf.urls import url

from usermanage import views

urlpatterns = [
    # url(r'^index/$', views.index, name='index'),
    url(r'^register/$', views.register, name='register'),
    url(r'^login/$', views.login, name='login'),
    url(r'^retreve/$', views.retreve, name='retreve'),
    url(r'^check/$', views.check, name='check'),
    url(r'^changeword/$', views.changeword, name='changeword')

    # url(r'^activate/(?P<token>.+)/$', views.activate, name='activate'),
]