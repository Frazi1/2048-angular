from bottle import request

from dto.user_dto import UserDto
from services.auth_service import AuthService
from src.plugins.controller_plugin.controller_plugin import BaseController


class AuthController(BaseController):

    def __init__(self, bottle_app, logger, auth_service: AuthService):
        super().__init__(bottle_app, logger, "/auth")
        self.auth_service = auth_service

    @BaseController.post('login', returns=UserDto)
    def login(self):
        auth_header = request.headers["Authorization"]
        return self.auth_service.login_basic(auth_header)
