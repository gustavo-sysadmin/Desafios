from flask import Flask
from datetime import datetime
from flask_caching import Cache
import os

app = Flask(__name__)
cache = Cache(app, config={
    'CACHE_TYPE': 'redis',
    'CACHE_REDIS_URL': 'redis://redis:6379/0',
    'CACHE_DEFAULT_TIMEOUT': 10
})

@app.route('/')
def hello():
    return "App1 Python funcionando! Acesse /text ou /time"

@app.route('/text')
@cache.cached(timeout=10)
def get_text():
    return {"message": "Texto fixo da App Python"}

@app.route('/time')
@cache.cached(timeout=10)
def get_time():
    return {"current_time": datetime.now().isoformat()}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)