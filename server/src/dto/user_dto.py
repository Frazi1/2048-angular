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

    def __init__(self, login: str="", password: str=""):
        self.login = login
        self.password = password
