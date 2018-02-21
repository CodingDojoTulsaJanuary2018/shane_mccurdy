from flask import Flask, render_template, send_from_directory
app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template('index.html')

@app.route('/success')
def success():
    return render_template('success.html')

# @app.route("/favicon.ico")
# def favicon():
# return(url_for('static',filename='favicon.ico')
app.run(
    # host=app.config.get("HOST","192.168.11.180")
)
app.debug = True
