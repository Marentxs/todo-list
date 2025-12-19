const STORAGE_KEY = "projects";

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

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      tasks: this.#myProject.map((task) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        date: task.date,
        priority: task.priority,
        done: task.done,
      })),
    };
  }

  static fromJSON(data) {
    const project = new Project(data.title);
    project.id = data.id;

    if (data.tasks && Array.isArray(data.tasks)) {
      data.tasks.forEach((taskData) => {
        const task = new Task(
          taskData.title,
          taskData.description,
          taskData.date,
          taskData.priority,
          taskData.done
        );
        task.id = taskData.id;
        project.#myProject.push(task);
      });
    }
    return project;
  }
}

export class projectList {
  constructor() {
    this.#myList = [];
    this.loadFromStorage();
  }

  #myList;

  addProject(project) {
    this.#myList.push(project);
    this.saveToStorage();
    return project;
  }

  getProjects() {
    const publicList = [...this.#myList];
    return publicList;
  }

  getProjectById(id) {
    return this.#myList.find((project) => project.id === id);
  }

  saveToStorage() {
    try {
      const data = this.#myList.map((project) => project.toJSON());
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.log("error saving to localStorage");
    }
  }

  loadFromStorage() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsedData = JSON.parse(data);
        this.#myList = parsedData.map((projectData) =>
          Project.fromJSON(projectData)
        );
      }
    } catch (error) {
      console.log("error loading from localStorage");
    }
  }

  clearStorage() {
    localStorage.removeItem(STORAGE_KEY);
    this.#myList = [];
  }
}
