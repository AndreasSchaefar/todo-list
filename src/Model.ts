interface Todo {
    id?: number;
    complete: boolean;
    text: string;
    priority: 'low' | 'medium' | 'high';
    dueDate: string;
}

export default class Model {
    todosList: Array<Todo>
    
    constructor() {
        this.todosList = [];
    }

    public createTodo(todo: Todo) {
        this.todosList.push({id: this.assignTodoId(), ...todo})
    }

    public updateTodo(id: number, todoProps: Todo) {
        this.todosList = this.todosList.map(todo => {
            todo = todo.id === id ? {id: id, ...todoProps} : todo;
            return todo;
        })
    }

    public deleteTodo(id: number) {
        this.todosList = this.todosList.filter(todo => {
            todo.id !== id;
        })
    }

    public toggleTodo(id: number) {
        
    }


    private assignTodoId() {
        if (this.todosList.length === 0) {
            return 1;
        }
        return this.todosList.length + 1;
    }
}