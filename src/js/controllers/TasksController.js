export class TasksController {
  constructor(taskModel, tasksView) {
    this.model = taskModel;
    this.view = tasksView;

    this.model.bindSelection(this.onTasksChanged);

    this.view.bindCompletion(this.handleCompletion);

    this.onTasksChanged(this.model.getSelectedProject());
  }

  onTasksChanged = (selectedProject) => {
    this.view.renderTasks(selectedProject.tasks.getTasks());
  };

  handleCompletion = (taskId) => {
    const taskModel = this.model.getSelectedProjectTaskModel();
    taskModel.markTaskAsComplete(taskId);
  };
}
