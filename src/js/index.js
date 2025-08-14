import "../styles.css";
import "../template.html";
import { Task } from "./models/Task.js";
import { ProjectModel } from "./models/ProjectModel.js";
import { ProjectView } from "./views/ProjectView.js";
import { ProjectController } from "./controllers/ProjectController.js";
import { TaskModel } from "./models/TaskModel.js";
import { TasksView } from "./views/TasksView.js";
import { TasksController } from "./controllers/TasksController.js";

document.addEventListener("DOMContentLoaded", function () {
  const projectModel = new ProjectModel();

  // Example projects
  projectModel.addProject(
    "Gotham Patrol",
    new TaskModel([
      new Task(
        crypto.randomUUID(),
        "Return stolen dinosaur from museum (Riddler's being extra again)",
        true,
        false,
        new Date(2025, 6, 15),
        "Note: Tell Alfred to dry-clean cape - dino drool stains"
      ),
      new Task(
        crypto.randomUUID(),
        "Stop Penguin's umbrella-smuggling ring",
        false,
        true,
        new Date(2025, 7, 14),
        "Bring anti-rainbrella spray"
      ),
      new Task(
        crypto.randomUUID(),
        "Practice brooding on gargoyle (scheduled maintenance)",
        false,
        false,
        new Date(2025, 7, 17),
        "Gotham Times photographer will be hiding nearby"
      ),
    ])
  );

  projectModel.addProject(
    "Batcave Upkeep",
    new TaskModel([
      new Task(
        crypto.randomUUID(),
        "Teach Robin to defuse bombs (DO OVER)",
        false,
        true,
        new Date(2025, 6, 22),
        "Order new cave chandelier - third this month"
      ),
      new Task(
        crypto.randomUUID(),
        "Debug Bat-computer's sarcasm module (it called me 'Caped Crusader' again)",
        false,
        false,
        new Date(2025, 7, 14),
        "Seriously considering factory reset"
      ),
      new Task(
        crypto.randomUUID(),
        "Restock bat-shark repellent (summer sale at Costco)",
        false,
        false,
        new Date(2025, 8, 3),
        "Check expiration date on current canister"
      ),
    ])
  );

  projectModel.addProject(
    "Bruce Wayne Obligations",
    new TaskModel([
      new Task(
        crypto.randomUUID(),
        "Attend charity ball (remember not to grapple out mid-conversation)",
        true,
        false,
        new Date(2025, 6, 30),
        "Left champagne flute on gargoyle - send Alfred"
      ),
      new Task(
        crypto.randomUUID(),
        "Explain bat-shaped bruise at Wayne Enterprises meeting",
        false,
        true,
        new Date(2025, 7, 14),
        "'Golf accident' story not working anymore"
      ),
      new Task(
        crypto.randomUUID(),
        "Buy more 'playboy' tabloid headlines (keep cover intact)",
        false,
        false,
        new Date(2025, 8, 10),
        "Hire paparazzi for yacht photoshoot"
      ),
    ])
  );

  projectModel.addProject(
    "Superhero Networking",
    new TaskModel([
      new Task(
        crypto.randomUUID(),
        "Return Flash's borrowed microwavable burrito (slightly bat-nibbled)",
        false,
        true,
        new Date(2025, 7, 3),
        "He runs fast but holds grudges longer"
      ),
      new Task(
        crypto.randomUUID(),
        "Attend Justice League potluck (bring non-cave-aged cheese)",
        false,
        false,
        new Date(2025, 7, 14),
        "Superman promised not to x-ray the dish this time"
      ),
      new Task(
        crypto.randomUUID(),
        "Fix bat-signal strobe setting (blinding pigeons counts as animal cruelty)",
        false,
        false,
        new Date(2025, 7, 25),
        "Commissioner Gordon getting migraines"
      ),
    ])
  );

  const projectView = new ProjectView(
    "#projects-pane",
    "#selected-project-title"
  );
  const projectController = new ProjectController(projectModel, projectView);

  const tasksView = new TasksView("#todo-container");
  let tasksController = null;

  const firstProject = projectModel.getProjects()[0];
  if (firstProject) {
    projectController.handleProjectSelect(firstProject.id);
  }
});
