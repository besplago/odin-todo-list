export class TasksController {
  constructor(taskModel, tasksView) {
    this.model = taskModel;
    this.view = tasksView;

    this.model.bindSelection(this.onTasksChanged);

    this.view.bindCompletion(this.handleCompletion);
    this.view.bindImportant(this.handleImportant);

    this.onTasksChanged(this.model.getSelectedProject());
  }

  onTasksChanged = (selectedProject) => {
    this.view.renderTasks(selectedProject.tasks.getTasks());
  };

  handleCompletion = (taskId, completed) => {
    const taskModel = this.model.getSelectedProjectTaskModel();
    taskModel.updateCompletion(taskId, completed);
  };

  handleImportant = (taskId, important) => {
    const taskModel = this.model.getSelectedProjectTaskModel();
    taskModel.updateImportance(taskId, important);
  };
}
