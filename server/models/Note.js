import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId; // NOTE this makes ObjectId an available type

var Note = new Schema(
  {
    content: { type: String, required: true },
    bug: { type: ObjectId, ref: "Bug", required: true }, // OjbectId?? makes more sense to be an Object or a String. NOTE what does ref do? Does bug need importing? ... ObjectID is how MongoDB calls / wraps it
    reportedBy: { type: String, required: true }, //The provided name for who made the note
    flagged: { type: String, enum: ["pending", "completed", "rejected"] }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Note;
