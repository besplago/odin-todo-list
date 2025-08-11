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
      const button = document.createElement("button");
      button.classList.add("project", "selectable");
      button.type = "button";

      const imgBurger = document.createElement("img");
      imgBurger.classList.add("icon");
      imgBurger.src = projectIcon;
      imgBurger.alt = `${project.name} project`;

      const span = document.createElement("span");
      span.textContent = project.name;

      const imgTrash = document.createElement("img");
      imgTrash.classList.add("icon");
      imgTrash.classList.add("delete-project-icon");
      imgTrash.src = trashIcon;
      imgTrash.alt = `Delete ${project.name} project`;

      button.appendChild(imgBurger);
      button.appendChild(span);
      button.appendChild(imgTrash);
      li.appendChild(button);
      this.projectListElement.appendChild(li);
    });
  }
}
