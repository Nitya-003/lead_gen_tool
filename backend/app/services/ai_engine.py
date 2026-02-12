"""
AI Context Engine — Uses OpenAI GPT-4o to parse resumes and generate
dynamic search queries for the scraper.
"""

from typing import Any, Dict

from openai import OpenAI

from app.config import settings

client = OpenAI(api_key=settings.OPENAI_API_KEY)

SYSTEM_PROMPT = """You are the AI Context Engine for Lead Gen Tool.
Given a user's resume or business brief, extract the following entities and
return them as a JSON object:
- keywords: list of relevant skills or technologies
- job_titles: list of target job titles
- industries: list of target industries
- location: preferred geographic location
- experience_level: Junior, Mid, Senior, or Lead
"""


async def parse_resume(resume_text: str) -> Dict[str, Any]:
    """Send resume text to GPT-4o and return structured search parameters."""
    response = client.chat.completions.create(
        model="gpt-4o",
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": resume_text},
        ],
    )

    import json
    return json.loads(response.choices[0].message.content)
