from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^parsing', views.parsing, name='parsing'),
    url(r'^$', views.index, name='index')

]