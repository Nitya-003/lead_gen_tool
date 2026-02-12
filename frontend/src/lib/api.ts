/**
 * API service layer — Axios-based client for backend communication.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

// ---------------------------------------------------------------------------
// Generic fetch wrapper
// ---------------------------------------------------------------------------
async function apiFetch<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...options.headers,
    };

    // Attach auth token if available
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("access_token");
        if (token) {
            (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
        }
    }

    const res = await fetch(url, { ...options, headers });

    if (!res.ok) {
        const error = await res.json().catch(() => ({ detail: res.statusText }));
        throw new Error(error.detail || "API request failed");
    }

    return res.json() as Promise<T>;
}

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------
export async function register(email: string, password: string, fullName?: string) {
    return apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password, full_name: fullName }),
    });
}

export async function login(email: string, password: string) {
    return apiFetch<{ access_token: string; token_type: string }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });
}

// ---------------------------------------------------------------------------
// Leads
// ---------------------------------------------------------------------------
export async function generateLeads(intent: string, leadCount: number = 100) {
    return apiFetch("/leads/generate", {
        method: "POST",
        body: JSON.stringify({ intent, lead_count: leadCount }),
    });
}

export async function getJobStatus(jobId: number) {
    return apiFetch(`/leads/jobs/${jobId}`);
}

export async function getJobResults(jobId: number) {
    return apiFetch(`/leads/jobs/${jobId}/results`);
}

// ---------------------------------------------------------------------------
// Upload
// ---------------------------------------------------------------------------
export async function uploadResume(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const url = `${API_BASE_URL}/upload/resume`;
    const res = await fetch(url, { method: "POST", body: formData });

    if (!res.ok) {
        const error = await res.json().catch(() => ({ detail: res.statusText }));
        throw new Error(error.detail || "Upload failed");
    }

    return res.json();
}
