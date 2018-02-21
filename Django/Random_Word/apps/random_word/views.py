from django.shortcuts import render, HttpResponse, redirect
from time import gmtime, strftime
from django.utils.crypto import get_random_string

def index(request):
    if 'counter' not in request.session:
        request.session['counter'] = 0
    request.session['counter'] = request.session['counter'] + 1
    context = {
    "random_word": get_random_string(length=14)
    }
    return render(request,'random_word/index.html', context)

def reset(request):
    request.session['counter'] = 0
    return redirect('/random_word/')
