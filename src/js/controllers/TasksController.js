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
    // Instead of manually handling the updating of the view here, we can make the task model fire
    // an event when the selected taskupdates which we bind to in an "on" function
    const taskModel = this.projectModel.getSelectedProjectTaskModel();
    taskModel.updateSelectedTask(taskId);
    this.editTaskView.openEditPane(taskModel.getSelectedTaskId());
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
