// src/routes/notes.js

const express = require("express");
const Note = require("../models/Notes");

const router = express.Router();

// POST /api/notes — Create a new note
router.post("/", async (req, res) => {
  const { title, content, userId } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Give us the Title my guy..." });
  }

  try {
    const note = await Note.create({ title, content, userId });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong creating the note." });
  }
});

// PUT /api/notes/:id — Update a note
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const updated = await Note.findByIdAndUpdate(
      id,
      { $set: { title, content } },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Waaah there was nothing there..." });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong updating the note." });
  }
});

// DELETE /api/notes/:id — Delete a note
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Note.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "There is nothing here for you to delete" });
    }

    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong deleting the note." });
  }
});

module.exports = router;
