import { Observable } from "./Observable.js";
import { Project } from "./Project.js";

export class ProjectModel extends Observable {
  constructor() {
    super();
    this.projects = [];
  }

  addProject(name, tasks) {
    const id = crypto.randomUUID();
    const project = new Project(id, name, tasks);
    this.projects.push(project);
    this._commit(this.projects);
  }

  getProjects() {
    return this.projects;
  }

  deleteProject(id) {
    this.projects = this.projects.filter((project) => project.id !== id);
    this._commit(this.projects);
  }

  reorderProjects(oldIndex, newIndex) {
    const movedProject = this.projects.splice(oldIndex, 1)[0];
    this.projects.splice(newIndex, 0, movedProject);
    this._commit(this.projects);
  }
}
