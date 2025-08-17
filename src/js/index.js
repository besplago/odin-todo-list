import "../styles.css";
import "../template.html";
import { Task } from "./models/Task.js";
import { ProjectModel } from "./models/ProjectModel.js";
import { ProjectView } from "./views/ProjectView.js";
import { ProjectController } from "./controllers/ProjectController.js";
import { TaskModel } from "./models/TaskModel.js";
import { TasksView } from "./views/TasksView.js";
import { TasksController } from "./controllers/TasksController.js";
import { EditTaskView } from "./views/EditTaskView.js";
import { Project } from "./models/Project.js";

export function getExampleProjects() {
  const projectModel = new ProjectModel();

  const metropolisTasks = new TaskModel([
    new Task(
      crypto.randomUUID(),
      "Stop Lex Luthor's kryptonite smuggling operation",
      true,
      false,
      new Date(2025, 7, 16),
      "Note: Bring lead-lined suit - kryptonite exposure risk"
    ),
    new Task(
      crypto.randomUUID(),
      "Rescue space station from meteor shower",
      false,
      true,
      new Date(2025, 7, 16),
      "Check solar flare forecast before departure"
    ),
    new Task(
      crypto.randomUUID(),
      "Disable Brainiac's shrinking device in downtown",
      false,
      false,
      new Date(2025, 7, 18),
      "Watch for miniaturized civilians"
    ),
    new Task(
      crypto.randomUUID(),
      "Roundup escaped phantom zone criminals",
      false,
      false,
      new Date(2025, 7, 20),
      "Use phantom zone projector - Zod might be among them"
    ),
    new Task(
      crypto.randomUUID(),
      "Investigate mysterious heat waves in Suicide Slum",
      false,
      true,
      new Date(2025, 7, 22),
      "Possible Parasite activity - avoid direct contact"
    ),
    new Task(
      crypto.randomUUID(),
      "Save Daily Planet helicopter (Lois is aboard)",
      false,
      false,
      new Date(2025, 7, 25),
      "Bring extra cape - last one got torn on antenna"
    ),
  ]);

  const fortressTasks = new TaskModel([
    new Task(
      crypto.randomUUID(),
      "Recalibrate Kandorian crystal database",
      false,
      true,
      new Date(2025, 7, 16),
      "Backup first - Krypto messed with settings last week"
    ),
    new Task(
      crypto.randomUUID(),
      "Repair Jor-El's hologram projector (glitching again)",
      false,
      false,
      new Date(2025, 7, 17),
      "Father keeps repeating 'Krypton had it coming'"
    ),
    new Task(
      crypto.randomUUID(),
      "Restock ice breath canisters (heat wave emergency)",
      false,
      false,
      new Date(2025, 7, 18),
      "Priority shipment from Arctic warehouse"
    ),
    new Task(
      crypto.randomUUID(),
      "Polish super-suit after Bizarro's muddy fight",
      false,
      false,
      new Date(2025, 7, 19),
      "Remove backwards 'S' stain he left"
    ),
    new Task(
      crypto.randomUUID(),
      "Defrost frozen Legion flight ring collection",
      false,
      false,
      new Date(2025, 7, 20),
      "Accidental super-breath incident yesterday"
    ),
  ]);

  const clarkTasks = new TaskModel([
    new Task(
      crypto.randomUUID(),
      "Interview Lex Luthor at ribbon-cutting ceremony",
      true,
      false,
      new Date(2025, 6, 30),
      "Remember: No heat vision when he smirks"
    ),
    new Task(
      crypto.randomUUID(),
      "Explain bullet-hole in press pass to Perry",
      false,
      true,
      new Date(2025, 7, 16),
      "'Coffee spill' excuse not working anymore"
    ),
    new Task(
      crypto.randomUUID(),
      "Write article debunking 'Superman menace' theory",
      false,
      false,
      new Date(2025, 7, 18),
      "Use Luthor's own quotes against him"
    ),
    new Task(
      crypto.randomUUID(),
      "Attend Smallville High reunion (keep powers subtle)",
      false,
      false,
      new Date(2025, 7, 19),
      "No floating during basketball game"
    ),
    new Task(
      crypto.randomUUID(),
      "Fix glasses disguise after super-sneeze incident",
      false,
      true,
      new Date(2025, 7, 20),
      "Order 10 backup pairs - thick frames"
    ),
    new Task(
      crypto.randomUUID(),
      "Lunch with Jimmy Olsen (no x-ray vision on his photos)",
      false,
      false,
      new Date(2025, 7, 21),
      "He's suspicious about 'coincidental' rescues"
    ),
  ]);

  const projects = [
    new Project(crypto.randomUUID(), "Metropolis Patrol", metropolisTasks),
    new Project(
      crypto.randomUUID(),
      "Fortress of Solitude Maintenance",
      fortressTasks
    ),
    new Project(crypto.randomUUID(), "Clark Kent Duties", clarkTasks),
  ];

  projectModel.projects = projects;
  projectModel.selectedProjectId = projects[0].id;

  return projectModel;
}

document.addEventListener("DOMContentLoaded", function () {
  // localStorage.clear();

  let projectModel;

  if (!localStorage.getItem("projectModel")) {
    projectModel = getExampleProjects();
    localStorage.setItem("projectModel", JSON.stringify(projectModel));
  } else {
    const raw = JSON.parse(localStorage.getItem("projectModel"));
    projectModel = ProjectModel.fromJSON(raw);
  }

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
  const editTaskView = new EditTaskView("#edit-pane");

  new TasksController(projectModel, [tasksView, editTaskView]);
});
