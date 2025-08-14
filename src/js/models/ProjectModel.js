import { Observable } from "./Observable.js";

export class ProjectModel extends Observable {
  constructor() {
    super();
    this.projects = [];
  }

  addProject(project) {
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
