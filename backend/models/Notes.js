import mongoose from "mongoose";
const { Schema } = mongoose;

const NotesSchema = new Schema({
  title: { type: String, required: true },

  description: { type: String, required: true },
  tag: { type: String, default: "Untitled" },
  date: { type: Date, default: Date.now },
});
module.exports = mongooose.mdoel("notes", NotesSchema);
