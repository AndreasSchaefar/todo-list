interface Todo {
    id?: string;
    complete: boolean;
    text: string;
    priority: 'low' | 'medium' | 'high';
    dueDate: string;
}

export const stylePriorityMap = new Map(Object.entries({low: 'alert-moderate', medium: 'alert-warning', high: 'alert-danger'}));

export function TodoItem(todo: Todo): HTMLLIElement {
    const li = document.createElement('li');
    li.id = todo.id.toString();

    const checkboxInput = document.createElement('input');
    const textSpan = document.createElement('span');
    const prioritySelect = document.createElement('select');
    const dateInput = document.createElement('input');
    const deleteBtn = document.createElement('button');
    const priorities = ['low', 'medium', 'high'];

    checkboxInput.type = 'checkbox';
    checkboxInput.name = 'complete';
    checkboxInput.checked = todo.complete;
    
    prioritySelect.name = 'priority';
    dateInput.type = 'date';
    dateInput.name = 'dueDate';
    dateInput.value = todo.dueDate;

    textSpan.contentEditable = 'true';
    textSpan.spellcheck = false;

    if (todo.complete) {
        const s = document.createElement('s');
        s.textContent = todo.text;
        textSpan.append(s);
    } else {
        textSpan.textContent = todo.text;
    }

    deleteBtn.className = 'delete';
    
    priorities.forEach(priority => {
        const option = document.createElement('option');
        option.value = priority;
        option.textContent = priority;
        option.selected = priority === todo.priority;
        prioritySelect.append(option);
    });

    prioritySelect.className = stylePriorityMap.get(prioritySelect.value);

    li.append(checkboxInput, textSpan, prioritySelect, dateInput, deleteBtn);

    return li;
}