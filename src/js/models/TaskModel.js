import { Observable } from "./Observable.js";
import { Task } from "./Task.js";

export class TaskModel extends Observable {
  constructor(tasks = []) {
    super();
    this.tasks = tasks;
  }

  addTask(title, completed, important, dueDate, notes) {
    const id = crypto.randomUUID();
    const task = new Task(id, title, completed, important, dueDate, notes);
    this.tasks.push(task);
    this._commit(this.tasks);
  }

  getTasks() {
    return this.tasks;
  }

  deleteTasks(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this._commit(this.tasks);
  }
}
