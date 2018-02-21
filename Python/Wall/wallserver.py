from flask import Flask, request, redirect, render_template, session, flash
from mysqlconnection import MySQLConnector
import time, datetime, re

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
NAME_REGEX = re.compile(r'^[a-zA-Z]+$')

app = Flask(__name__)
app.secret_key = "214365"
mysql = MySQLConnector(app,'wall')


@app.route('/')
def _index():
    if 'logged_in' not in session:  # we are going to test logged_in,
        session['logged_in'] = 0    # so if there is none in session, we set it to 0

    if session['logged_in'] == 1:   # if they are logged in by the verify_login process,
                                    # they will be set to 1 and the wall.html will render
                                    # the messages, comments, and users
        query = "SELECT * FROM messages ORDER BY updated_at DESC"
        messages = mysql.query_db(query)
        query = "SELECT * FROM comments"
        comments = mysql.query_db(query)
        query = "SELECT * FROM users"
        users = mysql.query_db(query)
        # print messages
        # print comments
        # print users
        return render_template('wall.html', all_messages=messages, all_comments=comments, all_users=users )
    else:
        # if they are not logged in, they will be sent to the login page
        # sesson stores the form input so they don't have to retype everything
        # if the form didn't validate all of their input -- because I'm a nice guy

        session['email'] = ""  # "dummy@dummymail.com"
        session['first_name'] = ""  # "Dummy"
        session['last_name'] = ""  # "Dumdum"
        session['pwd'] = ""  # "12345678"
        session['pwdc'] = "" # "1234567"
        session['li_email'] = ""
        session['li_pwd'] = ""
    return render_template('login.html')

@app.route('/verify_login', methods=['POST'])
def _verify_login():
    li_email = request.form['li_email']
    li_pwd = request.form['li_pwd']
    test = 0    # when all our inputs are validated they increment this,
                # so we know if everything was good or not
    if len(li_email) < 1:
        flash("Please enter a valid email")
    elif not EMAIL_REGEX.match(li_email):
        flash("Invalid email address!")
    else:
        session['li_email'] = li_email
        test += 1
    if len(li_pwd) < 8:
        flash("Please enter a password of at least 8 characters")
    else:
        session['li_pwd'] = li_pwd
        test += 1

    if test == 2: #if validated - send to database
        query = "SELECT * FROM users WHERE email = :email"
        data = {
                 'email': li_email
               }
        auth_user = mysql.query_db(query, data)

        if len(auth_user) != 0: # if the database regognized the email, hash the login password with the salt

            if auth_user[0]['password'] == li_pwd:
                session['auth_user_first_name'] = auth_user[0]['first_name']
                session['user_id'] = auth_user[0]['id']
                flash( "<h2 style='color:green'>Welcome back " + auth_user[0]['first_name'] + "</h2>" )
                session['logged_in'] = 1
                session.pop('li_email')
                session.pop('li_pwd')
                return redirect('/')
            else:
                flash("That username and password did not match out records")
                return render_template('login.html')
        else:
            flash("That username and password did not match out records")
            return render_template('login.html')
    else:
        return render_template('login.html')


@app.route('/user_registration', methods=['POST'])
def _user_registration():
    email = request.form['email']               # form data is put into shorter
    first_name = request.form['first_name']     # named variables - for readability
    last_name = request.form['last_name']
    pwd = request.form['pwd']
    pwdc = request.form['pwdc']
    test = 0        # when all our inputs are validated they increment this,
                    # so we know if everything was good or not

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

    if test == 4: #if all tests are good...
        session['flash_me'] = "<h2 style='color:green' >SUCCESS!</h2><h2 style='color:green' >Welcome "+ first_name +"</h2>"
        session['logged_in'] = 1
        session['auth_user_first_name'] = first_name
        return redirect('/add_users')
    else: #else return to form page...
        return render_template('login.html')

@app.route('/add_users')
def _add_users():
    query = "INSERT INTO users (first_name, last_name, email, password, created_at, updated_at) VALUES (:first_name, :last_name, :email, :password, NOW(), NOW())"
    data = {
             'first_name': session['first_name'],
             'last_name':  session['last_name'],
             'email': session['email'],
             'password': session['pwd']
           }

    session['user_id'] = mysql.query_db(query, data)
    flash( session['flash_me'] )#set above
    session.pop('flash_me')
    session.pop('email')
    session.pop('first_name')
    session.pop('last_name')
    session.pop('pwd')
    session.pop('pwdc')
    return redirect('/')

@app.route('/post_a_message', methods=['POST'])
def _post_a_message():
    query = "INSERT INTO messages (users_id, message, created_at, updated_at) VALUES (:users_id, :message, NOW(), NOW())"
    data = {
             'users_id': session['user_id'],
             'message':  request.form['text']
           }
    mysql.query_db(query, data)
    return redirect('/')


@app.route('/post_a_comment', methods=['POST'])
def _post_a_comment():
    query = "INSERT INTO comments (messages_id, users_id, comment, created_at, updated_at) VALUES (:messages_id, :users_id, :comment, NOW(), NOW())"
    data = {
            'messages_id': int(request.form['message_id']),
            'users_id': session['user_id'],
            'comment':  request.form['text']
           }
    mysql.query_db(query, data)
    return redirect('/')


@app.route('/logout')
def _logout():
    session.pop('logged_in')
    flash("<h2 style='color:green'>Okay " + session['auth_user_first_name'] + ", you're logged out now.</h2>" )
    session.pop('auth_user_first_name')
    return redirect('/')

app.run(debug=True)
#app.run(debug=True,host=app.config.get("HOST","192.168.11.180"))
