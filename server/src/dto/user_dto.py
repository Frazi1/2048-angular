from src.plugins.pyjson.pyjson import BaseJsonable, JsonProperty


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
        "score": JsonProperty(int)
    }

    def __init__(self, login: str = "", score=0):
        self.login = login
        self.score = score
