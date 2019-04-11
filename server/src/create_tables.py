import os

from database.models import Base
from db import ENGINE
from utils import load_modules

load_modules(os.path.join(os.path.dirname(__file__), "database"), "database")
Base.metadata.create_all(ENGINE)
