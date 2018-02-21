from flask import Flask, request, render_template, session, redirect
app = Flask(__name__)
app.secret_key = '8967452310'

@app.route('/')
def _root():
    return render_template('counter_index.html', the_count=session['the_count'])

@app.route('/posted', methods=['POST'])
def _posted():
    session['the_count']+= 2
    return redirect('/')

@app.route('/reset', methods=['POST'])
def _reset():
    session['the_count'] = 0
    return redirect('/')

app.run(debug=True)
