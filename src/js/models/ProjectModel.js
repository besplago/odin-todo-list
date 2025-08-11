export class ProjectModel {
  constructor() {
    this.projects = [];
  }

  addProject(project) {
    this.projects.push(project);
  }

  getProjects() {
    return this.projects;
  }
}
