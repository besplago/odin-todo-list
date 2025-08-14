export class TasksController {
  constructor(taskModel, tasksView) {
    this.model = taskModel;
    this.view = tasksView;

    this.model.bindSelection(this.onTasksChanged);

    this.onTasksChanged(this.model.getSelectedProject());
  }

  onTasksChanged = (selectedProject) => {
    this.view.renderTasks(selectedProject.tasks.getTasks());
  };
}
