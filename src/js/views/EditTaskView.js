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
}
