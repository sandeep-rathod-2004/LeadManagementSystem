from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Activity
from app.dependencies import admin_required

router = APIRouter(
    prefix="/activity",
    tags=["Activity"]
)


@router.get("/")
def get_activity(
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):

    return (
        db.query(Activity)
        .order_by(Activity.timestamp.desc())
        .all()
    )