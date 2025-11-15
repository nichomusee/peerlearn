// Import reusable UI components from shadcn/ui and React hooks
import { Button } from "./button";
import { Card, CardContent, CardHeader } from "./card";
import { useState } from "react";
import { Input } from "./input";
import { Textarea } from "./textarea";

// Define the NoteCard component, which receives a note and two functions: onSave and onDelete
export default function NoteCard({ note, onSave, onDelete }) {
  // Local state to toggle between view and edit mode
  const [editing, setEditing] = useState(false);

  // Local state to hold editable draft of the note (title and content)
  const [draft, setDraft] = useState({
    title: note.title,
    content: note.content
  });

  return (
    // Card layout for each note
    <Card className="overflow-hidden">
      {/* Header section with title and action buttons */}
      <CardHeader className="flex items-center justify-between">
        {/* If editing, show the note title in heading */}
        {editing ? (
          <h3 className="text-lg font-semibold">{note.title}</h3>
        ) : (
          // If not editing, show Edit and Delete buttons
          <div className="space-x-2">
            <Button
              className="bg-slate-100 hover:bg-slate-200"
              onClick={() => setEditing(true)}
            >
              Edit
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700"
              onClick={() => onDelete(note._id)} // Use MongoDB _id when calling parent
            >
              Delete
            </Button>
          </div>
        )}
        {/* Always show the section title */}
        <h3 className="text-lg font-semibold">Edit Note</h3>
      </CardHeader>

      {/* Main content area of the card */}
      <CardContent className="space-y-3">
        {/* If editing, show a form to update the note */}
        <form
            onSubmit={(e) => {
            e.preventDefault(); // Prevent page reload
            onSave(note._id, draft); // Use MongoDB _id when saving
            setEditing(false); // Exit edit mode
          }}
        >
          {/* Input for note title */}
          <Input
            value={draft.title}
            onChange={(e) =>
              setDraft({ ...draft, title: e.target.value }) // Update title in draft
            }
          />

          {/* Textarea for note content */}
          <Textarea
            rows={5}
            value={draft.content}
            onChange={(e) =>
              setDraft({ ...draft, content: e.target.value }) // Update content in draft
            }
          />

          {/* Save button */}
          <Button className="bg-green-700 hover:bg-green-800">Save</Button>
        </form>
      </CardContent>
    </Card>
  );
}
