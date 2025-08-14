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
      new Task(
        crypto.randomUUID(),
        "Investigate mysterious laughter coming from abandoned carnival",
        false,
        false,
        new Date(2024, 12, 20),
        "Bring extra bat-earplugs - that cackling is annoying"
      ),
      new Task(
        crypto.randomUUID(),
        "Disarm Joker's whoopee cushion bombs in city hall",
        false,
        true,
        new Date(2025, 7, 22),
        "Warning: May contain glitter AND confetti"
      ),
      new Task(
        crypto.randomUUID(),
        "Patrol Crime Alley (anniversary night)",
        false,
        false,
        new Date(2025, 7, 25),
        "Bring flowers - and extra batarangs"
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
      new Task(
        crypto.randomUUID(),
        "Polish Batmobile after Catwoman's latest 'joyride'",
        false,
        false,
        new Date(2025, 7, 18),
        "Remove pawprint decals she added"
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
      new Task(
        crypto.randomUUID(),
        "Renew membership at Gotham Country Club (for 'golf accident' alibi)",
        false,
        false,
        new Date(2025, 7, 16),
        "Actually learn to golf this time?"
      ),
      new Task(
        crypto.randomUUID(),
        "Host board meeting about 'no, the tower antenna is NOT a bat-signal'",
        false,
        true,
        new Date(2025, 7, 21),
        "Prepare unconvincing PowerPoint"
      ),
    ])
  );

  const projectView = new ProjectView(
    "#projects-pane",
    "#selected-project-title"
  );
  const projectController = new ProjectController(projectModel, projectView);

  const firstProject = projectModel.getProjects()[0];
  if (firstProject) {
    projectController.handleProjectSelect(firstProject.id);
  }

  const tasksView = new TasksView("#todo-container");
  new TasksController(projectModel, tasksView);
});
