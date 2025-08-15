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
}
