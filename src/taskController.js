import { renderTasks } from "./ui";
import { Task } from "./model";

export class TaskController {
  constructor(project) {
    this.project = project;

    this.openBtn = document.getElementById("openBtn");
    this.newTask = document.getElementById("newTask");
    this.popup = document.getElementById("popup");
    this.closeTask = document.getElementById("closeTask");
    this.taskForm = document.getElementById("taskForm");

    this.bindEvents();
  }

  setProject(newProject) {
    this.project = newProject;
  }

  bindEvents() {
    if (this.openBtn) {
      this.openBtn.addEventListener("click", () => {
        this.popup.classList.add("open");
        this.taskForm.reset();
      });
    }

    this.closeTask.addEventListener("click", (event) => {
      this.popup.classList.remove("open");
      event.preventDefault();
    });

    this.taskForm.addEventListener("submit", (event) => {
      this.handleTaskSubmit(event);
    });

    document
      .getElementById("todo-container")
      .addEventListener("click", (event) => {
        if (event.target.matches(".trash-icon")) {
          this.handleTaskDelete(event);
        }
      });

    document
      .getElementById("todo-container")
      .addEventListener("click", (event) => {
        if (event.target.matches(".task-priority")) {
          this.handlePriority(event);
        }
      });
  }

  handleTaskSubmit(event) {
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
  }

  handleTaskDelete(event) {
    const taskCard = event.target.closest(".task-card");
    const taskId = taskCard.dataset.id;

    this.project.deleteTask(taskId);
    const updatedTasks = this.project.getTasks();
    renderTasks(updatedTasks);
  }

  handlePriority(event) {
    const taskCard = event.target.closest(".task-card");
    const taskId = taskCard.dataset.id;

    this.project.changePriority(taskId);
    renderTasks(this.project.getTasks());
  }
}
