import "./styles.css";
import { Task, Project, projectList } from "./model.js";
import { renderTasks, renderProjects } from "./ui.js";
import { PopupController } from "./controller.js";

const myProjectList = new projectList();
const myProject = new Project();

const testTask = new Task(
  "Testing",
  "Test description",
  "2024-12-14",
  "High",
  false
);

const testTask2 = new Task(
  "Testing",
  "Test description",
  "2024-12-14",
  "High",
  false
);

const testTask3 = new Task(
  "Testing",
  "Test description",
  "2024-12-14",
  "High",
  false
);

myProject.addTask(testTask);
myProject.addTask(testTask2);
myProject.addTask(testTask3);

const tasks = myProject.getTasks();
renderTasks(tasks);

new PopupController(myProject, myProjectList);
