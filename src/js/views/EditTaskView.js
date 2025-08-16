export class EditTaskView {
  constructor(editPaneSelector) {
    this.paneAside = document.querySelector(editPaneSelector);
    this.form = this.paneAside.querySelector("#edit-task-form");
  }

  updateEditPaneDisplay(selectedTask) {
    if (selectedTask === null) {
      this.paneAside.classList.toggle("hidden", true);
      return;
    }

    this.paneAside.classList.toggle("hidden", false);

    this.form.querySelector("#title").value = selectedTask.title || "";
    this.form.querySelector("#completed").checked = !!selectedTask.completed;
    this.form.querySelector("#important").checked = !!selectedTask.important;

    if (selectedTask.dueDate) {
      const date = new Date(selectedTask.dueDate);
      const formatted = date.toISOString().split("T")[0];
      this.form.querySelector("#duedate").value = formatted;
    } else {
      this.form.querySelector("#duedate").value = "";
    }

    this.form.querySelector("#notes").value = selectedTask.notes || "";
  }

  bindCloseEditPane(handler) {
    const closeEditPaneButton = document.querySelector("#close-edit-pane");
    closeEditPaneButton.addEventListener("click", (_e) => {
      handler();
    });
  }

  bindUpdateTask(handler) {
    const updateTaskButton = this.paneAside.querySelector("#submit-todo");

    updateTaskButton.addEventListener("click", (e) => {
      e.preventDefault();
      const title = this.form.querySelector("#title").value;
      const completed = this.form.querySelector("#completed").checked;
      const important = this.form.querySelector("#important").checked;
      const dueDate = this.form.querySelector("#duedate").value;
      const notes = this.form.querySelector("#notes").value;

      const updatedTask = {
        title: title || "",
        completed: completed,
        important: important,
        dueDate: dueDate || null,
        notes: notes || "",
      };

      handler(updatedTask);
    });
  }
}
