import { Project } from "../models/Project.js";

export class ProjectController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.model.bindProjects(this.onProjectsChanged);
    this.model.bindSelection(this.onSelectionChanged);

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
    this.onSelectionChanged(this.model.getSelectedProject());
  }

  onProjectsChanged = (projects) => {
    this.view.renderProjects(projects);
  };

  onSelectionChanged = (selectedProject) => {
    this.view.renderSelectedProjectTitle(selectedProject.name); // Fix: try deleting every project
  };

  handleDeleteProject = (id) => {
    this.model.deleteProject(id);
  };

  handleProjectSelect = (id) => {
    this.model.updateSelectedProject(id);
  };

  handleReorderProjects = (oldIndex, newIndex) => {
    this.model.reorderProjects(oldIndex, newIndex);
  };
}
