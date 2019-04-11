from sqlalchemy import Column, Integer, String

from database.models import Base


class User(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True)
    login = Column(String(255), nullable=False)
    password_hash = Column(String(255), nullable=False)
