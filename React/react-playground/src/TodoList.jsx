import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./TodoList.css";

export default function TodoList() {
    // Initialize states with meaningful defaults
    const [todos, setTodos] = useState([{
        task: "Sample-task", 
        id: uuidv4(), 
        isDone: false
    }]);
    const [newTodo, setNewTodo] = useState("");

    // Handler functions
    const addNewTask = () => {
        if (!newTodo.trim()) return; // Prevent empty tasks
        setTodos(prevTodos => [
            ...prevTodos, 
            {task: newTodo.trim(), id: uuidv4(), isDone: false}
        ]);
        setNewTodo("");
    };

    // Event handlers
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            addNewTask();
        }
    };

    const deleteTodo = (id) => {
        setTodos((prevTodos) => todos.filter((prevTodos) => prevTodos.id != id));
        console.log(copy)
    }

    const markAsDoneAll = () => {
        setTodos((prevTodos) => 
            prevTodos.map((todo) => {
            return { 
                ...todo,
                isDone: true,
                };
            })
        )
    }

    const markAsDone = (id) => {
        setTodos((prevTodos) => 
            prevTodos.map((todo) => {
                if (todo.id === id) {
                    return { 
                        ...todo,
                        isDone: true,
                        };
                } else {
                    return todo;
                }
            })
        )
    }
    
    return (
        <div className="todo-container">
            <h2>Task Manager</h2>
            <div className="todo-input">
                <input 
                    className="todo-input-field"
                    placeholder="Add a task" 
                    value={newTodo} 
                    onChange={(e) => setNewTodo(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button 
                    className="add-button"
                    onClick={addNewTask}
                    disabled={!newTodo.trim()}
                >
                    Add Task
                </button>
            </div>

            <div className="todo-list">
                <h4>Tasks ({todos.length})</h4>
                <ul className="task-list">
                    {todos.map((todo) => (
                        <li key={todo.id} className={`todo-item ${todo.isDone ? 'done' : ''}`}>
                            <span className="task-text" style={todo.isDone ? {textDecorationLine: "line-through"} : {}}>
                                {todo.task}
                            </span>
                            <div className="button-group">
                                <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>Delete</button>
                                <button className="done-btn" onClick={() => markAsDone(todo.id)}>
                                    {todo.isDone ? 'Done' : 'Mark Done'}
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                {todos.length > 1 && (
                    <button className="mark-all-btn" onClick={markAsDoneAll}>
                        Mark all as done
                    </button>
                )}
            </div>
        </div>
    );
}