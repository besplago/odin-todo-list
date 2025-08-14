import caretIcon from "../../assets/caret-down-svgrepo-com.svg";

export class TasksView {
  constructor(tasksContainerSelector) {
    this.container = document.querySelector(tasksContainerSelector);
  }

  renderTasks(tasks) {
    if (!this.container) return;

    this.container.innerHTML = "";

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const categories = {
      past: [],
      today: [],
      future: [],
    };

    tasks.forEach((task) => {
      const taskDate = new Date(task.dueDate);
      taskDate.setHours(0, 0, 0, 0);

      if (taskDate < today) {
        categories.past.push(task);
      } else if (taskDate.getTime() === today.getTime()) {
        categories.today.push(task);
      } else {
        categories.future.push(task);
      }
    });

    const createCategorySection = (categoryName, tasks) => {
      if (tasks.length === 0) return "";

      const section = document.createElement("article");
      section.classList.add("todo-category");

      const header = document.createElement("header");
      header.classList.add("drop-down", "selectable", "highlighted");

      const caretImg = document.createElement("img");
      caretImg.classList.add("icon");
      caretImg.src = caretIcon;
      caretImg.alt = "";
      caretImg.setAttribute("aria-hidden", "true");

      const title = document.createElement("h2");
      title.textContent =
        categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

      const count = document.createElement("span");
      count.setAttribute("aria-label", `${tasks.length} tasks`);
      count.textContent = tasks.length;

      header.appendChild(caretImg);
      header.appendChild(title);
      header.appendChild(count);

      const taskList = document.createElement("ul");
      taskList.classList.add("todo-category-container");

      tasks.forEach((task) => {
        const taskItem = document.createElement("li");
        taskItem.classList.add("todo", "selectable", "highlighted");
        taskItem.dataset.taskId = task.id;

        const completedLabel = document.createElement("label");
        completedLabel.classList.add("check-toggle");

        const completedInput = document.createElement("input");
        completedInput.type = "checkbox";
        completedInput.name = "completed";
        completedInput.checked = task.completed;

        const completedIcon = document.createElement("span");
        completedIcon.classList.add("icon");

        completedLabel.appendChild(completedInput);
        completedLabel.appendChild(completedIcon);

        const details = document.createElement("div");
        details.classList.add("task-details");

        const titleSpan = document.createElement("span");
        titleSpan.textContent = task.title;

        const dateSpan = document.createElement("span");
        dateSpan.textContent = this.formatDate(task.dueDate);

        details.appendChild(titleSpan);
        details.appendChild(dateSpan);

        const importantLabel = document.createElement("label");
        importantLabel.classList.add("star-toggle");

        const importantInput = document.createElement("input");
        importantInput.type = "checkbox";
        importantInput.name = "important";
        importantInput.checked = task.important;

        const importantIcon = document.createElement("span");
        importantIcon.classList.add("icon");

        importantLabel.appendChild(importantInput);
        importantLabel.appendChild(importantIcon);

        taskItem.appendChild(completedLabel);
        taskItem.appendChild(details);
        taskItem.appendChild(importantLabel);

        taskList.appendChild(taskItem);
      });

      section.appendChild(header);
      section.appendChild(taskList);

      return section;
    };

    const pastSection = createCategorySection("Past", categories.past);
    const todaySection = createCategorySection("Today", categories.today);
    const futureSection = createCategorySection("Future", categories.future);

    if (pastSection) this.container.appendChild(pastSection);
    if (todaySection) this.container.appendChild(todaySection);
    if (futureSection) this.container.appendChild(futureSection);
  }

  bindCompletion(handler) {
    this.container.addEventListener("change", (e) => {
      if (e.target.matches('input[type="checkbox"][name="completed"]')) {
        const li = e.target.closest("li");
        if (!li) return;
        const taskId = li.dataset.taskId;
        handler(taskId, e.target.checked);
      }
    });
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
}
