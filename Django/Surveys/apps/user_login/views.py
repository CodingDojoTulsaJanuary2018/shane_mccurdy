from django.shortcuts import render, HttpResponse

# Create your views here.
def index(request):
    return HttpResponse("<h1>user_login/index is running</h1>")
