import base64
from typing import Optional

from bottle import request

from controllers.business_exception import BusinessException
from database.models.user import User
from dto.user_dto import UserDto, UserRegistrationDto
from services.auth.member import Member
from services.base_service import BaseService


class AuthService(BaseService):

    def get_user_by_id(self, login) -> Optional[Member]:
        user = self.db.query(User).filter(User.login == login).first()
        if user:
            return Member(user.login, user.password_hash)
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
            raise BusinessException("User {} does not exist.".format(login))
        if password != member.password:
            raise BusinessException("Password is incorrect.")

        return UserDto(member.login)

    def register(self, user_registration: UserRegistrationDto) -> Member:
        login, password = user_registration.login, user_registration.password
        member = self.get_user_by_id(login)
        if member:
            raise BusinessException("User {} already exists.".format(member.login))
        user = User(login=login, password_hash=password)
        self.db.add(user)
        self.db.commit()
        return Member(login, password)

    @property
    def current_member(self) -> Member:
        return request.environ["current_user"]
