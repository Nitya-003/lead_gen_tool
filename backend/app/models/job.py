"""
Job (scraping request) ORM model.
"""

from sqlalchemy import Column, Integer, String, DateTime, Enum, ForeignKey, func
import enum

from app.database import Base


class JobStatus(str, enum.Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"


class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    intent = Column(String, nullable=False)  # "career" or "growth"
    lead_count = Column(Integer, default=100)
    status = Column(Enum(JobStatus), default=JobStatus.PENDING)
    result_url = Column(String, nullable=True)  # S3 URL for the CSV
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
