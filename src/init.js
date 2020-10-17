'use strict';

import { timer } from "./timer.js"
import { Todo } from './todo.js'
import { List } from './List.js'
import { data } from './data.js'

const todoList = new List(data, Todo)


timer.render()
todoList.render()