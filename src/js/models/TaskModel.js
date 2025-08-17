import { Observable } from "./Observable.js";
import { Task } from "./Task.js";

export class TaskModel {
  constructor(tasks = []) {
    this.tasksObservable = new Observable();
    this.selectionObservable = new Observable();

    this.tasks = tasks;
    this.selectedTaskId = null;
  }

  bindTasks(callback) {
    this.tasksObservable.bind(callback);
  }

  bindSelection(callback) {
    this.selectionObservable.bind(callback);
  }

  _commitTasks() {
    this.tasksObservable._commit([...this.tasks]);
  }

  _commitSelection() {
    this.selectionObservable._commit(this.getSelectedTask());
  }

  addTask({
    title = "",
    completed = false,
    important = false,
    dueDate = new Date(),
    notes = "",
  }) {
    const id = crypto.randomUUID();
    const task = new Task(id, title, completed, important, dueDate, notes);
    this.tasks.push(task);
    this._commitTasks(this.tasks);
  }

  getTasks() {
    return this.tasks;
  }

  getTask(id) {
    return this.tasks.find((task) => task.id === id);
  }

  getSelectedTaskId() {
    return this.selectedTaskId;
  }

  getSelectedTask() {
    if (this.selectedTaskId === null) {
      return null;
    }
    return this.tasks.find((task) => task.id === this.selectedTaskId);
  }

  updateTask(updates) {
    const selectedTask = this.getSelectedTask();
    if (!selectedTask) return;

    Object.assign(selectedTask, updates);
    this._commitTasks();
  }

  updateSelectedTask(id) {
    this.selectedTaskId = id;
    this._commitSelection();
  }

  deselectTask() {
    this.selectedTaskId = null;
    this._commitSelection();
  }

  updateCompletion(id, completed) {
    const task = this.getTask(id);
    task.completed = completed;
  }

  updateImportance(id, important) {
    const task = this.getTask(id);
    task.important = important;
  }

  deleteTask(id) {
    if (id === this.selectedTaskId) {
      this.deselectTask();
    }
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this._commitTasks();
  }

  toJSON() {
    return {
      tasks: this.tasks.map((t) => t.toJSON()),
      selectedTaskId: this.selectedTaskId,
    };
  }

  static fromJSON(raw) {
    const tasks = raw.tasks.map((t) => Task.fromJSON(t));
    const model = new TaskModel(tasks);
    model.selectedTaskId = raw.selectedTaskId;
    return model;
  }
}
