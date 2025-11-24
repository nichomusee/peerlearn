import { Routes, Route } from "react-router-dom";
import { SignIn, SignUp, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/sign-in" element={<SignIn redirectUrl="/dashboard" />} />
      <Route path="/sign-up" element={<SignUp redirectUrl="/dashboard" />} />
      <Route
        path="/dashboard"
        element={
          <>
            <header className="bg-white border-b">
              <div className="max-w-5xl p-4 flex items-center justify-between mx-auto">
                <div>
                  <h1 className="text-2xl font-bold">PeerLearn Dashboard</h1>
                  <p className="text-slate-600 text-sm">
                    MERN Stack • MongoDB + Express + React + Tailwind + Radix UI
                  </p>
                </div>
                <div>
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                </div>
              </div>
            </header>

            <main className="py-10">
              <div className="max-w-5xl mx-auto text-center">
                <SignedIn>
                  <Dashboard />
                </SignedIn>
                <SignedOut>
                  <p className="text-slate-600">Please sign in to view your notes.</p>
                </SignedOut>
              </div>
            </main>
          </>
        }
      />
    </Routes>
  );
}
