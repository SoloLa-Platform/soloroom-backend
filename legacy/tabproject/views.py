from __future__ import unicode_literals
from django.shortcuts import render
from django.http import HttpResponse
import os
import youtube_dl


def index(request):
	return render(request, 'tabproject/index.html')

def parsing(request):
	# if request.method == 'get':
	rp = os.path.dirname(os.path.abspath(__file__))
	fp = "{}/parsing/output.json".format(rp)
	with open(fp, 'r') as file:
		data = file.read()

	return HttpResponse(data)

def data(request):
	# if request.method == 'get':
	rp = os.path.dirname(os.path.abspath(__file__))
	fp = "{}/data/lick_13.json".format(rp)
	with open(fp, 'r') as file:
		data = file.read()

	return HttpResponse(data)


def keywordSearch(request):
	url = request.GET.get('url')
	print(url)

	dlDir = os.path.join(os.path.dirname(__file__), 'download/test')
	ydl_opts = {
		# 'outtmpl': '%(id)s.%(ext)s',
		'outtmpl': 'tabproject/download/%(title)s.%(ext)s',
	    'format': 'bestaudio/best',
		'verbose': True,
	    'postprocessors': [{
	        'key': 'FFmpegExtractAudio',
	        'preferredcodec': 'wav',
	        'preferredquality': '192',
	    }]
		# 'progress_hooks': [{
		# 	'filename'
		# }]
	}
	with youtube_dl.YoutubeDL(ydl_opts) as ydl:
		info = ydl.extract_info(url, download=False)
		print(info['title'])
		ydl.download([url])


	return HttpResponse("keywordSearch reslut", content_type="text/plain")

def gapiValid(request):
	return render(request, 'gapi/google3cebc5b9808be979.html')
