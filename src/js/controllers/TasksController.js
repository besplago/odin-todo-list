export class TasksController {
  constructor(projectModel, tasksView) {
    this.projectModel = projectModel;
    this.view = tasksView;

    this.projectModel.bindSelection(this.onSelectedProjectChanged);

    this.view.bindSelectTask(this.handleTaskSelection);
    this.view.bindCompletion(this.handleCompletion);
    this.view.bindImportant(this.handleImportant);

    this.onSelectedProjectChanged(this.projectModel.getSelectedProject());
  }

  onSelectedProjectChanged = (selectedProject) => {
    this.view.renderTasks(selectedProject.tasks.getTasks());
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
