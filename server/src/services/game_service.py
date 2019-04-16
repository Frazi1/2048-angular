from typing import List

from database.models.db_game_result import DbGameResult
from dto.user_dto import GameResult
from services.base_service import BaseService


class GameService(BaseService):
    def add_result(self, result: GameResult) -> int:
        db_result = DbGameResult(user_login=result.login, score=result.score)
        self.db.add(db_result)
        self.db.commit()
        return db_result.id

    def get_results(self)-> List[GameResult]:
        db_results = self.db.query(DbGameResult).all()
        return [GameResult(x.user_login, x.score) for x in db_results]
