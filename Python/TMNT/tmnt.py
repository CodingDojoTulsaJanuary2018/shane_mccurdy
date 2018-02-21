from flask import Flask, render_template, request, redirect
app= Flask(__name__)

@app.route('/')
def _index():
    return render_template('index.html')

@app.route('/ninja')
def _ninja():
    return render_template('ninja.html')

@app.route('/ninja/<color>')
def _color(color):
    if color == "red":
        return render_template('red.html')
    elif color == "blue":
        return render_template('blue.html')
    elif color == "orange":
        return render_template('orange.html')
    elif color == "purple":
        return render_template('purple.html')
    else:
        return render_template('notapril.html')
app.run(debug=True)
