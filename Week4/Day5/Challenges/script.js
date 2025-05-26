const tasks = [];

const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const listTasksDiv = document.querySelector(".listTasks");
const clearAllBtn = document.getElementById("clearAllBtn");

// Listen for form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTask();
});

// Add new task
function addTask() {
  const taskText = input.value.trim();
  if (taskText === "") return; // do nothing if empty

  // Create new task object
  const task_id = tasks.length ? tasks[tasks.length - 1].task_id + 1 : 0;
  const taskObj = {
    task_id,
    text: taskText,
    done: false,
  };

  // Add to tasks array and render
  tasks.push(taskObj);
  renderTask(taskObj);

  input.value = "";
  input.focus();
}

// Render a single task in DOM
function renderTask(task) {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("taskItem");
  taskDiv.dataset.taskId = task.task_id;

  // Checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = `task-${task.task_id}`;
  checkbox.checked = task.done;

  // Label
  const label = document.createElement("label");
  label.htmlFor = `task-${task.task_id}`;
  label.textContent = task.text;
  if (task.done) label.classList.add("done");

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("deleteBtn");
  deleteBtn.setAttribute("aria-label", "Delete task");
  deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

  // Append children
  taskDiv.appendChild(checkbox);
  taskDiv.appendChild(label);
  taskDiv.appendChild(deleteBtn);
  listTasksDiv.appendChild(taskDiv);

  // Event listeners
  checkbox.addEventListener("change", () => doneTask(task.task_id, checkbox, label));
  deleteBtn.addEventListener("click", () => deleteTask(task.task_id, taskDiv));
}

// Toggle done state
function doneTask(task_id, checkboxElem, labelElem) {
  const task = tasks.find((t) => t.task_id === task_id);
  if (!task) return;

  task.done = checkboxElem.checked;
  if (task.done) {
    labelElem.classList.add("done");
  } else {
    labelElem.classList.remove("done");
  }
}

// Delete task from array and DOM
function deleteTask(task_id, taskDivElem) {
  const index = tasks.findIndex((t) => t.task_id === task_id);
  if (index !== -1) {
    tasks.splice(index, 1);
  }
  taskDivElem.remove();
}

// Clear all tasks button
clearAllBtn.addEventListener("click", () => {
  tasks.length = 0; // clear array
  listTasksDiv.innerHTML = ""; // clear DOM
  input.focus();
});
