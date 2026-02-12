/**
 * Dashboard page — displays job history and lead generation status.
 */

export default function DashboardPage() {
    return (
        <main className="min-h-screen bg-gray-950 text-white p-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <header className="mb-10">
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-gray-400 mt-1">
                        Monitor your lead generation jobs and download results.
                    </p>
                </header>

                {/* Quick Actions */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <a
                        href="/upload"
                        className="group block rounded-xl border border-gray-800 bg-gray-900 p-6 hover:border-indigo-500 transition-colors"
                    >
                        <h2 className="text-xl font-semibold group-hover:text-indigo-400 transition-colors">
                            🚀 New Job
                        </h2>
                        <p className="text-gray-400 mt-2 text-sm">
                            Upload a resume or brief to start generating leads.
                        </p>
                    </a>

                    <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
                        <h2 className="text-xl font-semibold">📊 Stats</h2>
                        <p className="text-gray-400 mt-2 text-sm">
                            0 jobs completed &middot; 0 leads scraped
                        </p>
                    </div>
                </section>

                {/* Job History */}
                <section>
                    <h2 className="text-xl font-semibold mb-4">Recent Jobs</h2>
                    <div className="rounded-xl border border-gray-800 bg-gray-900 p-8 text-center text-gray-500">
                        No jobs yet. Start by uploading a resume!
                    </div>
                </section>
            </div>
        </main>
    );
}
