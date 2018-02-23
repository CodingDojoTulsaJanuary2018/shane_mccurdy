from django.shortcuts import render, HttpResponse, redirect
from models import *
from django.contrib import messages
# Create your views here.
def index(request):
    context = {
        'courses' : Course.objects.all()
    }
    return render(request, "courses/index.html", context)

def add(request):
    errors = Course.objects.course_validator(request.POST)
    if len(errors):
        for key, error in errors.iteritems():
            messages.error(request, error)
        return redirect('/')
    else:
        Course.objects.create(name=request.POST['name'], desc=request.POST['desc'])
        return redirect('/')

def destroy_check(request, id):
    context= {
        'course': Course.objects.get(id=id)
    }
    return render(request, "courses/destroy.html", context)

def destroy_confirmed(request, id):
    killMe = Course.objects.get(id=id)
    killMe.delete()
    return redirect('/')
