"""
File upload route (resume / business brief).
"""

from fastapi import APIRouter, UploadFile, File, HTTPException

router = APIRouter()


@router.post("/resume")
async def upload_resume(file: UploadFile = File(...)):
    """Accept a resume file and extract text for the AI context engine."""
    if file.content_type not in ("application/pdf", "text/plain"):
        raise HTTPException(status_code=400, detail="Only PDF and TXT files are accepted.")

    contents = await file.read()
    # TODO: parse resume text, send to AI engine
    return {
        "filename": file.filename,
        "size_bytes": len(contents),
        "message": "Resume uploaded successfully. Processing will begin shortly.",
    }
