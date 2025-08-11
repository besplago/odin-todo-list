export class ProjectModel {
  constructor() {
    this.projects = [];
    this.listeners = [];
  }

  bindProjectsChanged(callback) {
    this.listeners.push(callback);
  }

  _commit(projects) {
    this.listeners.forEach((callback) => callback(projects));
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
}
