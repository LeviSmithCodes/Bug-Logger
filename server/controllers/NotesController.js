import express from "express";
import noteService from "../services/noteService";

export default class NoteController {
  constructor() {
    this.router = express
      .Router({ mergeParams: true }) // allows getting params from main?
      //NOTE  each route gets registered as a .get, .post, .put, or .delete, the first parameter of each method is a string to be concatinated onto the base url registered with the route in main. The second parameter is the method that will be run when this route is hit.
      .delete("/:id", this.delete)
      .post("", this.create);
  }

  async create(req, res, next) {
    try {
      let data = await noteService.create(req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await noteService.delete(req.params.id);
      return res.send("Successfully Deleted Note");
    } catch (error) {
      next(error);
    }
  }
}
