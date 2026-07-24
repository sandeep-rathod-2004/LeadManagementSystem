from datetime import datetime

from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship

from .database import Base


# -----------------------------
# User Model
# -----------------------------
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False, index=True)
    password = Column(String, nullable=False)
    role = Column(String, default="member")  # admin/member

    assigned_leads = relationship(
        "Lead",
        back_populates="assigned_user"
    )

    notes = relationship(
        "Note",
        back_populates="user"
    )

    activities = relationship(
        "Activity",
        back_populates="user"
    )


# -----------------------------
# Lead Model
# -----------------------------
class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String)
    company = Column(String)
    message = Column(Text)

    status = Column(String, default="New")

    assigned_to = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=True
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    assigned_user = relationship(
        "User",
        back_populates="assigned_leads"
    )

    notes = relationship(
        "Note",
        back_populates="lead",
        cascade="all, delete-orphan",
        passive_deletes=True
    )

    activities = relationship(
        "Activity",
        back_populates="lead",
        cascade="all, delete-orphan",
        passive_deletes=True
    )


# -----------------------------
# Note Model
# -----------------------------
class Note(Base):
    __tablename__ = "notes"

    id = Column(Integer, primary_key=True, index=True)

    lead_id = Column(
        Integer,
        ForeignKey("leads.id", ondelete="CASCADE"),
        nullable=False
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    note = Column(Text, nullable=False)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    lead = relationship(
        "Lead",
        back_populates="notes"
    )

    user = relationship(
        "User",
        back_populates="notes"
    )


# -----------------------------
# Activity Model
# -----------------------------
class Activity(Base):
    __tablename__ = "activities"

    id = Column(Integer, primary_key=True, index=True)

    lead_id = Column(
        Integer,
        ForeignKey("leads.id", ondelete="CASCADE"),
        nullable=False
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    action = Column(String, nullable=False)

    timestamp = Column(
        DateTime,
        default=datetime.utcnow
    )

    lead = relationship(
        "Lead",
        back_populates="activities"
    )

    user = relationship(
        "User",
        back_populates="activities"
    )