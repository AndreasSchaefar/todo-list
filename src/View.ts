import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { TodoItem } from "./TodoItem";

interface Todo {
    id?: number;
    complete: boolean;
    text: string;
    priority: 'low' | 'medium' | 'high';
    dueDate: string;
}

export default class View {
    mountPoint: HTMLElement;
    todoForm: HTMLFormElement;
    todoList: HTMLUListElement;

    constructor() {
        this.mountPoint = document.querySelector('#root');
        this.todoForm = TodoForm();
        this.todoList = TodoList();

        this.mountPoint.append(this.todoForm, this.todoList);
    }

    displayTodos(todos: Array<Todo>) {
        todos.forEach(todo => {
            this.todoList.append(TodoItem(todo));
        })
    }


}