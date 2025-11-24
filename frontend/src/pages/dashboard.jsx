import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import NotesAPI from "../api/NotesAPI";
import NewNoteDialog from "../components/ui/NewNoteDialog";
import NoteCard from "../components/ui/NoteCard";

export default function Dashboard() {
  const { user } = useUser();
  const [notes, setNotes] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchNotes() {
      try {
        setStatus("loading");
        const data = await NotesAPI.list(user.id);
        setNotes(data);
        setStatus("success");
      } catch (e) {
        setError(e.message);
        setStatus("error");
      }
    }
    if (user?.id) fetchNotes();
  }, [user]);

  return (
    <div>
      <NewNoteDialog onCreate={(payload) => NotesAPI.create({ ...payload, userId: user.id })} />
      {notes.map(note => (
        <NoteCard key={note._id} note={note} />
      ))}
    </div>
  );
}
