import json
from functools import wraps

from bottle import response, request, HTTPResponse

from services.auth.auth_exception import AuthException
from services.auth.auth_service import AuthService


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
            response.headers[
                'Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'

            if request.method != 'OPTIONS':
                # actual request; reply with the actual response
                return fn(*args, **kwargs)

        return _enable_cors


class ErrorFilterPlugin(object):
    name = 'error_filter'
    api = 2

    def apply(self, fn, context):
        def wrapper(*args, **kwargs):
            try:
                return fn(*args, **kwargs)
            except AuthException as a:
                raise HTTPResponse("forbidden", status=401)

        return wrapper


class AuthPlugin(object):
    name = 'auth_plugin'
    api = 2

    def __init__(self, auth_service: AuthService) -> None:
        self.auth_service = auth_service

    def apply(self, fn, context):
        def authorize(*a, **kwa):
            auth_header = request.headers.get("Authorization")
            if auth_header:
                member = self.auth_service.login_basic(auth_header)
                request.environ["current_user"] = member
            return fn(*a, **kwa)

        return authorize


def login_required(fn):
    def wrapper(*a, **kwa):
        member = request.environ.get("current_user")
        if not member:
            raise AuthException("Authentication is required to access the resource.")

        return fn(*a, **kwa)

    return wrapper
