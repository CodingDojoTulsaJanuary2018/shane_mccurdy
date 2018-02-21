from django.shortcuts import render, HttpResponse, redirect
  # the index function is called when root is visited

def index(request):
    response = "<h1 style='font-size: 5em; color: #666; margin: 15%; text-align: center; font-family:monospace' >placeholder to later display all the list of blogs</h2>"
    return HttpResponse(response)

def new(request):
    response = "<h1 style='font-size: 5em; color: #666; margin: 15%; text-align: center; font-family:monospace' >placeholder to display a new form to create a new blog</h2>"
    return HttpResponse(response)

def create(request):
    pass
    return redirect('/')

def show(request, number):
    response = "<h1 style='font-size: 5em; color: #666; margin: 15%; text-align: center; font-family:monospace' >placeholder to display blog "+ number +"</h2>"
    return HttpResponse(response)

def edit(request, number):
    response = "<h1 style='font-size: 5em; color: #666; margin: 15%; text-align: center; font-family:monospace' >placeholder to edit blog "+ number +"</h2>"
    return HttpResponse(response)

def delete(request, number):
    print number
    return redirect('/')
