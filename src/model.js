export class Task {
  constructor(title, description, date, priority, done) {
    if (!new.target) {
      throw Error("You must use the 'new operator to call the constructor");
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.date = date;
    this.priority = priority;
    this.done = done;
  }

  changePriority() {
    const priorities = ["Low", "Medium", "High"];
    const currentIndex = priorities.indexOf(this.priority);
    const nextIndex = (currentIndex + 1) % priorities.length;
    this.priority = priorities[nextIndex];
  }
}

export class Project {
  constructor(title) {
    if (!new.target) {
      throw Error("You must use the 'new operator to call the constructor");
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.#myProject = [];
    this.tasks = [];
  }

  #myProject;

  addTask(task) {
    this.#myProject.push(task);
  }

  getTasks() {
    const publicProject = [...this.#myProject];
    return publicProject;
  }

  deleteTask(id) {
    const index = this.#myProject.findIndex((task) => task.id === id);
    if (index !== -1) {
      this.#myProject.splice(index, 1);
      return true;
    }
    return false;
  }

  changePriority(taskId) {
    const task = this.#myProject.find((task) => task.id === taskId);
    if (task) {
      task.changePriority();
      return true;
    }
    return false;
  }
}

export class projectList {
  constructor() {
    this.#myList = [];
  }

  #myList;

  addProject(project) {
    this.#myList.push(project);
  }

  getProjects() {
    const publicList = [...this.#myList];
    return publicList;
  }
}
