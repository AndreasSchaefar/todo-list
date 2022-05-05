type Todo = {
    id?: string;
    complete: boolean;
    text: string;
    priority: 'low' | 'medium' | 'high';
    dueDate: string;
}

export default class Model {
    todosList: Array<Todo>;
    
    constructor() {
        this.todosList = JSON.parse(localStorage.getItem('todosList')) || [];
    }

    public createTodo(todo: Todo) {
        this.todosList.push({id: this.assignTodoId(), ...todo});
        this.commit(this.todosList);
    }

    public updateTodo(id: string, todoProps: Todo) {
        this.todosList = this.todosList.map(todo => {
            todo = todo.id === id ? {id: id, ...todoProps} : todo;
            return todo;
        })
        this.commit(this.todosList);
    }

    public deleteTodo(id: string) {
        this.todosList = this.todosList.filter(todo => todo.id !== id);
        this.commit(this.todosList);
    }

    public toggleTodo(id: string) {
        this.todosList = this.todosList.map(todo => todo.id === id ? {...todo, complete: !todo.complete} : todo);
        this.commit(this.todosList);
    }

    public clearCompleted() {
        this.todosList = this.todosList.filter(todo => !todo.complete);
        this.commit(this.todosList);
    }


    private assignTodoId() {
        return "id" + Math.random().toString(16).slice(2);
    }

    private commit(todosList: Array<Object>) {
        localStorage.setItem('todosList', JSON.stringify(todosList));
    }
}