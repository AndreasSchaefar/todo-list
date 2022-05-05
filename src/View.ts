import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { TodoItem } from "./TodoItem";
import { ListControls } from './ListControls';
import { AppContainer } from './AppContainer'

type priority = 'low' | 'medium' | 'high';

type Todo = {
    id?: string;
    complete: boolean;
    text: string;
    priority: priority
    dueDate: string;
}

export default class View {
    mountPoint: HTMLElement;
    todoForm: HTMLFormElement;
    todoList: HTMLUListElement;
    listControls: HTMLDivElement;
    appContainer: HTMLDivElement;

    constructor() {
        this.mountPoint = document.querySelector('#root');
        this.appContainer = AppContainer();
        this.todoForm = TodoForm();
        this.todoList = TodoList();
        this.listControls = ListControls();
        this.appContainer.append(this.todoList, this.listControls);
        this.mountPoint.append(this.todoForm, this.appContainer);
    }

    displayTodos(todos: Array<Todo>) {
        
        while (this.todoList.firstChild) {
            this.todoList.removeChild(this.todoList.firstChild);
        }
        
        todos.forEach(todo => {
            this.todoList.append(TodoItem(todo));
        })

        this.listControls.querySelector('#counter').textContent = `${todos.filter(todo => !todo.complete).length} items left`;
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
                handler(target.parentElement.id);
            }
        })
    }

    bindToggleTodo(handler: Function) {
        this.todoList.addEventListener('click', event => {
            const target = event.target as HTMLInputElement;
            
            if (target.type === 'checkbox') {
                handler(target.parentElement.id);
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
                handler(targetParentId, todoObj);
            })
        });
    }

    bindClearCompleted(handler: Function) {
        this.listControls.addEventListener('click', event => {
            const target = event.target as HTMLElement;
            if (target.className === 'clear') {
                handler();
            }
        })
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