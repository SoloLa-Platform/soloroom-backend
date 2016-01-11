from __future__ import unicode_literals

from django.db import models
from django.utils import timezone

class RequestLog(models.Model):
# Create your models here.
	user_id = models.IntegerField(default=0)
	access_date = models.DateTimeField(
            default=timezone.now)

	def write(self):
		self.access_date = timezone.now()
		self.save()


