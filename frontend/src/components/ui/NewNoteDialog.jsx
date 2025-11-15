// src/components/ui/NewNoteDialog.jsx
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle
} from "@radix-ui/react-dialog";
import { Button } from "./button";
import { Input } from "./input";
import { Textarea } from "./textarea";

export default function NewNoteDialog({ onCreate }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return;
    onCreate({ title, content });
    setTitle("");
    setContent("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Note</Button>
      </DialogTrigger>

      <DialogContent className="bg-white p-6 rounded shadow max-w-md mx-auto">
        <DialogTitle className="text-lg font-bold">New Note</DialogTitle>

        <div className="space-y-4 mt-4">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="mt-6 flex justify-end space-x-2">
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
