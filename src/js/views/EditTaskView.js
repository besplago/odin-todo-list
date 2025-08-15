// 1. New task selected updated in task model
// 2. Controller relays this news to this view
// 3. This view opens (unhides) the edit pane

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
