import Model from './Model';
import View from './View';

type Todo = {
    id?: number;
    complete: boolean;
    text: string;
    priority: 'low' | 'medium' | 'high';
    dueDate: string;
}

export default class Controller {
    view: View;
    model: Model;

    constructor(model: Model, view: View) {
        this.model = model;
        this.view = view;
        this.view.bindDeleteTodo(this.handleDeleteTodo);
        this.view.bindCreateTodo(this.handleCreateTodo);
        this.view.bindToggleTodo(this.handleToggleTodo);
        this.view.bindUpdateTodo(this.handleUpdateTodo);
        this.view.bindClearCompleted(this.handleClearCompleted);
        this.onTodosChange();
    }

    onTodosChange = () => {
        this.view.displayTodos(this.model.todosList);
    }

    handleCreateTodo = (todo: Todo) => {
        this.model.createTodo(todo);
        this.onTodosChange();
    }

    handleDeleteTodo = (id: number) => {
        this.model.deleteTodo(id);
        this.onTodosChange();
    }

    handleToggleTodo = (id: number) => {
        this.model.toggleTodo(id);
        this.onTodosChange();
    }

    handleUpdateTodo = (id: number, todoProps: Todo) => {
        this.model.updateTodo(id, todoProps);
        this.onTodosChange();
    }

    handleClearCompleted = () => {
        this.model.clearCompleted();
        this.onTodosChange();
    }
}