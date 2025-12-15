export function renderTasks(tasks) {
  const container = document.getElementById("todo-container");
  if (!container) return;

  container.innerHTML = "";

  tasks.forEach((task) => {
    const taskCard = document.createElement("div");
    taskCard.className = "task-card";
    taskCard.dataset.id = task.id;

    const contentWrapper = document.createElement("div");
    contentWrapper.className = "task-card-content";

    const taskTitle = document.createElement("h3");
    taskTitle.className = "task-title";
    taskTitle.textContent = task.title;
    contentWrapper.appendChild(taskTitle);

    const taskDescription = document.createElement("p");
    taskDescription.className = "task-description";
    taskDescription.textContent = task.description;
    contentWrapper.appendChild(taskDescription);

    const taskDetails = document.createElement("p");
    taskDetails.className = "task-details";
    taskDetails.textContent = `Due: ${task.date} || Priority: ${task.priority}`;
    contentWrapper.appendChild(taskDetails);

    taskCard.appendChild(contentWrapper);

    const checkboxWrapper = document.createElement("div");
    checkboxWrapper.className = "task-checkbox-wrapper";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.className = "task-checkbox";

    checkboxWrapper.appendChild(checkbox);
    taskCard.appendChild(checkboxWrapper);

    container.appendChild(taskCard);
  });
}
