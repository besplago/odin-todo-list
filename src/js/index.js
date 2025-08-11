import "../styles.css";
import "../template.html";
import { Project } from "./Project.js";
import { Task } from "./Task.js";

document.addEventListener("DOMContentLoaded", function () {
  let defaultProject = new Project("Default", [
    new Task("Shop for AF1's", true, false, new Date(2025, 7, 1), ""),
    new Task("Go gym", false, false, new Date(2025, 7, 5), ""),
    new Task("Goon", true, true, new Date(Date.now()), ""),
    new Task("Trap", false, true, new Date(2025, 12, 15), ""),
    new Task("Get money", false, false, new Date(2026, 1, 20), ""),
  ]);

  let workProject = new Project("Work", [
    new Task("Finish quarterly report", false, true, new Date(2025, 7, 14), ""),
    new Task("Email client feedback", true, false, new Date(2025, 7, 3), ""),
    new Task("Team standup meeting", false, true, new Date(Date.now()), ""),
    new Task("Update project roadmap", false, false, new Date(2025, 8, 1), ""),
    new Task("Review PRs", false, false, new Date(2025, 7, 12), ""),
  ]);

  let personalProject = new Project("Personal", [
    new Task("Call mom", false, true, new Date(2025, 7, 8), ""),
    new Task("Book vacation tickets", true, false, new Date(2025, 6, 25), ""),
    new Task("Meal prep for the week", false, false, new Date(Date.now()), ""),
    new Task("Renew gym membership", false, true, new Date(2025, 8, 5), ""),
    new Task("Read new book", false, false, new Date(2025, 7, 20), ""),
  ]);
});
