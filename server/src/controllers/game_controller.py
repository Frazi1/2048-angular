from dto.user_dto import GameResult
from plugins.controller_plugin.controller_plugin import BaseController
from services.game_service import GameService


class GameController(BaseController):

    def __init__(self, bottle_app, game_service: GameService, logger=None):
        super().__init__(bottle_app, logger, '/game')
        self.game_service = game_service

    @BaseController.post('', accepts=GameResult)
    def post_result(self, parsed_body: GameResult):
        return self.game_service.add_result(parsed_body)

    @BaseController.get('', returns=[GameResult])
    def get_results(self):
        return self.game_service.get_results()
