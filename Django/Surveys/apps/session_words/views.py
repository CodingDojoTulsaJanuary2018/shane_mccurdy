from django.shortcuts import render, HttpResponse, redirect
from time import *

def sw_index(request):
    if "session_words_list" not in request.session:
        request.session["session_words_list"] = []
    context = {
        'words_list' : request.session["session_words_list"]
    }
    return render(request,'session_words/sw_index.html', context)

def sw_add_word(request):
    if request.method == 'POST':
        new_word_add = {}
        # print request.POST['big'] + "<><>BIG"
        new_word_add['word'] = request.POST['new_word']
        new_word_add['color'] = request.POST['color']
        if 'big' in request.POST:
            new_word_add['big'] = request.POST['big']
        else:
            new_word_add['big'] = ""

        #new_word_add['time'] = "2:15:42 PM, Feb 19th 2018"
        new_word_add['time'] = strftime("%I:%M:%S %b %d %Y", gmtime())

        dummy_add = request.session['session_words_list']
        dummy_add.append(new_word_add)
        request.session['session_words_list'] = dummy_add

        return redirect('/session_words') #goes to sw_index()


def sw_clear(request):
    request.session.pop('session_words_list')
    return redirect('/session_words')
