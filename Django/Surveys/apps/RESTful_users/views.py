from django.shortcuts import render, HttpResponse, redirect
from django.core.urlresolvers import reverse
from models import *

# --THESE ARE SOME DUMMY VIEW-FUNCTIONS BELOW--
def index(request):
    context = {
        'all_users': User.objects.all()
    }
    return render(request, "RESTful_users/RU_index.html", context)

def new(request):
    return render(request, "RESTful_users/add_user.html")

def show_by_id(request, id):
    context = {
        'user' : User.objects.get(id=id)
    }
    return render(request, "RESTful_users/show_user.html", context)

def edit_by_id(request, id):
    context = {
        'user' : User.objects.get(id=id)
    }
    return render(request, "RESTful_users/edit_user.html", context)

def delete_by_id(request, id):
    killMe = User.objects.get(id=id)
    print "Killing " + killMe.first_name
    killMe.delete()
    return redirect(reverse('RESTful_users:users'))

def create(request):
    if request.method == 'POST':
        User.objects.create(first_name=request.POST['first_name'],last_name=request.POST['last_name'],email=request.POST['email'])
    return redirect(reverse('RESTful_users:users'))

def update(request):
    if request.method == 'POST':
        updateMe = User.objects.get(id=request.POST['id'])
        updateMe.first_name=request.POST['first_name']
        updateMe.last_name=request.POST['last_name']
        updateMe.email=request.POST['email']
        updateMe.save()
    return redirect(reverse('RESTful_users:users'))


# url(r'^users$', views.index),
# url(r'^users/new$',views.new),
# url(r'^users/<id>$',views.show_by_id),
# url(r'^users/<id>/edit$',views.edit_by_id),
# url(r'^users/<id>/destroy$',views.delete_by_id),
# url(r'^users/create$',views.create),
# url(r'^users/update$',views.update)
