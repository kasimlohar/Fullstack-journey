import { useState } from "react";
import {v4 as uuidv4 } from "uuid";

export default function TodoList() {
    let [ todos, setTodos] = useState([{task: "Sample-task", id: uuidv4()}]);
    let [ newTodo, setNewTodo] = useState("");

    let addNewTask = () => {
        setTodos((prevTodos) => {
            return [...prevTodos, {task: newTodo, id: uuidv4()}]
        })
        setNewTodo("")
    };

    let updateTodoVal = (event) => {
        setNewTodo(event.target.value);
    }
    let deleteTodo = (id) => {
        setTodos((prevTodos) => todos.filter((prevTodos) => prevTodos.id != id));
        console.log(copy)
    }

    let toUpperCaseAll = () => {
        setTodos((prevTodos) => 
            prevTodos.map((todo) => {
            return { 
                ...todo,
                task: todo.task.toUpperCase()
                };
            })
        )
    }

    let toUpperCaseOne = (id) => {
        setTodos((prevTodos) => 
            prevTodos.map((todo) => {
                if (todo.id === id) {
                    return { 
                        ...todo,
                        task: todo.task.toUpperCase()
                        };
                } else {
                    return todo;
                }
            })
        )
    }
    
    return (
        <div>
            <input placeholder="Add a task" value={newTodo} onChange={updateTodoVal}></input>
            <br />
            <button onClick={addNewTask}>Add Task</button>
            <br /><br /><br /><br />
            <hr />
            <h4>Task Todo</h4>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <span>{todo.task}</span>
                        &nbsp;&nbsp;&nbsp;
                        <button onClick={() => deleteTodo(todo.id)}>delete</button>
                        <button onClick={() => toUpperCaseOne(todo.id)}>Upper Case One</button>
                    </li>

                ))}
            </ul>
            <button onClick={toUpperCaseAll}>UpperCase</button>
        </div>
    );
}