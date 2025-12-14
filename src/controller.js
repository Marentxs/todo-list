import { renderTasks } from "./ui.js";
import { Task } from "./model.js";

export class PopupController {
  constructor(project) {
    this.project = project;
    this.openBtn = document.getElementById("openBtn");
    this.newTask = document.getElementById("newTask");
    this.popup = document.getElementById("popup");
    this.close = document.getElementById("close");
    this.form = document.getElementById("taskForm");

    if (this.openBtn) {
      this.openBtn.addEventListener("click", () => {
        this.popup.classList.add("open");
        this.form.reset();
      });
    }

    this.close.addEventListener("click", (event) => {
      this.popup.classList.remove("open");
      event.preventDefault();
    });

    this.form.addEventListener("submit", (event) => {
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
      this.form.reset();
    });
  }
}
