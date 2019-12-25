import mongoose from "mongoose";
import Bug from "../models/Bug";
import ApiError from "../utils/ApiError";

const _repository = mongoose.model("Bug", Bug);

class BugService {
  async edit(id, update) {
    let data = await _repository.findById(id);

    if (!data) {
      throw new ApiError("Invalid ID", 400);
    }

    console.log(data);
    if (data.closed == false) {
      data = await _repository.findOneAndUpdate({ _id: id }, update); // NOTE what does the {_id: id} bit do? _id comes from the server, yes?
    } else {
      throw new ApiError("Cannot edit closed bug", 403);
    }

    return data;
  }
  async getById(id) {
    let data = await _repository.findById(id);
    if (!data) {
      throw new ApiError("Invalid ID", 400);
    }
    return data;
  }
  async create(rawData) {
    let data = await _repository.create(rawData);
    return data;
  }
  async getAll() {
    return await _repository.find({});
  }
}

const bugService = new BugService();
export default bugService;
