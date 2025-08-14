import "../styles.css";
import "../template.html";
import { Task } from "./models/Task.js";
import { ProjectModel } from "./models/ProjectModel.js";
import { ProjectView } from "./views/ProjectView.js";
import { ProjectController } from "./controllers/ProjectController.js";
import { TasksView } from "./views/TasksView.js";

document.addEventListener("DOMContentLoaded", function () {
  const projectModle = new ProjectModel();

  // Example projects
  projectModle.addProject("Default", [
    new Task("Shop for AF1's", true, false, new Date(2025, 7, 1), ""),
    new Task("Go gym", false, false, new Date(2025, 7, 5), ""),
  ]);
  projectModle.addProject("Work", [
    new Task("Finish quarterly report", false, true, new Date(2025, 7, 14), ""),
  ]);
  projectModle.addProject("Personal", [
    new Task("Call mom", false, true, new Date(2025, 7, 8), ""),
  ]);

  const projectView = new ProjectView("#projects-pane");
  new ProjectController(projectModle, projectView);

  const tasksView = new TasksView("#todo-container");
  // new TasksController = new
});
