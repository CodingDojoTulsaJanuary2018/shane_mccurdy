from flask import Flask, session, request, redirect, render_template, flash
app = Flask(__name__)
import re
EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
NAME_REGEX = re.compile(r'^[a-zA-Z]+$')
app.secret_key = "1233"

@app.route('/')
def _root():
    session['email'] = ""  # "dummy@dummymail.com"
    session['first_name'] = ""  # "Dummy"
    session['last_name'] = ""  # "Dumdum"
    session['pwd'] = ""  # "12345678"
    session['pwdc'] = "" # "1234567"
    return render_template('regiform.html')

@app.route('/process', methods=['POST'])
def _process():
    email = request.form['email']
    first_name = request.form['first_name']
    last_name = request.form['last_name']
    pwd = request.form['pwd']
    pwdc = request.form['pwdc']
    test = 0

    if len(email) < 1:
        flash("Please enter a valid email")
    elif not EMAIL_REGEX.match(email):
        flash("Invalid email address!")
    else:
        session['email'] = email
        test += 1

    if len(first_name) < 1:
        flash("Please enter a vaild first name")
    elif not NAME_REGEX.match(first_name):
        flash("Invalid first name. Only letters please")
    else:
        session['first_name'] = first_name
        test += 1

    if len(last_name) < 1:
        flash("Please enter a vaild last name")
    elif not NAME_REGEX.match(last_name):
        flash("Invalid last name. Only letters please")
    else:
        session['last_name'] = last_name
        test += 1

    if len(pwd) < 8:
        flash("Please enter a password of at least 8 characters")
    elif (len(pwd) >= 8 ) and (pwd != pwdc):
        flash("Your password does not match your confirmation")
    else:
        session['pwd'] = pwd
        session['pwdc'] = pwdc
        test += 1
    if test == 4:
        flash("<h2 style='color:green'>SUCCESS</h2>")
        session['email'] = ""  # "dummy@dummymail.com"
        session['first_name'] = ""  # "Dummy"
        session['last_name'] = ""  # "Dumdum"
        session['pwd'] = ""  # "12345678"
        session['pwdc'] = "" # "1234567"
    return redirect('/')

app.run(debug=True)
