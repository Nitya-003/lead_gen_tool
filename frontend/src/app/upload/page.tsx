/**
 * Upload page — accept a resume or business brief for AI processing.
 */

"use client";

import { useState } from "react";

export default function UploadPage() {
    const [file, setFile] = useState<File | null>(null);
    const [intent, setIntent] = useState<"career" | "growth">("career");
    const [uploading, setUploading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        setUploading(true);
        // TODO: call uploadResume(file) then generateLeads(intent)
        setTimeout(() => setUploading(false), 1500); // placeholder
    };

    return (
        <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-8">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg rounded-2xl border border-gray-800 bg-gray-900 p-8 space-y-6"
            >
                <h1 className="text-2xl font-bold tracking-tight text-center">
                    Upload Your Resume
                </h1>
                <p className="text-gray-400 text-sm text-center">
                    We&apos;ll use AI to extract keywords and scrape relevant leads for
                    you.
                </p>

                {/* Intent Selection */}
                <fieldset className="space-y-2">
                    <legend className="text-sm font-medium text-gray-300">
                        What are you looking for?
                    </legend>
                    <div className="flex gap-4">
                        {(["career", "growth"] as const).map((opt) => (
                            <label
                                key={opt}
                                className={`flex-1 cursor-pointer rounded-lg border p-3 text-center text-sm transition-colors ${intent === opt
                                        ? "border-indigo-500 bg-indigo-500/10 text-indigo-400"
                                        : "border-gray-700 hover:border-gray-600"
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="intent"
                                    value={opt}
                                    checked={intent === opt}
                                    onChange={() => setIntent(opt)}
                                    className="sr-only"
                                />
                                {opt === "career" ? "🎯 Career" : "📈 Growth"}
                            </label>
                        ))}
                    </div>
                </fieldset>

                {/* File Input */}
                <div>
                    <label
                        htmlFor="resume"
                        className="block text-sm font-medium text-gray-300 mb-2"
                    >
                        Resume / Brief (PDF or TXT)
                    </label>
                    <input
                        id="resume"
                        type="file"
                        accept=".pdf,.txt"
                        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                        className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:text-white file:cursor-pointer hover:file:bg-indigo-500"
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={!file || uploading}
                    className="w-full rounded-lg bg-indigo-600 py-3 text-sm font-semibold transition-colors hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {uploading ? "Processing…" : "Generate Leads"}
                </button>
            </form>
        </main>
    );
}
