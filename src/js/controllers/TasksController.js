export class TasksController {
  constructor(projectModel, views) {
    this.projectModel = projectModel;
    [this.tasksView, this.editTaskView] = views;

    this.projectModel.bindSelection(this.onSelectedProjectChanged);

    this.tasksView.bindSelectTask(this.handleTaskSelection);
    this.tasksView.bindCompletion(this.handleCompletion);
    this.tasksView.bindImportant(this.handleImportant);

    this.onSelectedProjectChanged(this.projectModel.getSelectedProject());
  }

  onSelectedProjectChanged = (selectedProject) => {
    this.tasksView.renderTasks(selectedProject.tasks.getTasks());
  };

  handleTaskSelection = (taskId) => {
    const taskModel = this.projectModel.getSelectedProjectTaskModel();
    taskModel.updateSelectedTask(taskId);
  };

  handleCompletion = (taskId, completed) => {
    const taskModel = this.projectModel.getSelectedProjectTaskModel();
    taskModel.updateCompletion(taskId, completed);
  };

  handleImportant = (taskId, important) => {
    const taskModel = this.projectModel.getSelectedProjectTaskModel();
    taskModel.updateImportance(taskId, important);
  };
}
