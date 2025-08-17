import { Observable } from "./Observable.js";
import { Project } from "./Project.js";

export class ProjectModel {
  constructor() {
    this.projectsObservable = new Observable();
    this.selectionObservable = new Observable();

    this.projects = [];
    this.selectedProjectId = null;
  }

  saveToLocalStorage() {
    localStorage.setItem("projectModel", JSON.stringify(this.toJSON()));
  }

  bindProjects(callback) {
    this.projectsObservable.bind(callback);
  }

  bindSelection(callback) {
    this.selectionObservable.bind(callback);
  }

  _commitProjects() {
    this.projectsObservable._commit([...this.projects]);
    this.saveToLocalStorage();
  }

  _commitSelection() {
    this.selectionObservable._commit(this.getSelectedProject());
    this.saveToLocalStorage();
  }

  addProject(name, taskModel) {
    const id = crypto.randomUUID();
    if (this.selectedProjectId == null) {
      this.selectedProjectId = id;
    }

    taskModel.onChange = () => this.saveToLocalStorage();

    const project = new Project(id, name, taskModel);
    this.projects.push(project);

    this._commitProjects();
    this._commitSelection();
  }

  addProjectWithId(id, name, taskModel) {
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
    return (
      this.projects.find((project) => project.id === this.selectedProjectId) ||
      null
    );
  }

  getSelectedProjectTaskModel() {
    if (this.selectedProjectId !== null) {
      return this.getSelectedProject().taskModel;
    }
    return null;
  }

  toJSON() {
    return {
      projects: this.projects.map((p) => p.toJSON()),
      selectedProjectId: this.selectedProjectId,
    };
  }

  static fromJSON(raw) {
    const model = new ProjectModel();
    model.projects = raw.projects.map((p) => {
      const proj = Project.fromJSON(p);
      proj.taskModel.onChange = () => model.saveToLocalStorage();
      return proj;
    });
    model.selectedProjectId = raw.selectedProjectId;
    return model;
  }
}
