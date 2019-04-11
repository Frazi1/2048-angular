import base64
from typing import Optional

from bottle import request

from controllers.business_exception import BusinessException
from dto.user_dto import UserDto
from services.auth.member import Member
from services.base_service import BaseService


class AuthService(BaseService):
    USERS = {"test": "test"}

    def get_user_by_id(self, login) -> Optional[Member]:
        if login in self.USERS:
            password = self.USERS[login]
            return Member(login, password)
        return None

    def login_basic(self, auth_header: str) -> UserDto:
        type_ = "Basic "
        if type_ not in auth_header:
            raise BusinessException("Only Basic authentication is supported.")

        basic = base64.b64decode(auth_header[len(type_):]).decode("utf-8")
        login_pass = basic.split(":")
        login, password = login_pass[0], login_pass[1]

        member = self.get_user_by_id(login)
        if not member:
            raise BusinessException("User {} does not exist.".format(member.login))
        if password != member.password:
            raise BusinessException("Password is incorrect.")

        return UserDto(member.login)

    def register(self, login: str, password: str) -> Member:
        member = self.get_user_by_id(login)
        if member:
            raise BusinessException("User {} already exists.".format(member.login))

        self.USERS[login] = password
        return Member(login, password)

    @property
    def current_member(self) -> Member:
        return request.environ["current_user"]
