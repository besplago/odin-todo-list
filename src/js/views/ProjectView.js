import projectIcon from "../../assets/burger-simple-svgrepo-com.svg";
import trashIcon from "../../assets/trash-svgrepo-com.svg";

export class ProjectView {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    this.projectListElement = this.container.querySelector("ul");
  }

  renderProjects(projects) {
    this.projectListElement.innerHTML = "";

    projects.forEach((project) => {
      const li = document.createElement("li");
      li.classList.add("project-row");

      const projectButton = document.createElement("button");
      projectButton.classList.add("project", "selectable");
      projectButton.type = "button";

      const imgBurger = document.createElement("img");
      imgBurger.classList.add("icon");
      imgBurger.src = projectIcon;
      imgBurger.alt = `${project.name} project`;

      const span = document.createElement("span");
      span.textContent = project.name;

      projectButton.appendChild(imgBurger);
      projectButton.appendChild(span);

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("delete-project-btn");
      deleteButton.type = "button";

      const imgTrash = document.createElement("img");
      imgTrash.classList.add("icon");
      imgTrash.src = trashIcon;
      imgTrash.alt = `Delete ${project.name} project`;

      deleteButton.appendChild(imgTrash);

      li.appendChild(projectButton);
      li.appendChild(deleteButton);
      this.projectListElement.appendChild(li);
    });
  }
}
