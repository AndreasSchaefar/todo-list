import Model from './Model';
import View from './View';

interface Todo {
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


        this.onTodosChange();
    }

    onTodosChange = () => {
        this.view.displayTodos(this.model.todosList);
    }

    handleCreateTodo(todo: Todo) {
        this.model.createTodo(todo);
    }

    handleDeleteTodo(id: number) {
        this.model.deleteTodo(id);
    }

    handleUpdateTodo(id: number, todoProps: Todo) {
        this.model.updateTodo(id, todoProps);
    }
}