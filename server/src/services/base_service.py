from bottle import request
from sqlalchemy.orm import Session


class BaseService(object):

    @property
    def db(self) -> Session:
        return request.environ.get('database')
