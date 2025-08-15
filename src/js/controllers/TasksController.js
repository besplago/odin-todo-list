export class TasksController {
  constructor(taskModel, tasksView) {
    this.model = taskModel;
    this.view = tasksView;

    this.model.bindSelection(this.onSelectedProjectChanged);

    this.view.bindSelectTask(this.handleTaskSelection);
    this.view.bindCompletion(this.handleCompletion);
    this.view.bindImportant(this.handleImportant);

    this.onSelectedProjectChanged(this.model.getSelectedProject());
  }

  onSelectedProjectChanged = (selectedProject) => {
    this.view.renderTasks(selectedProject.tasks.getTasks());
  };

  handleTaskSelection = (taskId) => {
    const taskModel = this.model.getSelectedProjectTaskModel();
    taskModel.updateSelectedTask(taskId);
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
