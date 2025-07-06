const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const connectDB = require("./lib/db");
const Note = require("./models/Note");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Get all notes
app.get("/api/notes", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

// Create a note
app.post("/api/notes", async (req, res) => {
  try {
    const newNote = new Note(req.body);
    const saved = await newNote.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get a single note by ID
app.get("/api/notes/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).send("Note not found");
    res.json(note);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
});

// Update a note
app.put("/api/notes/:id", async (req, res) => {
  try {
    const updated = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).send("Note not found");
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
});

// Delete a note
app.delete("/api/notes/:id", async (req, res) => {
  try {
    const deleted = await Note.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).send("Note not found");
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
