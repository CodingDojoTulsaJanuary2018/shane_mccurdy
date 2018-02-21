from flask import Flask, request, redirect, render_template, session, flash
from mysqlconnection import MySQLConnector
import time, datetime, re, md5, os, binascii

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
NAME_REGEX = re.compile(r'^[a-zA-Z]+$')

app = Flask(__name__)
app.secret_key = "1243"
mysql = MySQLConnector(app,'friendsdb')


def hash_back(not_hashed):
    if 'salt' not in session:
        session['salt'] = binascii.b2a_hex(os.urandom(15))
    now_hashed = md5.new(not_hashed + session['salt']).hexdigest()
    return now_hashed

@app.route('/')
def _index():
    query = "SELECT * FROM friends"                           # define your query
    friends = mysql.query_db(query)
    if 'logged_in' not in session:
        session['logged_in'] = 0                        # run query with query_db()
        session['email'] = ""  # "dummy@dummymail.com"
        session['first_name'] = ""  # "Dummy"
        session['last_name'] = ""  # "Dumdum"
        session['pwd'] = ""  # "12345678"
        session['pwdc'] = "" # "1234567"
        session['li_email'] = ""
        session['li_pwd'] = ""
    return render_template('index.html', all_friends=friends) # pass data to our template

@app.route('/add_friends', methods=['POST'])
def _add_friends():
    # Write query as a string. Notice how we have multiple values
    # we want to insert into our query.
    query = "INSERT INTO friends (first_name, last_name, age, friend_since) VALUES (:first_name, :last_name, :age, NOW())"
    # We'll then create a dictionary of data from the POST data received.
    data = {
             'first_name': request.form['first_name'],
             'last_name':  request.form['last_name'],
             'age': int(request.form['age']),
           }
    # Run query, with dictionary values injected into the query.
    mysql.query_db(query, data)
    return redirect('/')

@app.route('/login')
def _login():
    return render_template('regiform.html')

@app.route('/logout')
def _logout():
    session.pop('logged_in')
    flash("<h2 style='color:green'>Okay " + session['auth_user_first_name'] + ", you're logged out now.</h2>" )
    session.pop('auth_user_first_name')
    return redirect('/')


@app.route('/verify_login', methods=['POST'])
def _verify_login():
    li_email = request.form['li_email']
    li_pwd = request.form['li_pwd']
    test = 0

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
            session['salt'] = auth_user[0]['salt'] # and compare to the hashed password from the database to authenticate
            if auth_user[0]['password'] == hash_back(li_pwd):
                session['auth_user_first_name'] = auth_user[0]['first_name']
                flash( "<h2 style='color:green'>Welcome back " + auth_user[0]['first_name'] + "</h2>" )
                session['logged_in'] = 1
                session.pop('li_email')
                session.pop('li_pwd')
                return redirect('/')
            else:
                flash("That username and password did not match out records")
                return redirect('/login')
        else:
            flash("That username and password did not match out records")
            return redirect('/login')
    else:
        return redirect('/login')

@app.route('/user_registration', methods=['POST'])
def _user_registration():
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

    if test == 4: #if all tests are good...
        session['flash_me'] = "<h2 style='color:green' >SUCCESS!</h2><h2 style='color:green' >Welcome "+ first_name +"</h2>"
        session['logged_in'] = 1
        session['auth_user_first_name'] = first_name
        return redirect('/add_users')
    else: #else return to form page...
        return redirect('/login')

@app.route('/add_users')
def _add_users():
    # Write query as a string. Notice how we have multiple values
    # we want to insert into our query.
    query = "INSERT INTO users (first_name, last_name, email, password, salt) VALUES (:first_name, :last_name, :email, :password, :salt)"
    # We'll then create a dictionary of data from the POST data received.
    data = {
             'first_name': session['first_name'],
             'last_name':  session['last_name'],
             'email': session['email'],
             'password': hash_back(session['pwd']),
             'salt': session['salt']
           }
    # Run query, with dictionary values injected into the query.
    mysql.query_db(query, data)
    flash( session['flash_me'] )#set above
    session.pop('flash_me')
    session.pop('email')
    session.pop('first_name')
    session.pop('last_name')
    session.pop('pwd')
    session.pop('pwdc')
    return redirect('/')

# @app.route('/friends/<friend_id>')
# def show(friend_id):
#     # Write query to select specific user by id. At every point where
#     # we want to insert data, we write ":" and variable name.
#     query = "SELECT * FROM friends WHERE id = :specific_id"
#     # Then define a dictionary with key that matches :variable_name in query.
#     data = {'specific_id': friend_id}
#     # Run query with inserted data.
#     friends = mysql.query_db(query, data)
#     # Friends should be a list with a single object,
#     # so we pass the value at [0] to our template under alias one_friend.
#     return render_template('index.html', one_friend=friends[0])

# @app.route('/update_friend/<friend_id>', methods=['POST'])
# def update(friend_id):
#     query = "UPDATE friends SET first_name = :first_name, last_name = :last_name, occupation = :occupation WHERE id = :id"
#     data = {
#              'first_name': request.form['first_name'],
#              'last_name':  request.form['last_name'],
#              'occupation': request.form['occupation'],
#              'id': friend_id
#            }
#     mysql.query_db(query, data)
#     return redirect('/')
#
# @app.route('/remove_friend/<friend_id>', methods=['POST'])
# def delete(friend_id):
#     query = "DELETE FROM friends WHERE id = :id"
#     data = {'id': friend_id}
#     mysql.query_db(query, data)
#     return redirect('/')


app.run(debug=True,host=app.config.get("HOST","192.168.11.180"))
