"""
Pydantic schemas for request / response validation.
"""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr


# ---------------------------------------------------------------------------
# Auth
# ---------------------------------------------------------------------------
class UserCreate(BaseModel):
    email: str
    password: str
    full_name: Optional[str] = None


class UserResponse(BaseModel):
    id: int
    email: str
    full_name: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


# ---------------------------------------------------------------------------
# Job
# ---------------------------------------------------------------------------
class JobCreate(BaseModel):
    intent: str  # "career" or "growth"
    lead_count: int = 100


class JobResponse(BaseModel):
    id: int
    intent: str
    lead_count: int
    status: str
    result_url: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True


# ---------------------------------------------------------------------------
# Lead
# ---------------------------------------------------------------------------
class LeadResponse(BaseModel):
    id: int
    name: Optional[str] = None
    email: Optional[str] = None
    company: Optional[str] = None
    title: Optional[str] = None
    source_url: Optional[str] = None
    confidence: float

    class Config:
        from_attributes = True
