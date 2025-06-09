import { TodoList } from './todo.js';

const list = new TodoList();
list.add('Learn Node.js');
list.add('Build a project');
list.complete(0);
console.log(list.list());
