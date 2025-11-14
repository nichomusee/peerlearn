// src/models/Notes.js

const mongoose = require("mongoose");

// Define schema for a peer-shared note
const noteSchema = new mongoose.Schema(
  {
    userId: { type: String, index: true }, // Who created the note
    title: { type: String, required: true, trim: true }, // Note title
    content: { type: String, default: "" }, // Note body
  },
  { timestamps: true } // Adds createdAt and updatedAt
);

// Index for efficient querying by user and time
noteSchema.index({ userId: 1, createdAt: -1 });

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
