from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta
from core import auth, database, models

from services.user import user_service

router = APIRouter()


@router.get("/login")
def login_get_guide():
    return {"message": "Login endpoint is active. Use POST with username & password."}


@router.post("/login")
async def login_for_access_token(
    db: Session = Depends(database.get_db),
    form_data: OAuth2PasswordRequestForm = Depends(),
):
    try:
        user = user_service.authenticate_user(
            db, form_data.username, form_data.password
        )
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect username or password",
                headers={"WWW-Authenticate": "Bearer"},
            )

        token = auth.create_access_token(
            data={"sub": user.username},
            expires_delta=timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES),
        )
        return {"access_token": token, "token_type": "bearer"}

    except HTTPException:
        raise
    except Exception as exc:
        # Log full traceback server-side, return safe string to client
        import traceback
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Login failed: {exc}",
        )


@router.get("/users")
async def list_users(db: Session = Depends(database.get_db)):
    return db.query(models.User).all()
