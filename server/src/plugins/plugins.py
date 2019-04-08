import json
from functools import wraps

from bottle import response, request


class JsonPlugin:
    api = 2

    def __init__(self):
        pass

    def setup(self, app):
        pass

    def apply(self, callback, context):
        @wraps(callback)
        def wrapper(*args, **kwargs):
            response.content_type = "application/json; charset=utf-8"
            value = callback(*args, **kwargs)
            return json.dumps(value)

        return wrapper


class EnableCors(object):
    name = 'enable_cors'
    api = 2

    def apply(self, fn, context):
        def _enable_cors(*args, **kwargs):
            # set CORS headers
            response.headers['Access-Control-Allow-Origin'] = '*'
            response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS, DELETE'
            response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'

            if request.method != 'OPTIONS':
                # actual request; reply with the actual response
                return fn(*args, **kwargs)

        return _enable_cors
