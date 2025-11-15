// src/App.jsx
import Dashboard from "./pages/dashboard";

export default function App() {
  // Simulate a user for frontend-only testing
  const fakeUserId = import.meta.env.VITE_FAKE_USER_ID || "";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header section */}
      <header className="bg-white border-b">
        <div className="max-w-5xl px-4 flex items-center justify-between mx-auto h-16">
          <h1 className="text-2xl font-bold">PeerLearn Dashboard</h1>
          <div className="text-slate-600 text-sm">
            MERN Stack • MongoDB + Express + React + Tailwind + Radix UI<br />
            user: <span className="font-mono">{fakeUserId || "anonymous"}</span>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <main className="py-6">
        <div className="max-w-5xl mx-auto px-4">
          {/* Load the dashboard and pass the user ID */}
          <Dashboard frontendUserId={fakeUserId} />
        </div>
      </main>
    </div>
  );
}
