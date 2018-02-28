from django.shortcuts import render, HttpResponse, redirect
from django.core.urlresolvers import reverse
from django.contrib import messages
from models import User


def index(request):
    return render(request, "login/index.html")

def login(request):
    tryMe = User.objects.try_by_email(request.POST)
    # gets the User object back if the email and password validate...
    # otherwiae it gets back a library of errors messages.
    if type(tryMe) == User:
        context = {
            'action' : 'logged in',
            'username' : tryMe.first_name
        }
        return render(request, "login/success.html", context)
    else:
        if len(tryMe):
            for key, error in tryMe.iteritems():
                messages.error(request, error)
        return redirect(reverse('login:index'))

def add(request):
    errors = User.objects.user_validator(request.POST)
    if len(errors):
        for key, error in errors.iteritems():
            messages.error(request, error)
        return redirect('/')
    else: # need to check if email exists and not duplicete data in the DB
        newUser = User.objects.create(
            first_name=request.POST['first_name'],
            last_name=request.POST['last_name'],
            email=request.POST['email'],
            password=request.POST['password'],
        )
        context ={
            "action" : "registered",
            "username" : newUser.first_name
        }
        return render(request, "login/success.html", context)

def show(request):
    context = {
        "users": User.objects.all()
    }
    return render(request, "login/show.html", context)

def delete(request, id):
    killMe = User.objects.get(id=id)
    killMe.delete()
    return redirect(reverse('login:show'))
