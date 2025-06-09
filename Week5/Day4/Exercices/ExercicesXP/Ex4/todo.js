export class TodoList {
  constructor() {
    this.tasks = [];
  }

  add(task) {
    this.tasks.push({ task, completed: false });
  }

  complete(index) {
    if (this.tasks[index]) this.tasks[index].completed = true;
  }

  list() {
    return this.tasks.map((t, i) => `${i + 1}. ${t.task} - ${t.completed ? '✅' : '❌'}`).join('\n');
  }
}
