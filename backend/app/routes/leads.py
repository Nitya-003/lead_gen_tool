"""
Lead management routes.
"""

from typing import List

from fastapi import APIRouter, HTTPException, status

from app.schemas.schemas import JobCreate, JobResponse, LeadResponse

router = APIRouter()


@router.post("/generate", response_model=JobResponse, status_code=status.HTTP_202_ACCEPTED)
async def generate_leads(job_in: JobCreate):
    """Queue a new lead generation job."""
    # TODO: create Job in DB, dispatch Celery task
    return {
        "id": 1,
        "intent": job_in.intent,
        "lead_count": job_in.lead_count,
        "status": "pending",
        "result_url": None,
        "created_at": "2026-01-01T00:00:00Z",
    }


@router.get("/jobs/{job_id}", response_model=JobResponse)
async def get_job_status(job_id: int):
    """Poll the status of a lead-generation job."""
    # TODO: fetch from DB
    return {
        "id": job_id,
        "intent": "career",
        "lead_count": 100,
        "status": "pending",
        "result_url": None,
        "created_at": "2026-01-01T00:00:00Z",
    }


@router.get("/jobs/{job_id}/results", response_model=List[LeadResponse])
async def get_job_results(job_id: int):
    """Retrieve the scraped leads for a completed job."""
    # TODO: fetch from DB
    return []
