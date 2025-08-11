import { Project } from "../models/Project.js";

export class ProjectController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.model.bindProjectsChanged(this.onProjectsChanged);

    this.view.bindDeleteProject(this.handleDeleteProject);
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

  handleDeleteProject = (id) => {
    this.model.deleteProject(id);
  };

  handleReorderProjects = (oldIndex, newIndex) => {
    this.model.reorderProjects(oldIndex, newIndex);
  };
}
