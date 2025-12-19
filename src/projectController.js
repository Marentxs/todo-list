import { renderProjects, renderTasks } from "./ui.js";
import { Project } from "./model.js";

export class ProjectController {
  constructor(projectList, taskController) {
    this.list = projectList;
    this.taskController = taskController;
    this.activeProjectId = null;

    this.newProjectBtn = document.getElementById("newProjectBtn");
    this.projectPopup = document.getElementById("projectPopup");
    this.newProject = document.getElementById("newProject");
    this.closeProject = document.getElementById("closeProject");
    this.projectForm = document.getElementById("projectForm");

    this.bindEvents();
  }

  bindEvents() {
    if (this.newProjectBtn) {
      this.newProjectBtn.addEventListener("click", () => {
        this.projectPopup.classList.add("open");
        this.projectForm.reset();
      });
    }

    this.closeProject.addEventListener("click", (event) => {
      this.projectPopup.classList.remove("open");
      event.preventDefault();
    });

    this.projectForm.addEventListener("submit", (event) => {
      this.handleProjectSubmit(event);
    });

    document
      .getElementById("project-container")
      .addEventListener("click", (event) => {
        if (event.target.closest(".project-card")) {
          this.handleLastProject(event);
        }
      });
  }

  handleProjectSubmit(event) {
    event.preventDefault();

    const title = document.getElementById("projectTitle").value;
    this.list.addProject(new Project(title));

    const updatedProjects = this.list.getProjects();
    renderProjects(updatedProjects, this.activeProjectId);

    this.projectPopup.classList.remove("open");
    this.projectForm.reset();
  }

  handleLastProject(event) {
    const projectCard = event.target.closest(".project-card");
    const projectId = projectCard.dataset.id;
    const clickedProject = this.list
      .getProjects()
      .find((project) => project.id === projectId);

    this.activeProjectId = projectId;

    const updatedProjects = this.list.getProjects();
    renderProjects(updatedProjects, this.activeProjectId);

    this.taskController.setProject(clickedProject);
    renderTasks(clickedProject.getTasks());
  }
}
