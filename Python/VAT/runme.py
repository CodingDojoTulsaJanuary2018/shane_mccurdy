from flask import Flask, render_template, request, redirect, session, flash
app = Flask(__name__)
app.secret_key = "1234"

@app.route('/')
def _index():
    return render_template('index.html')

@app.route('/ninjas')
def _ninjas():
    return render_template('ninjas.html')

@app.route('/dojos/new')
def _dojos_new():
    session['fn'] = ""
    session['ln'] = ""
    session['lo'] = ""
    session['la'] = ""
    session['cm'] = ""

    return render_template('dojos.html')

@app.route('/dojos/process', methods=['POST'])
def _dojos_process():
    first_name = request.form['first_name']
    last_name = request.form['last_name']
    location = request.form['location']
    language = request.form['language']
    comment = request.form['comment']
    valid = 0
    if len(first_name) < 1:
        flash("First Name cannot be empty")
    else:
        session['fn'] = first_name
        valid += 1
    if len(last_name) < 1:
        flash("Last Name cannot be empty")
    else:
        session['ln'] = last_name
        valid +=1
    if len(comment) > 120:
        flash("Comments are limited to 120 characters")
    else:
        session['cm'] = comment
        valid += 1
    if valid < 3:
        return redirect('dojos/new')
    elif valid == 3:
        return render_template('dojos_submitted.html')


app.run(debug=True)
