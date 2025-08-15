export class EditTaskView {
  constructor(editPaneSelector) {
    this.paneAside = document.querySelector(editPaneSelector);
  }

  toggleEditPaneVisibility(selectedTask) {
    if (selectedTask === null) {
      this.paneAside.classList.toggle("hidden", true);
    } else {
      this.paneAside.classList.toggle("hidden", false);
    }
  }

  bindCloseEditPane(handler) {
    const closeEditPaneButton = document.querySelector("#close-edit-pane");
    closeEditPaneButton.addEventListener("click", (e) => {
      handler();
    });
  }
}
