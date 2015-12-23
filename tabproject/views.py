from django.shortcuts import render
from django.http import HttpResponse


def index(request):
	itemList = ["apple", "banana", "cream"]
	context = {'itemList' : itemList}
	return render(request, 'tabproject/index.html', context)
    # return HttpResponse("Hello, world. You're at the polls index.")