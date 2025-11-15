import { useEffect, useState } from "react";
import NewNoteDialog from "../components/ui/NewNoteDialog";
import NoteCard from "../components/ui/NoteCard";
import { NotesAPI } from "../lib/Api"; // 

export default function Dashboard({ frontendUserId }) {
  // Use passed-in user ID or fallback to fake ID for testing
  const userId = frontendUserId || import.meta.env.VITE_FAKE_USER_ID;

  // Local state to manage notes and UI status
  const [notes, setNotes] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");

  // Fetch notes from backend when component mounts
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setStatus("loading"); // Show loading message
        const data = await NotesAPI.list(userId); // Fetch notes for this user
        if (mounted) {
          setNotes(data); // Store notes in state
          setStatus("success"); // Show notes
        }
      } catch (e) {
        if (mounted) {
          setError(e.message || "Failed to fetch notes"); // Show error message
          setStatus("error");
        }
      }
    })();
    return () => {
      mounted = false; // Cleanup to avoid memory leaks
    };
  }, [userId]);

  // Create a new note and update local state
  async function createNote(payload) {
    const created = await NotesAPI.create({ ...payload, userId });
    setNotes((prev) => [created, ...prev]); // Add new note to top of list
  }

  // Save (update) an existing note
  async function saveNote(id, payload) {
    const updated = await NotesAPI.update(id, payload);
    setNotes((prev) => prev.map((n) => (n._id === id ? updated : n))); // Replace updated note
  }

  // Delete a note and remove it from local state
  async function deleteNote(id) {
    await NotesAPI.remove(id);
    setNotes((prev) => prev.filter((n) => n._id !== id)); // Remove deleted note
  }

  return (
    <div className="mx-auto max-w-5xl p-4 space-y-6">
      {/* Header with title and create button */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Notes</h2>
        <NewNoteDialog onCreate={createNote} /> {/* Modal for creating notes */}
      </div>

      {/* Conditional rendering based on status */}
      {status === "loading" && <p>Loading your notes...</p>}
      {status === "error" && <p className="text-red-600">Error: {error}</p>}
      {status === "success" && notes.length === 0 && (
        <p className="text-gray-500">No notes yet. Create your first note!</p>
      )}

      {/* Display notes in a grid */}
      <div className="grid gap-4">
        {notes.map((note) => (
          <NoteCard
            key={note._id}
            note={note}
            onSave={saveNote} // Pass save handler to NoteCard
            onDelete={deleteNote} // Pass delete handler to NoteCard
          />
        ))}
      </div>
    </div>
  );
}
