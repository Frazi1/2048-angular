import datetime

from plugins.pyjson.pyjson import BaseJsonable, JsonProperty


class UserDto(BaseJsonable):
    __exportables__ = {
        "login": JsonProperty(str)
    }

    def __init__(self, login):
        self.login = login


class UserRegistrationDto(BaseJsonable):
    __exportables__ = {
        "login": JsonProperty(str),
        "password": JsonProperty(str)
    }

    def __init__(self, login: str = "", password: str = ""):
        self.login = login
        self.password = password


class GameResult(BaseJsonable):
    __exportables__ = {
        "login": JsonProperty(str),
        "score": JsonProperty(int),
        "created_at": JsonProperty(datetime.datetime, "createdAt", required=False)
    }

    def __init__(self, login: str = "", score=0, created_at: datetime.datetime = None):
        self.login = login
        self.score = score
        self.created_at = created_at
