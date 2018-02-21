
# Create your views here.
from django.shortcuts import render, HttpResponse, redirect
  # the index function is called when root is visited
def index(request):
    response = "<h1 style='font-size: 5em; color: #666; text-align: center; font-family:monospace' >Shane wuz here!</h2>"
    return HttpResponse(response)
