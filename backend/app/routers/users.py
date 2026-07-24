from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import User
from app.dependencies import admin_required
from app.schemas import UserResponse

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


# -----------------------------
# Get Members
# -----------------------------
@router.get("/members", response_model=list[UserResponse])
def get_members(
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):
    return db.query(User).filter(
        User.role == "member"
    ).all()


# -----------------------------
# Get All Users
# -----------------------------
@router.get("/", response_model=list[UserResponse])
def get_users(
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):
    return db.query(User).all()