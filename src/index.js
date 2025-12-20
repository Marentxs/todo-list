import "./styles.css";
import { Task, Project, projectList } from "./model.js";
import { renderTasks, renderProjects } from "./ui.js";
import { ProjectController } from "./projectController.js";
import { TaskController } from "./taskController.js";

const myProjectList = new projectList();

let projects = myProjectList.getProjects();

if (projects.length === 0) {
  const myProject = new Project("Daily");
  const myProject2 = new Project("Weekly");
  const myProject3 = new Project("Monthly");

  myProjectList.addProject(myProject);
  myProjectList.addProject(myProject2);
  myProjectList.addProject(myProject3);

  renderProjects(projects, myProject.id);

  const firstProjectCard = document.querySelector(".project-card");
  if (firstProjectCard) {
    firstProjectCard.classList.add("active-project");
  }

  const testTask = new Task(
    "Finish novel",
    "Read chapters 15-20 of 'Misery'",
    "2025-12-30",
    "Low",
    false
  );

  const testTask2 = new Task(
    "Deploy to production",
    "Final deployment.",
    "2025-12-26",
    "Medium",
    false
  );

  const testTask3 = new Task(
    "Call mom",
    "It's her birthday!",
    "2025-12-15",
    "High",
    true
  );

  myProject.addTask(testTask);
  myProject.addTask(testTask2);
  myProject.addTask(testTask3);
}

myProjectList.saveToStorage();

projects = myProjectList.getProjects();

if (projects.length > 0) {
  const firstProject = projects[0];
  renderProjects(projects, firstProject.id);

  const firstProjectCard = document.querySelector(".project-card");
  if (firstProjectCard) {
    firstProjectCard.classList.add("active-project");
  }

  const tasks = firstProject.getTasks();
  renderTasks(tasks);

  const taskController = new TaskController(firstProject, myProjectList);
  const projectController = new ProjectController(
    myProjectList,
    taskController
  );
  projectController.activeProjectId = firstProject.id;
} else {
  renderProjects(projects);
  const taskController = new TaskController(firstProject, myProjectList);
  const projectController = new ProjectController(
    myProjectList,
    taskController
  );
}
