import { state } from './data.js'
import { logger } from '../lib/logger.js'
export class Todo {

    constructor(text, estCycles = 1) {
        this.text = text;
        this.estCycles = estCycles;
        this.isCompleted = false;
    }

    toggleCompleted(event) {
        const position = Number(event.target.dataset.index)
        if (position < 0 || state.todos.length <= position) {
            return;
        }
        const todo = state.todos[position];
        todo.isCompleted = !todo.isCompleted;

        logger.push({
            action: 'toggle complete',
            state,
            event
        })

    }
}