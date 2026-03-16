from typing import Optional
from sqlalchemy.orm import Session
from core.models import User
from .base import BaseRepository

class UserRepository(BaseRepository[User]):
    def __init__(self):
        super().__init__(User)

    def get_by_username(self, db: Session, username: str) -> Optional[User]:
        return db.query(self.model).filter(self.model.username == username).first()

user_repository = UserRepository()
