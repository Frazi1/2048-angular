from dto.user_dto import UserDto
from plugins.plugins import login_required
from services.auth.auth_service import AuthService
from src.plugins.controller_plugin.controller_plugin import BaseController


class AuthController(BaseController):

    def __init__(self, bottle_app, logger, auth_service: AuthService):
        super().__init__(bottle_app, logger, "/auth")
        self.auth_service = auth_service

    @BaseController.post('login', returns=UserDto)
    @login_required
    def login(self):
        member = self.auth_service.current_member
        return UserDto(member.login)

    @BaseController.get('test')
    @login_required
    def test(self):
        return "HELLO"
