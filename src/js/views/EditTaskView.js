export class EditTaskView {
  constructor(editPaneSelector) {
    this.paneAside = document.querySelector(editPaneSelector);
  }

  openEditPane(selectedTask) {
    if (selectedTask === null) {
      return;
    }

    this.paneAside.classList.toggle("hidden", false);
  }

  bindCloseEditPane(handler) {
    const closeEditPaneButton = document.querySelector("#close-edit-pane");
    closeEditPaneButton.addEventListener("click", (e) => {
      this.paneAside.classList.toggle("hidden", true);
      handler();
    });
  }
}
