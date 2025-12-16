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
}

export class Project {
  constructor(title) {
    if (!new.target) {
      throw Error("You must use the 'new operator to call the constructor");
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.#myProject = [];
  }

  #myProject;

  addTask(task) {
    this.#myProject.push(task);
  }

  getTasks() {
    const publicProject = [...this.#myProject];
    return publicProject;
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
