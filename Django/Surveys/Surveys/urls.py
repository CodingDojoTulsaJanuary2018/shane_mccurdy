from django.conf.urls import url, include
from django.contrib import admin

urlpatterns = [
    url(r'^', include('apps.surveys.urls')),
    url(r'^session_words/', include('apps.session_words.urls')),
    url(r'^user_login/', include('apps.user_login.urls')),
    url(r'^dojo_ninjas/', include('apps.dojo_ninjas.urls')),
    url(r'^RESTful_users/',include('apps.RESTful_users.urls', namespace='RESTful_users')),
    url(r'^admin/', admin.site.urls),
]
