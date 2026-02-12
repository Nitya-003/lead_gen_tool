/**
 * Shared TypeScript types / interfaces.
 */

export interface User {
    id: number;
    email: string;
    full_name?: string;
    created_at: string;
}

export interface Job {
    id: number;
    intent: "career" | "growth";
    lead_count: number;
    status: "pending" | "processing" | "completed" | "failed";
    result_url?: string;
    created_at: string;
}

export interface Lead {
    id: number;
    name?: string;
    email?: string;
    company?: string;
    title?: string;
    source_url?: string;
    confidence: number;
}
