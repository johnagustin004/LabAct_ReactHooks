import React from 'react';
import TaskManager from './components/TaskManager';
import { TaskProvider } from './context/TaskContext';
import './Todo.css';

function App() {
    return (
        <TaskProvider>
            <div className="todo-container">
                <TaskManager />
            </div>
        </TaskProvider>
    );
}

export default App;
