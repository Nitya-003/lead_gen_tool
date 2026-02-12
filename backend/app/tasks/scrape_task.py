"""
Celery task: execute a scraping job in the background.
"""

from app.tasks.celery_app import celery_app


@celery_app.task(bind=True, name="scrape_leads_task")
def scrape_leads_task(self, job_id: int, search_params: dict, lead_count: int):
    """
    Background task that runs the scraper and updates job status.

    Args:
        job_id: The database ID of the Job record.
        search_params: AI-generated search parameters (JSON dict).
        lead_count: Number of leads to scrape.
    """
    # TODO:
    # 1. Update job status to PROCESSING
    # 2. Call scraper.scrape_leads(search_params, lead_count)
    # 3. De-duplicate results
    # 4. Save leads to DB
    # 5. Generate CSV, upload to S3
    # 6. Update job status to COMPLETED with result_url
    pass
