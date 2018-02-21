from django.conf.urls import url
from . import views
urlpatterns = [
    url(r'^$', views.sw_index),
    url(r'^add_word$', views.sw_add_word),
    url(r'^clear$', views.sw_clear)
]
