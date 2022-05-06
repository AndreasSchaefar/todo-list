import { stylePriorityMap } from "./TodoItem";
import { format } from 'date-fns';

export function TodoForm(): HTMLFormElement {
    const form = document.createElement('form');
    form.id = 'todo-form';
    const checkboxInput = document.createElement('input');
    const textInput = document.createElement('input');
    const prioritySelect = document.createElement('select');
    const dateInput = document.createElement('input');
    const submitBtn = document.createElement('button');
    const priorities = ['low', 'medium', 'high'];

    checkboxInput.type = 'checkbox';
    checkboxInput.name = 'complete';
    textInput.placeholder = 'Enter description';
    textInput.name = 'text';
    textInput.required = true;
    textInput.type = 'text';
    prioritySelect.name = 'priority';
    dateInput.type = 'date';
    dateInput.name = 'dueDate';
    dateInput.required = true;
    dateInput.defaultValue = format(new Date(), 'yyyy-MM-dd');
    submitBtn.type = 'submit';
    submitBtn.className = 'create';
    
    priorities.forEach(priority => {
        const option = document.createElement('option');
        option.value = priority;
        option.textContent = priority;
        prioritySelect.append(option);
    })

    setPriorityColors();

    prioritySelect.addEventListener('change', setPriorityColors);
    
    form.append(checkboxInput, textInput, prioritySelect, dateInput, submitBtn);

    function setPriorityColors() {
        prioritySelect.className = stylePriorityMap.get(prioritySelect.value);
    }

    return form;
}

