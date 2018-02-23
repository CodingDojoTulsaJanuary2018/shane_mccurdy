from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index),
    url(r'^add$', views.add),
    url(r'^courses/destroy/(?P<id>\d+)$', views.destroy_check),
    url(r'^courses/destroy/(?P<id>\d+)/destroy_confirmed$', views.destroy_confirmed)
]
