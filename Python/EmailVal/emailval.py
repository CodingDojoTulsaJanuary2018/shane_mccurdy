from flask import Flask, request, redirect, render_template, session, flash
from mysqlconnection import MySQLConnector
import time, datetime, re

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
# NAME_REGEX = re.compile(r'^[a-zA-Z]+$')

app = Flask(__name__)
app.secret_key = "214365"
mysql = MySQLConnector(app,'emailval')

@app.route('/')
def _root():
    # session['email'] = ""
    return render_template('index.html')

@app.route('/email_validate', methods=['POST'])
def _email_validate():
    email = request.form['email']
    if len(email) < 7:
        session['email'] = email
        flash("Please enter a valid email")
    elif not EMAIL_REGEX.match(email):
        session['email'] = email
        flash("Invalid email address!")
    else:
        session['email'] = email
        return redirect('/insert_email')
    return render_template('index.html')

@app.route('/insert_email')
def _insert_email():
    query = "INSERT INTO emails (email, created_at, updated_at) VALUES (:email, NOW(), NOW())"
    data = {
             'email': session['email']
           }
    print session['email']
    mysql.query_db(query,data)
    flash("The email address you entered ("+ session['email'] +") is a VALID email address. Thank you!")
    session.pop('email')
    return redirect('/success')

@app.route('/success')
def _success():
    query = "SELECT * FROM emails"                           # define your query
    emails = mysql.query_db(query)
    return render_template('/displayemails.html', emails_list=emails )

app.run(debug=True)  #,host=app.config.get("HOST","192.168.11.180"))
