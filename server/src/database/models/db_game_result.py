from sqlalchemy import Column, Integer, String, DateTime, func

from database.models import Base


class DbGameResult(Base):
    __tablename__ = "game_result"
    id = Column(Integer, primary_key=True)
    user_login = Column(String(255), nullable=False)
    score = Column(Integer)
    created_at = Column(DateTime, server_default=func.now())
