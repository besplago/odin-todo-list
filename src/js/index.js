import "../styles.css";
import "../template.html";
import { ProjectModel } from "./models/ProjectModel.js";
import { ProjectView } from "./views/ProjectView.js";
import { ProjectController } from "./controllers/ProjectController.js";
import { TasksView } from "./views/TasksView.js";
import { TasksController } from "./controllers/TasksController.js";
import { EditTaskView } from "./views/EditTaskView.js";
import { createExampleProjectModel } from "./utils/ExampleProjectModel.js";

const STORAGE_KEY = "projectModel";
const PROJECTS_PANE_SELECTOR = "#projects-pane";
const PROJECT_TITLE_SELECTOR = "#selected-project-title";
const TODO_CONTAINER_SELECTOR = "#todo-container";
const EDIT_PANE_SELECTOR = "#edit-pane";

document.addEventListener("DOMContentLoaded", () => {
  let projectModel;

  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    projectModel = savedData
      ? ProjectModel.fromJSON(JSON.parse(savedData))
      : createExampleProjectModel();
  } catch (error) {
    console.error("Failed to load data:", error);
    projectModel = createExampleProjectModel();
  }

  const projectView = new ProjectView(
    PROJECTS_PANE_SELECTOR,
    PROJECT_TITLE_SELECTOR
  );

  const tasksView = new TasksView(TODO_CONTAINER_SELECTOR);
  const editTaskView = new EditTaskView(EDIT_PANE_SELECTOR);

  new ProjectController(projectModel, projectView);
  new TasksController(projectModel, [tasksView, editTaskView]);

  const firstProject = projectModel.getProjects()[0];
  if (firstProject) {
    projectModel.selectedProjectId = firstProject.id;
  }

  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projectModel));
  }
});
