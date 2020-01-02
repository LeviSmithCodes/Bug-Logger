import mongoose from "mongoose";
const Schema = mongoose.Schema;

// copied from the readme
var Bug = new Schema(
  {
    closed: { type: Boolean, required: true, default: false },
    description: { type: String, required: true },
    title: { type: String, required: true },
    reportedBy: { type: String, required: true }, //The provided name for who reported the bug
    closedDate: { type: Date },
    modifiedDate: { type: Date }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Bug;
