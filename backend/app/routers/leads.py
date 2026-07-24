from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Lead, User, Activity
from app.schemas import LeadCreate, LeadUpdate, LeadResponse
from app.dependencies import get_current_user, admin_required

router = APIRouter(
    prefix="/leads",
    tags=["Leads"]
)


# -------------------------------------------------
# Create Lead
# -------------------------------------------------
@router.post("/", response_model=LeadResponse)
def create_lead(
    lead: LeadCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    assigned_member = None

    if current_user.role == "admin":
        if lead.assigned_to is not None:

            member = (
                db.query(User)
                .filter(User.id == lead.assigned_to)
                .first()
            )

            if not member:
                raise HTTPException(
                    status_code=404,
                    detail="Assigned member not found"
                )

            assigned_member = member.id

    else:
        assigned_member = current_user.id

    new_lead = Lead(
        name=lead.name,
        email=lead.email,
        phone=lead.phone,
        company=lead.company,
        message=lead.message,
        status=lead.status,
        assigned_to=assigned_member
    )

    db.add(new_lead)
    db.commit()
    db.refresh(new_lead)

    activity = Activity(
        lead_id=new_lead.id,
        user_id=current_user.id,
        action=f"Lead created by {current_user.name}"
    )

    db.add(activity)
    db.commit()

    return new_lead


# -------------------------------------------------
# Get All Leads
# -------------------------------------------------
@router.get("/", response_model=list[LeadResponse])
def get_leads(
    status: str | None = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    query = db.query(Lead)

    if current_user.role == "member":
        query = query.filter(
            Lead.assigned_to == current_user.id
        )

    if status:
        query = query.filter(
            Lead.status == status
        )

    leads = (
        query
        .order_by(Lead.id.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )

    return leads


# -------------------------------------------------
# Get Single Lead
# -------------------------------------------------
@router.get("/{lead_id}", response_model=LeadResponse)
def get_lead(
    lead_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    lead = (
        db.query(Lead)
        .filter(Lead.id == lead_id)
        .first()
    )

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
            detail="Not authorized"
        )

    return lead


# -------------------------------------------------
# Update Lead
# -------------------------------------------------
@router.put("/{lead_id}", response_model=LeadResponse)
def update_lead(
    lead_id: int,
    lead_data: LeadUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):

    lead = (
        db.query(Lead)
        .filter(Lead.id == lead_id)
        .first()
    )

    if not lead:
        raise HTTPException(
            status_code=404,
            detail="Lead not found"
        )

    if lead_data.name is not None:
        lead.name = lead_data.name

    if lead_data.email is not None:
        lead.email = lead_data.email

    if lead_data.phone is not None:
        lead.phone = lead_data.phone

    if lead_data.company is not None:
        lead.company = lead_data.company

    if lead_data.message is not None:
        lead.message = lead_data.message

    if lead_data.status is not None:
        lead.status = lead_data.status

    if lead_data.assigned_to is not None:

        member = (
            db.query(User)
            .filter(User.id == lead_data.assigned_to)
            .first()
        )

        if not member:
            raise HTTPException(
                status_code=404,
                detail="Assigned member not found"
            )

        lead.assigned_to = member.id

    db.commit()
    db.refresh(lead)

    activity = Activity(
        lead_id=lead.id,
        user_id=current_user.id,
        action=f"Lead updated by {current_user.name}"
    )

    db.add(activity)
    db.commit()

    return lead


# -------------------------------------------------
# Delete Lead
# -------------------------------------------------
@router.delete("/{lead_id}")
def delete_lead(
    lead_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):

    lead = (
        db.query(Lead)
        .filter(Lead.id == lead_id)
        .first()
    )

    if not lead:
        raise HTTPException(
            status_code=404,
            detail="Lead not found"
        )

    db.delete(lead)
    db.commit()

    activity = Activity(
        lead_id=lead_id,
        user_id=current_user.id,
        action=f"Lead deleted by {current_user.name}"
    )

    db.add(activity)
    db.commit()

    return {
        "message": "Lead deleted successfully"
    }