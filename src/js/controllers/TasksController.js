export class TasksController {
  constructor(projectModel, views) {
    this.projectModel = projectModel;
    this.taskModel = null;
    [this.tasksView, this.editTaskView] = views;

    this.projectModel.bindSelection(this.onSelectedProjectChanged);

    this.tasksView.bindSelectTask(this.handleTaskSelection);
    this.tasksView.bindCompletion(this.handleCompletion);
    this.tasksView.bindImportant(this.handleImportant);

    this.editTaskView.bindCloseEditPane(this.handleEditPaneClosed);

    this.onSelectedProjectChanged(this.projectModel.getSelectedProject());
  }

  onSelectedProjectChanged = (selectedProject) => {
    this.taskModel = this.projectModel.getSelectedProjectTaskModel();
    this.taskModel.bindSelection(this.onSelectedTaskChanged);
    this.tasksView.renderTasks(selectedProject.tasks.getTasks());
  };

  onSelectedTaskChanged = (selectedTask) => {
    this.editTaskView.openEditPane(selectedTask);
  };

  handleTaskSelection = (taskId) => {
    this.taskModel.updateSelectedTask(taskId);
  };

  handleCompletion = (taskId, completed) => {
    this.taskModel.updateCompletion(taskId, completed);
  };

  handleImportant = (taskId, important) => {
    this.taskModel.updateImportance(taskId, important);
  };

  handleEditPaneClosed = () => {
    this.taskModel.deselectTask();
  };
}
