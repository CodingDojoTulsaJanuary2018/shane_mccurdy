from flask import Flask, render_template, send_from_directory
app = Flask(__name__)

@app.route('/')
def p1():
    return render_template('NewYork.html')

@app.route('/Philadelphia')
def p2():
    return render_template('Philadelphia.html')

@app.route('/Pittsburgh')
def p3():
    return render_template('Pittsburgh.html')

@app.route('/Baltimore')
def p4():
    return render_template('Baltimore.html')

@app.route('/AtlanticCity')
def p5():
    return render_template('AtlanticCity.html')

@app.route('/Washington')
def p15():
    return render_template('Washington.html')

@app.route('/Norfolk')
def p6():
    return render_template('Norfolk.html')

@app.route('/Charlotte')
def p7():
    return render_template('Charlotte.html')

@app.route('/Columbus')
def p8():
    return render_template('Columbus.html')

@app.route('/Cleveland')
def p9():
    return render_template('Cleveland.html')

@app.route('/Detroit')
def p10():
    return render_template('Detroit.html')

@app.route('/Cincinnatti')
def p11():
    return render_template('Cincinnatti.html')

@app.route('/Indianapolis')
def p12():
    return render_template('Indianapolis.html')

@app.route('/StLouis')
def p13():
    return render_template('StLouis.html')

@app.route('/Chicago')
def p14():
    return render_template('Chicago.html')


app.run(
host=app.config.get("HOST","192.168.11.180")
)
app.test = True
