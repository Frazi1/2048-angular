from src.plugins.pyjson.pyjson import BaseJsonable, JsonProperty


class UserDto(BaseJsonable):
    __exportables__ = {
        "login": JsonProperty(str)
    }

    def __init__(self, login):
        self.login = login
