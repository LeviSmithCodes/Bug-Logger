import mongoose from "mongoose";
import Note from "../models/Note";
import ApiError from "../utils/ApiError";

const _repository = mongoose.model("Note", Note);

class NoteService {
  async create(rawData) {
    let data = await _repository.create(rawData);
    return data;
  }

  async delete(id) {
    let data = await _repository.findOneAndDelete(id);
    if (!data) {
      throw new ApiError("Invalid Id", 400);
    }
  }

  async getNotesByBugId(bugId) {
    // does this belong in bugService or Notes? Reference Taskmaster? Hackathon project? => I can import the noteService into the BugsController!
    // console.log(bugId);
    // debugger;
    let data = await _repository.find(); // TODO
    // debugger;
    if (!data) {
      throw new ApiError("Could not find notes for bug");
    }
    return data;
    // console.log(data);
    // debugger;
    // return data;
  }
}

const noteService = new NoteService();
export default noteService;
