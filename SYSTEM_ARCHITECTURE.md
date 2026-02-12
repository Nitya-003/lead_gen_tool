# 🏗 Lead Gen Tool: System Architecture

This document provides a technical deep-dive into how Lead Gen Tool processes data and executes dynamic scraping.

## 🧩 High-Level Component Overview

### 1. The Frontend (Next.js)

-   Acts as the orchestration layer for the user journey.
-   Handles file uploads (resumes) and intent selection.
-   Polls the backend for scraping progress using React Query.

### 2. The AI Context Engine (OpenAI GPT-4o)

-   **Input:** Raw Resume Text or Business Brief.
-   **Process:** Extraction of entities (Skills, Job Titles, Industries, Seniority).
-   **Output:** A structured JSON object containing search queries and filters.
    ```json
    {
      "keywords": ["React", "Remote"],
      "location": "USA",
      "experience_level": "Mid-Senior"
    }
    ```

### 3. The Task Queue (Redis & BullMQ/Celery)

-   Since scraping is time-intensive, it is never executed on the main request-response cycle.
-   The backend pushes a "Job" to Redis.
-   Worker threads pick up the job, execute the browser automation, and update the status.

### 4. The Scraper Service (Playwright)

-   Utilizes **Playwright Stealth** to bypass basic bot detection.
-   Navigates to target platforms (LinkedIn, Indeed, etc.) dynamically based on the AI-generated JSON.
-   Parses the DOM and extracts lead data into a standardized schema.

## 📊 Data Flow Diagram

1.  **User** -> Uploads Resume -> **API**
2.  **API** -> OpenAI (Parse Resume) -> **Structured Query**
3.  **API** -> Redis Queue -> **Worker**
4.  **Worker** -> Playwright (Scrape Site) -> **Raw Data**
5.  **Worker** -> API -> CSV Generation -> **S3 Storage**
6.  **User** -> Download Link -> **CSV File**

## 🛡 Security & Ethics

-   **Rate Limiting:** Implemented to respect `robots.txt` and prevent IP banning.
-   **Data Privacy:** User resumes are processed in-memory and not stored unless explicitly requested.