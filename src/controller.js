import { renderProjects, renderTasks } from "./ui.js";
import { Task, Project } from "./model.js";

export class PopupController {
  constructor(project, projectList) {
    this.project = project;
    this.list = projectList;

    this.newProjectBtn = document.getElementById("newProjectBtn");
    this.projectPopup = document.getElementById("projectPopup");
    this.newProject = document.getElementById("newProject");
    this.closeProject = document.getElementById("closeProject");
    this.projectForm = document.getElementById("projectForm");

    this.openBtn = document.getElementById("openBtn");
    this.newTask = document.getElementById("newTask");
    this.popup = document.getElementById("popup");
    this.closeTask = document.getElementById("closeTask");
    this.taskForm = document.getElementById("taskForm");

    if (this.newProjectBtn) {
      this.newProjectBtn.addEventListener("click", () => {
        this.projectPopup.classList.add("open");
        this.projectForm.reset();
      });
    }

    if (this.openBtn) {
      this.openBtn.addEventListener("click", () => {
        this.popup.classList.add("open");
        this.taskForm.reset();
      });
    }

    this.closeProject.addEventListener("click", (event) => {
      this.projectPopup.classList.remove("open");
      event.preventDefault();
    });

    this.closeTask.addEventListener("click", (event) => {
      this.popup.classList.remove("open");
      event.preventDefault();
    });

    this.projectForm.addEventListener("submit", (event) => {
      console.log("Project form submitted");
      event.preventDefault();

      const title = document.getElementById("projectTitle").value;
      this.list.addProject(new Project(title));

      const updatedProjects = this.list.getProjects();
      renderProjects(updatedProjects);

      this.projectPopup.classList.remove("open");
      this.projectForm.reset();
    });

    this.taskForm.addEventListener("submit", (event) => {
      console.log("Form submit event fired");
      event.preventDefault();

      const title = document.getElementById("title").value;
      const description = document.getElementById("description").value;
      const date = document.getElementById("date").value;
      const priority = document.getElementById("priority-select").value;
      const done = document.getElementById("done").checked;

      this.project.addTask(new Task(title, description, date, priority, done));

      const updatedTasks = this.project.getTasks();
      renderTasks(updatedTasks);

      this.popup.classList.remove("open");
      this.taskForm.reset();
    });
  }
}
