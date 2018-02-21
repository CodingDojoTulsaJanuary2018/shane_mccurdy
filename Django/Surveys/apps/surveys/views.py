from django.shortcuts import render, HttpResponse, redirect

# Create your views here.
def index(request):
    if "counter" not in request.session:
        request.session['counter'] = 0
    return render(request,'surveys/index_form.html')

def process_index_form(request):
    if request.method == 'POST':
        request.session['counter'] = request.session['counter']+1
        request.session['name'] = request.POST['name']
        request.session['dojo_location'] = request.POST['dojo_location']
        request.session['fav_lang'] = request.POST['fav_lang']
        request.session['comment'] = request.POST['comment']
        return redirect('/result')

def process_result(request):
    context = {
        "name": request.session['name'],
        "dojo_location" : request.session['dojo_location'],
        "fav_lang" : request.session['fav_lang'],
        "comment": request.session['comment'],
        "counter": request.session['counter']
    }
    return render(request, 'surveys/result.html', context)
