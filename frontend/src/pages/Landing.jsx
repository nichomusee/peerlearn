// src/pages/Landing.jsx
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to PeerLearn</h1>
      <p className="text-slate-600 text-lg mb-8">
        Please sign in to manage your notes
      </p>

      <button
        onClick={() => navigate("/sign-in")}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Sign In
      </button>

      <p className="mt-4 text-slate-600">
        Don’t have an account?{" "}
        <a href="/sign-up" className="text-blue-600 hover:underline">Sign up</a>
      </p>
    </div>
  );
}
