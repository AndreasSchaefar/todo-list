export function TodoList(): HTMLUListElement {
    const list = document.createElement('ul');
    list.className = 'todo-list';
    return list;
}