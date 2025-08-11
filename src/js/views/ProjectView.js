import projectIcon from "../../assets/burger-simple-svgrepo-com.svg";

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

      const img = document.createElement("img");
      img.classList.add("icon");
      img.src = projectIcon;
      img.alt = `${project.name} project`;

      const span = document.createElement("span");
      span.textContent = project.name;

      button.appendChild(img);
      button.appendChild(span);
      li.appendChild(button);
      this.projectListElement.appendChild(li);
    });
  }
}
