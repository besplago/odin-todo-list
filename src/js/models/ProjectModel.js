import { Observable } from "./Observable.js";
import { Project } from "./Project.js";

export class ProjectModel {
  constructor() {
    this.projectsObservable = new Observable();
    this.selectionObservable = new Observable();

    this.projects = [];
    this.selectedProjectId = null;
  }

  bindProjects(callback) {
    this.projectsObservable.bind(callback);
  }

  bindSelection(callback) {
    this.selectionObservable.bind(callback);
  }

  _commitProjects() {
    this.projectsObservable._commit([...this.projects]);
  }

  _commitSelection() {
    this.selectionObservable._commit(this.getSelectedProject());
  }

  addProject(name, taskModel) {
    const id = crypto.randomUUID();
    if (this.selectedProjectId == null) {
      this.selectedProjectId = id;
    }

    const project = new Project(id, name, taskModel);
    this.projects.push(project);

    this._commitProjects();
    this._commitSelection();
  }

  getProjects() {
    return [...this.projects];
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

    this._commitProjects();
    if (wasSelectedProject) {
      this._commitSelection();
    }
  }

  reorderProjects(oldIndex, newIndex) {
    const movedProject = this.projects.splice(oldIndex, 1)[0];
    this.projects.splice(newIndex, 0, movedProject);
    this._commitProjects();
  }

  updateSelectedProject(id) {
    if (this.selectedProjectId !== id) {
      this.selectedProjectId = id;
      this._commitSelection();
    }
  }

  getSelectedProject() {
    return this.projects.find(
      (project) => project.id === this.selectedProjectId
    );
  }

  getSelectedProjectTaskModel() {
    return this.getSelectedProject().taskModel;
  }
}
