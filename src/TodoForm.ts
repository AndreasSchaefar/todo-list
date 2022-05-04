export function TodoForm(): HTMLFormElement {
    const form = document.createElement('form');
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
    prioritySelect.name = 'priority';
    dateInput.type = 'date';
    dateInput.name = 'dueDate';
    dateInput.required = true;
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Create';
    
    priorities.forEach(priority => {
        const option = document.createElement('option');
        option.value = priority;
        option.textContent = priority;
        prioritySelect.append(option);
    })

    form.append(checkboxInput, textInput, prioritySelect, dateInput, submitBtn);

    return form;
}