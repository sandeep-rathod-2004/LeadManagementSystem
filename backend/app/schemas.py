from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, EmailStr


# -----------------------------
# USER SCHEMAS
# -----------------------------
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str = "member"


class Login(BaseModel):
    email: EmailStr
    password: str


# -----------------------------
# LEAD SCHEMAS
# -----------------------------
class LeadCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    company: Optional[str] = None
    message: Optional[str] = None

    # Added for Admin
    status: str = "New"
    assigned_to: Optional[int] = None


class LeadUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    company: Optional[str] = None
    message: Optional[str] = None
    status: Optional[str] = None
    assigned_to: Optional[int] = None


class LeadResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    phone: Optional[str] = None
    company: Optional[str] = None
    message: Optional[str] = None
    status: str
    assigned_to: Optional[int]
    created_at: datetime
    updated_at: Optional[datetime]

    model_config = ConfigDict(from_attributes=True)


# -----------------------------
# NOTE SCHEMAS
# -----------------------------
class NoteCreate(BaseModel):
    lead_id: int
    note: str


class NoteResponse(BaseModel):
    id: int
    lead_id: int
    user_id: int
    note: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

# -----------------------------
# USER RESPONSE SCHEMA
# -----------------------------
class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: str

    model_config = ConfigDict(from_attributes=True)    