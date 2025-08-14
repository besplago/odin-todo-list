export class TasksController {
  constructor(taskModel, tasksView) {
    this.model = taskModel;
    this.view = tasksView;

    this.model.bind(this.onTasksChanged);
  }

  onTasksChanged = (tasks) => {
    this.view.renderTasks(tasks);
  };
}
