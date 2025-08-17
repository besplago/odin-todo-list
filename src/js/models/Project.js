import { TaskModel } from "../models/TaskModel.js";

export class Project {
  constructor(id, name, taskModel) {
    this.id = id;
    this.name = name;
    this.taskModel = taskModel;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      taskModel: this.taskModel.toJSON(),
    };
  }

  static fromJSON(raw) {
    return new Project(raw.id, raw.name, TaskModel.fromJSON(raw.taskModel));
  }
}
