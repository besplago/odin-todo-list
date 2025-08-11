export class ProjectController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.model.bindProjectsChanged(this.onProjectsChanged);

    this.view.bindDeleteProject(this.handleDeleteProject);

    const newProjectButton = document.querySelector("#new-project");
    newProjectButton.addEventListener("click", () => {});

    this.onProjectsChanged(this.model.getProjects());
  }

  onProjectsChanged = (projects) => {
    this.view.renderProjects(projects);
  };

  handleDeleteProject = (id) => {
    this.model.deleteProject(id);
  };
}
