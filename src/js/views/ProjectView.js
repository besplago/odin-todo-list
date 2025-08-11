import projectIcon from "../../assets/burger-simple-svgrepo-com.svg";
import trashIcon from "../../assets/trash-svgrepo-com.svg";

export class ProjectView {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    this.projectListElement = this.container.querySelector("ul");
  }

  renderProjects(projects) {
    this.projectListElement.innerHTML = "";

    projects.forEach((project, index) => {
      const li = document.createElement("li");
      li.classList.add("project-row");
      li.dataset.projectId = project.id;
      li.dataset.index = index;
      li.draggable = true;

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

  bindDeleteProject(handler) {
    this.projectListElement.addEventListener("click", (e) => {
      if (e.target.closest(".delete-project-btn")) {
        const li = e.target.closest("li");
        const projectId = li.dataset.projectId;
        handler(projectId);
      }
    });
  }

  bindReorderProjects(handler) {
    let draggedEl = null;

    this.projectListElement.addEventListener("dragstart", (e) => {
      draggedEl = e.target.closest("li");
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", draggedEl.dataset.index);
      draggedEl.classList.add("dragging");
    });

    this.projectListElement.addEventListener("dragover", (e) => {
      e.preventDefault();
      const afterElement = this._getDragAfterElement(e.clientY);
      console.log(afterElement);

      const dragging = this.projectListElement.querySelector(".dragging");
      if (afterElement == null) {
        this.projectListElement.appendChild(dragging);
      } else {
        this.projectListElement.insertBefore(dragging, afterElement);
      }
    });

    this.projectListElement.addEventListener("drop", (e) => {
      e.preventDefault();
      const oldIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);
      const newIndex = [...this.projectListElement.children].indexOf(draggedEl);
      draggedEl.classList.remove("dragging");

      if (oldIndex !== newIndex) {
        handler(oldIndex, newIndex);
      }
    });

    this.projectListElement.addEventListener("dragend", () => {
      if (draggedEl) draggedEl.classList.remove("dragging");
      draggedEl = null;
    });
  }

  _getDragAfterElement(y) {
    const draggableElements = [
      ...this.projectListElement.querySelectorAll("li:not(.dragging)"),
    ];

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }
}
