from django.shortcuts import render
from django.http import HttpResponse
import os


def index(request):
	itemList = ["apple", "banana", "cream"]
	context = {'itemList' : itemList}
	return render(request, 'tabproject/index.html', context)

def parsing(request):
	# if request.method == 'get':
	rp = os.path.dirname(os.path.abspath(__file__))
	fp = "{}/parsing/output.json".format(rp)
	with open(fp, 'r') as file:
		data = file.read()

	return HttpResponse(data)