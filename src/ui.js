export function renderTasks(tasks) {
  const container = document.getElementById("todo-container");
  if (!container) return;

  container.innerHTML = "";

  tasks.forEach((task) => {
    const taskCard = document.createElement("div");
    taskCard.className = "task-card";
    taskCard.dataset.id = task.id;

    const taskTitle = document.createElement("h3");
    taskTitle.className = "task-title";
    taskTitle.textContent = task.title;
    taskCard.appendChild(taskTitle);

    const taskDescription = document.createElement("p");
    taskDescription.className = "task-description";
    taskDescription.textContent = task.description;
    taskCard.appendChild(taskDescription);

    const taskDetails = document.createElement("p");
    taskDetails.className = "task-details";
    taskDetails.textContent = `Due: ${task.date} || Priority: ${task.priority}`;
    taskCard.appendChild(taskDetails);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    taskCard.appendChild(checkbox);

    container.appendChild(taskCard);
  });
}
