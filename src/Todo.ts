type priority = 'low' | 'medium' | 'high';

export default class Todo {
    complete: boolean;
    text: string;
    priority: priority;
    dueDate: string;
    id?: number;

    constructor(complete: boolean, text: string, priority: priority, dueDate: string) {
        this.complete = complete;
        this.text = text;
        this.priority = priority;
        this.dueDate = dueDate;
    }
}