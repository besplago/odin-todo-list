export class TasksController {
  constructor(projectModel, views) {
    this.projectModel = projectModel;
    this.taskModel = null;
    [this.tasksView, this.editTaskView] = views;

    this.projectModel.bindSelection(this.onSelectedProjectChanged);

    this.tasksView.bindDeleteTask(this.handleTaskDeletion);
    this.tasksView.bindCompletion(this.handleCompletion);
    this.tasksView.bindImportant(this.handleImportant);
    this.tasksView.bindSelectTask(this.handleTaskSelection);

    this.editTaskView.bindCloseEditPane(this.handleEditPaneClosed);

    this.onSelectedProjectChanged(this.projectModel.getSelectedProject());
  }

  onSelectedProjectChanged = (selectedProject) => {
    if (this.taskModel !== null) {
      this.taskModel.deselectTask();
    }
    this.taskModel = this.projectModel.getSelectedProjectTaskModel();
    this.taskModel.bindSelection(this.onSelectedTaskChanged);
    this.taskModel.bindTasks(this.onTasksChanged);
    this.tasksView.renderTasks(selectedProject.tasks.getTasks());
  };

  onSelectedTaskChanged = (selectedTask) => {
    this.editTaskView.toggleEditPaneVisibility(selectedTask);
  };

  onTasksChanged = (tasks) => {
    this.tasksView.renderTasks(tasks);
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

  handleTaskDeletion = (taskId) => {
    this.taskModel.deleteTask(taskId);
  };

  handleEditPaneClosed = () => {
    this.taskModel.deselectTask();
  };
}
