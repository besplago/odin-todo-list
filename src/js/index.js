import "../styles.css";
import "../template.html";
import { Project } from "./models/Project.js";
import { Task } from "./models/Task.js";
import { ProjectModel } from "./models/ProjectModel.js";
import { ProjectView } from "./views/ProjectView.js";
import { ProjectController } from "./controllers/ProjectController.js";

document.addEventListener("DOMContentLoaded", function () {
  const projectModle = new ProjectModel();

  // Example projects
  projectModle.addProject(
    new Project("Default", [
      new Task("Shop for AF1's", true, false, new Date(2025, 7, 1), ""),
      new Task("Go gym", false, false, new Date(2025, 7, 5), ""),
    ])
  );
  projectModle.addProject(
    new Project("Work", [
      new Task(
        "Finish quarterly report",
        false,
        true,
        new Date(2025, 7, 14),
        ""
      ),
    ])
  );
  projectModle.addProject(
    new Project("Personal", [
      new Task("Call mom", false, true, new Date(2025, 7, 8), ""),
    ])
  );

  const projectView = new ProjectView("#projects-pane");
  new ProjectController(projectModle, projectView);
});
