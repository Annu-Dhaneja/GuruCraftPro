from sqlalchemy.orm import Session
from core import auth
from repositories.user import user_repository
from fastapi import HTTPException, status

class UserService:
    @staticmethod
    def authenticate_user(db: Session, username: str, password: str):
        user = user_repository.get_by_username(db, username)
        if not user or not auth.verify_password(password, user.hashed_password):
            return None
        return user

user_service = UserService()
