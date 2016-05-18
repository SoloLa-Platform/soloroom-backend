from django.contrib import admin

# Register your models here.
from .models import RequestLog

admin.site.register(RequestLog)