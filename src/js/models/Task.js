export class Task {
  constructor(id, title, completed, important, dueDate, notes) {
    this.id = id;
    this.title = title;
    this.completed = completed;
    this.important = important;
    this.dueDate = dueDate;
    this.notes = notes;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      completed: this.completed,
      important: this.important,
      dueDate: this.dueDate.toISOString(),
      notes: this.notes,
    };
  }

  static fromJSON(raw) {
    return new Task(
      raw.id,
      raw.title,
      raw.completed,
      raw.important,
      new Date(raw.dueDate),
      raw.notes
    );
  }
}
