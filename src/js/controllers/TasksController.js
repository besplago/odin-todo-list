export class TasksController {
  constructor(taskModel, tasksView) {
    this.model = taskModel;
    this.view = tasksView;

    this.model.bind(this.onTasksChanged);

    this.onTasksChanged(this.model.getTasks());
  }

  onTasksChanged = (tasks) => {
    this.view.renderTasks(tasks);
  };
}
