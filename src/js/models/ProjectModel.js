import { Observable } from "./Observable.js";
import { Project } from "./Project.js";

export class ProjectModel extends Observable {
  constructor() {
    super();
    this.projects = [];
    this.selectedProjectId = null;
  }

  addProject(name, tasks) {
    const id = crypto.randomUUID();
    if (this.selectedProjectId == null) {
      this.selectedProjectId = id;
    }

    const project = new Project(id, name, tasks);
    this.projects.push(project);
    this._commit(this.projects);
  }

  getProjects() {
    return this.projects;
  }

  getProject(id) {
    return this.projects.find((project) => project.id === id);
  }

  deleteProject(id) {
    const wasSelectedProject = this.selectedProjectId === id;
    this.projects = this.projects.filter((project) => project.id !== id);

    if (this.projects.length === 0) {
      this.selectedProjectId = null;
    } else if (wasSelectedProject) {
      this.selectedProjectId = this.projects[0].id;
    }

    this._commit(this.projects);
  }

  reorderProjects(oldIndex, newIndex) {
    const movedProject = this.projects.splice(oldIndex, 1)[0];
    this.projects.splice(newIndex, 0, movedProject);
    this._commit(this.projects);
  }

  updateSelectedProject(id) {
    this.selectedProjectId = id;
    this._commit(this.projects); // For now, better way to handle this?
  }

  getSelectedProject() {
    return this.projects.find(
      (project) => project.id === this.selectedProjectId
    );
  }
}
