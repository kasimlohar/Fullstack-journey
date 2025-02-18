import { useState } from 'react'
import './App.css'
import Form from "./Form"
import CommentsForm from './CommentsForm'
import Comment from './Comment'
import Counter from "./Counter"
import Joker from './Joker'
import TodoList from './TodoList'
import Lottery from './Lottery'
import LudoBoard from './LudoBoard'

function App() {
    const [activeComponent, setActiveComponent] = useState('todoList');
    
    const components = {
        todoList: <TodoList />,
        comments: <Comment />,
        form: <Form />,
        counter: <Counter />,
        joker: <Joker />,
        lottery: <Lottery winCondition={(ticket) => ticket.reduce((sum, num) => sum + num, 0) > 15} />,
        ludoBoard: <LudoBoard />
    };

    return (
        <div className="app-container">
            <nav className="component-nav">
                {Object.keys(components).map(key => (
                    <button 
                        key={key}
                        onClick={() => setActiveComponent(key)}
                        className={`nav-button ${activeComponent === key ? 'active' : ''}`}
                    >
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                    </button>
                ))}
            </nav>
            <main className="component-display">
                {components[activeComponent]}
            </main>
        </div>
    );
}

export default App;
