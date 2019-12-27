import mongoose from "mongoose";
import Note from "../models/Note";
import ApiError from "../utils/ApiError";

const _repository = mongoose.model("Note", Note);

class NoteService {
  async getAll(id) {
    return await _repository.find({});
  }

  async getNotesByBugId(bugId) {
    // does this belong in bugService or Notes? Reference Taskmaster? Hackathon project? => I can import the noteService into the BugsController!
    return await _repository.find({ bugId });
  }
}

const noteService = new NoteService();
export default noteService;
