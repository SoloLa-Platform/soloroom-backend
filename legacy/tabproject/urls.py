from django.conf.urls import url

from . import views

urlpatterns = [
	url(r'^$', views.index, name='index'),
    url(r'^keywordSearch', views.keywordSearch, name='soloLa-keywordSearch'),
    url(r'^parsing', views.parsing, name='parsing'),
    url(r'^data', views.data, name='data'),
    url(r'^google3cebc5b9808be979.html$', views.gapiValid, name='gapiValid')

]
