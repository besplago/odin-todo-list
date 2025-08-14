import { Project } from "../models/Project.js";

export class ProjectController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.currentProjectId = null;

    this.model.bind(this.onProjectsChanged);

    this.view.bindDeleteProject(this.handleDeleteProject);
    this.view.bindSelectProject(this.handleProjectSelect);
    this.view.bindReorderProjects(this.handleReorderProjects);

    const newProjectButton = document.querySelector("#new-project");
    newProjectButton.addEventListener("click", () => {
      const name = prompt("Project name:");
      if (name) {
        this.model.addProject(new Project(name, []));
      }
    });

    this.onProjectsChanged(this.model.getProjects());
  }

  onProjectsChanged = (projects) => {
    this.view.renderProjects(projects);
  };

  onSelectedProjectChanged = (id) => {};

  handleDeleteProject = (id) => {
    this.model.deleteProject(id);
  };

  handleProjectSelect = (id) => {
    this.currentProjectId = id;
    const selectedProjectName = this.model.getProject(id).name;
    this.view.renderSelectedProjectTitle(selectedProjectName);
    this.onSelectedProjectChanged(this.currentProjectId);
  };

  handleReorderProjects = (oldIndex, newIndex) => {
    this.model.reorderProjects(oldIndex, newIndex);
  };
}
