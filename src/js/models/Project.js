export class Project {
  constructor(name, tasks) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.tasks = tasks;
  }
}
