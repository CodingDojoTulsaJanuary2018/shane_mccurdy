from flask import Flask, request, render_template, session, redirect
app = Flask(__name__)
import random

app.secret_key = "098722"

@app.route('/')
def _root():
    if 'guessMe' not in session:
        session['guessMe'] = random.randrange(1,101)
        session['won'] = "False"
        session['feedback_LHW'] = ""
    return render_template('index.html')

@app.route('/guess', methods=['POST'])
def _guess():
    guessed = int(request.form['guess'])
    if guessed == session['guessMe']:
        session['feedback']="You won!"
        session['feedback_class']="green"
        session['won'] = "True"
        session['feedback_LHW'] = "won"
    elif guessed < session['guessMe']:
        session['feedback']="Too low"
        session['feedback_class']="red"
        session['feedback_LHW'] = "too"
    elif guessed > session['guessMe']:
        session['feedback']="Too high"
        session['feedback_class']="red"
        session['feedback_LHW'] = "too"
    else:
        session['feedback']="You gotta enter a number between 1 and 100!"
        session['feedback_class']="red"
    return redirect('/')

@app.route('/reset', methods=['POST'])
def _reset():
    session['guessMe'] = random.randrange(1,101)
    session.pop('feedback')
    session['feedback_class'] = ""
    session['won'] = "False"
    session['feedback_LHW'] = ""
    return redirect('/')

app.run(debug=True)
