from flask import Flask
from datetime import datetime

app = Flask(__name__)

@app.route('/texto')
def texto_fixo():
    return "Texto fixo da aplicação Python"

@app.route('/hora')
def hora_atual():
    return str(datetime.now())

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
