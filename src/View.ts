import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { TodoItem } from "./TodoItem";

type priority = 'low' | 'medium' | 'high';

interface Todo {
    id?: number;
    complete: boolean;
    text: string;
    priority: priority
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
        
        while (this.todoList.firstChild) {
            this.todoList.removeChild(this.todoList.firstChild);
        }
        
        todos.forEach(todo => {
            this.todoList.append(TodoItem(todo));
        })
    }

    bindCreateTodo(handler: Function) {
        this.todoForm.addEventListener('submit', event => {
            event.preventDefault();

            const formData = new FormData(this.todoForm);
            const props = Object.fromEntries(<any>formData);

            if (props) {
                handler({complete: Boolean(props.complete), ...props});
                this.todoForm.reset();
            }
        })
    }

    bindDeleteTodo(handler: Function) {
        this.todoList.addEventListener('click', event => {
            const target = event.target as HTMLElement;
            
            if (target.className === 'delete') {
                handler(parseInt(target.parentElement.id));
            }
        })
    }

    bindToggleTodo(handler: Function) {
        this.todoList.addEventListener('click', event => {
            const target = event.target as HTMLInputElement;
            
            if (target.type === 'checkbox') {
                handler(parseInt(target.parentElement.id));
            }
        })
    }

    bindUpdateTodo(handler: Function) {

        const events = ['change', 'focusout'];

        events.forEach(event => {
            this.todoList.addEventListener(event, e => {
                const target = e.target as HTMLElement;
                const targetParentId = target.parentElement.id;
                const todoObj = View.getProps(e);
                console.log(todoObj);
                handler(parseInt(targetParentId), todoObj);
            })
        });
    }

    private static getProps(event: Event): Todo {
        const target = event.target as HTMLElement;
        const targetParent = target.parentElement;
        
        const text = targetParent.querySelector('span');
        const priority = targetParent.querySelector('select');
        const dueDate = targetParent.querySelector('input[type="date"]') as HTMLInputElement;
        const complete = targetParent.querySelector('input[type="checkbox"]') as HTMLInputElement;
        const props = {
            complete: complete.checked,
            text: text.textContent,
            priority: priority.value as priority,
            dueDate: dueDate.value
        }
        return props;
    }
}