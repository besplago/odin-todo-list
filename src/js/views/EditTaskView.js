// 1. New task selected updated in task model
// 2. Controller relays this news to this view
// 3. This view opens (unhides) the edit pane

export class EditTaskView {
  constructor(editPaneSelector) {
    this.paneContainer = document.querySelector(editPaneSelector);
  }
}
