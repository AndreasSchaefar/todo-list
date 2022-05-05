export function ListControls(): HTMLDivElement {
    const container = document.createElement('div');
    container.className = 'list-controls';
    const span = document.createElement('span');
    span.id = 'counter';
    const clearBtn = document.createElement('button');
    clearBtn.className = 'clear';
    clearBtn.textContent = 'Clear completed todos';  
    container.append(span, clearBtn);

    return container;
}