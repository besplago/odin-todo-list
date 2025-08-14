export class Task {
  constructor(id, title, completed, important, dueDate, notes) {
    this.id = id;
    this.title = title;
    this.completed = completed;
    this.important = important;
    this.dueDate = dueDate;
    this.notes = notes;
  }
}
