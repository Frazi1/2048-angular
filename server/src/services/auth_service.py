import base64

from bottle import request

from dto.user_dto import UserDto


class AuthService():
    USERS = {"test": "test"}

    def get_user_by_id(self, login):
        if login in self.USERS:
            password = self.USERS[login]
            return login, password
        return None

    def login_basic(self, auth_header:str):
        type_ = "Basic "
        if type_ not in auth_header:
            return None
        basic = base64.b64decode(auth_header[len(type_):]).decode("utf-8")
        login_pass = basic.split(":")
        login, password = login_pass[0], login_pass[1]

        db_login, db_password = self.get_user_by_id(login)
        if password == db_password:
            user = UserDto(login)
            request.environ["current_user"] = user

        return user

