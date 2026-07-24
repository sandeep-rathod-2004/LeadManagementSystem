from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Lead, Note, Activity
from app.schemas import NoteCreate, NoteResponse
from app.dependencies import get_current_user

router = APIRouter(
    prefix="/notes",
    tags=["Notes"]
)


@router.post("/", response_model=NoteResponse)
def add_note(
    note: NoteCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    lead = db.query(Lead).filter(
        Lead.id == note.lead_id
    ).first()

    if not lead:
        raise HTTPException(
            status_code=404,
            detail="Lead not found"
        )

    if (
        current_user.role == "member"
        and lead.assigned_to != current_user.id
    ):
        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )

    new_note = Note(
        lead_id=note.lead_id,
        user_id=current_user.id,
        note=note.note
    )

    db.add(new_note)
    db.commit()
    db.refresh(new_note)

    activity = Activity(
        lead_id=lead.id,
        user_id=current_user.id,
        action=f"Note added by {current_user.name}"
    )

    db.add(activity)
    db.commit()

    return new_note


@router.get("/{lead_id}", response_model=list[NoteResponse])
def get_notes(
    lead_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    lead = db.query(Lead).filter(
        Lead.id == lead_id
    ).first()

    if not lead:
        raise HTTPException(
            status_code=404,
            detail="Lead not found"
        )

    if (
        current_user.role == "member"
        and lead.assigned_to != current_user.id
    ):
        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )

    notes = (
        db.query(Note)
        .filter(Note.lead_id == lead_id)
        .order_by(Note.created_at.desc())
        .all()
    )

    return notes