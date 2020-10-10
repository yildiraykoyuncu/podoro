const state = {
    todos: []
}

export class Todo {

    constructor(text, estCycles = 1) {
        this.text = text;
        this.estCycles = estCycles;
        this.isCompleted = false;
    }

    static addTodoScreenCall(event) {

        //call add todo screen
        Todo.renderAddTodoWindow();
    }

    static addTodoHandler(event) {

        if (event.target.id === 'saveBtn') {
            const text = document.getElementById('inputField').value;
            const estCycles = document.getElementById('inputNumber').value;
            const todo = new Todo(text, estCycles);
            state.todos.push(todo)

            console.log(state.todos)

            Todo.render();
        } else if (event.target.id === 'cancelBtn') {
            Todo.render();
        }


    }

    static render() {
        const userInt = document.getElementById('todo')
        userInt.innerHTML = '';

        //todo container
        const todoDiv = document.createElement('div');
        todoDiv.id = 'todoContainer';
        todoDiv.classList.add('container');

        //header
        const headerDiv = document.createElement('div');
        headerDiv.id = 'header div';

        const header = document.createElement('h1');
        header.textContent = 'Tasks';

        const optionBtn = document.createElement('button');
        optionBtn.type = 'button';
        optionBtn.id = 'todoOptionBtn';
        optionBtn.textContent = '...';

        headerDiv.appendChild(header);
        headerDiv.appendChild(optionBtn);

        todoDiv.appendChild(headerDiv);


        userInt.appendChild(todoDiv)


        //add todo button

        const addTodoBtn = document.createElement('button');
        addTodoBtn.type = 'button';
        addTodoBtn.id = 'addTodoBtn'
        addTodoBtn.innerText = 'Add Task'
        console.log(addTodoBtn)
        userInt.appendChild(addTodoBtn)
        addTodoBtn.addEventListener('click', this.addTodoScreenCall.bind(this))

        //todos


        if (state.todos.length === 0) { return }

        const renderedTodos = state.todos.map(todo => {
            const li = document.createElement('li');
            li.classList.add('todoItem');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';

            const body = document.createElement('span');
            body.textContent = todo.text;

            li.appendChild(checkbox);
            li.appendChild(body);
            return li;

        }).reduce((all, next) => {
            all.appendChild(next);
            return all;
        }, document.createElement('ul'))

        console.log(renderedTodos)

        userInt.insertBefore(renderedTodos, addTodoBtn);




    }

    static renderAddTodoWindow() {
        //Add todo screen

        const addTodoDiv = document.createElement('div');

        // input field

        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.id = 'inputField';
        inputField.placeholder = 'what are you working on?'
        addTodoDiv.appendChild(inputField)


        // Number of estimated pomodoros
        const title = document.createElement('h3');
        title.textContent = 'Est Pomodoros'
        addTodoDiv.appendChild(title);

        const estPomodoros = document.createElement('input');
        estPomodoros.type = 'number';
        estPomodoros.min = '0';
        estPomodoros.step = '1';
        estPomodoros.value = '1';
        estPomodoros.id = 'inputNumber'
        addTodoDiv.appendChild(estPomodoros);

        // save and cancel buttons

        const confirmDiv = document.createElement('div');
        confirmDiv.id = 'confirmationDiv';

        const cancelBtn = document.createElement('button');
        cancelBtn.type = 'button';
        cancelBtn.id = 'cancelBtn';
        cancelBtn.textContent = 'Cancel'

        const saveBtn = document.createElement('button');
        saveBtn.type = 'button';
        saveBtn.id = 'saveBtn';
        saveBtn.textContent = 'Save'

        confirmDiv.appendChild(cancelBtn);
        confirmDiv.appendChild(saveBtn);

        addTodoDiv.appendChild(confirmDiv);

        const addTodoBtn = document.getElementById('addTodoBtn');
        addTodoBtn.parentElement.insertBefore(addTodoDiv, addTodoBtn)
        document.getElementById('todo').removeChild(addTodoBtn);
        addTodoDiv.addEventListener('click', this.addTodoHandler.bind(this))
    }
}