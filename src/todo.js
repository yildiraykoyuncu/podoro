const state = {
    todos: []
}

export class Todo {

    constructor(text, estCycles = 1) {
        this.text = text;
        this.estCycles = estCycles;
        this.isCompleted = false;
    }

    static addTodoHandler(event) {
        if (event.key !== 'Enter') return;
        const text = event.target.value
        const todo = new Todo(text);
        state.todos.push(todo)

        console.log(state.todos)

        Todo.render();
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

        //quick input

        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.id = 'inputField';
        todoDiv.appendChild(inputField)
        inputField.addEventListener('keyup', this.addTodoHandler.bind(this))

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

        userInt.appendChild(renderedTodos);




    }
}