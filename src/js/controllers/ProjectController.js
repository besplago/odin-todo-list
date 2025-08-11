export class ProjectController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.renderProjects(this.model.getProjects());

    const newProjectButton = document.querySelector("#new-project");
    newProjectButton.addEventListener("click", () => {});
  }
}
