from flask import Flask, session, request, redirect, render_template
app = Flask(__name__)
import random

app.secret_key = "0000000"

@app.route('/')
def _root():
    if 'your_gold' not in session:
        session['your_gold'] = 0
        session['tracker'] = []
    return render_template('ninjagold.html')

@app.route('/process_money', methods=['POST'])
def _process_money():

    if request.form['where_to'] == "farm":
        golds = random.randrange(10,21)
        session['your_gold'] += golds
        what_happened = "<div class='green'>Earned "+ str(golds) +" golds from the farm</div>"

    elif request.form['where_to'] == "cave":
        golds = random.randrange(5,11)
        session['your_gold'] += golds
        what_happened = "<div class='green'>Earned "+ str(golds) +" golds from the cave</div>"

    elif request.form['where_to'] == "house":
        golds = random.randrange(2,26)
        session['your_gold'] += golds
        what_happened = "<div class='green'>Earned "+ str(golds) +" golds from the house</div>"

    elif request.form['where_to'] == "casino":
        winloss = random.randrange(0,2)  # 0 = loose AND 1 = win
        if winloss:
            winloss = "won" # re-use variable for string later
            golds = random.randrange(0,51)
            session['your_gold'] += golds
            what_happened = "<div class='green'>Entered a casino and "+ winloss +" "+ str(golds) +" golds! Nice!</div>"
        else:
            winloss = "lost"
            golds = random.randrange(0,51)
            session['your_gold'] -= golds
            what_happened = "<div class='red'>Entered a casino and "+ winloss +" "+ str(golds) +" golds... Ouch..</div>"
    session['tracker'].insert(0,what_happened)

    return redirect('/')

@app.route('/restart')
def _restart():
    session['your_gold'] = 0
    session['tracker'] = []
    return render_template('ninjagold.html')

app.run(debug=True)
