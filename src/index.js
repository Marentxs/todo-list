import "./styles.css";
import { Task, Project } from "./model.js";
import { renderTasks } from "./ui.js";
import { PopupController } from "./controller.js";

const myProject = new Project();
const testTask = new Task(
  "Testing",
  "Test description",
  "2024-12-14",
  "High",
  false
);

myProject.addTask(testTask);

const tasks = myProject.getTasks();
renderTasks(tasks);

new PopupController(myProject);
