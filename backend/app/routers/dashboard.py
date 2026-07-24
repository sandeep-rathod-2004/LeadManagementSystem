from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from app.models import Lead, User
from app.dependencies import get_current_user

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/stats")
def dashboard_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    query = db.query(Lead)

    # Members should only see their own leads
    if current_user.role == "member":
        query = query.filter(
            Lead.assigned_to == current_user.id
        )

    total = query.count()

    new = query.filter(
        Lead.status == "New"
    ).count()

    contacted = query.filter(
        Lead.status == "Contacted"
    ).count()

    qualified = query.filter(
        Lead.status == "Qualified"
    ).count()

    closed = query.filter(
        Lead.status == "Closed"
    ).count()

    return {
        "total": total,
        "new": new,
        "contacted": contacted,
        "qualified": qualified,
        "closed": closed,
    }