import React, { useState, useEffect, useContext, useMemo, useCallback, useRef } from 'react';
import { useTasks } from '../context/TaskContext';
import '../Todo.css';

function TaskManager() {
    const { tasks, dispatch } = useTasks();
    const [taskInput, setTaskInput] = useState('');
    const [filter, setFilter] = useState('All');
    const inputRef = useRef(null);

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (storedTasks) {
            dispatch({ type: 'LOAD_TASKS', payload: storedTasks });
        }
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = useCallback(() => {
        const newTask = {
            id: tasks.length + 1,
            text: taskInput,
            completed: false
        };
        dispatch({ type: 'ADD_TASK', payload: newTask });
        setTaskInput('');
        inputRef.current.focus();
    }, [taskInput, tasks.length, dispatch]);

    const filteredTasks = useMemo(() => {
        switch (filter) {
            case 'Completed':
                return tasks.filter(task => task.completed);
            case 'Pending':
                return tasks.filter(task => !task.completed);
            default:
                return tasks;
        }
    }, [tasks, filter]);

    const toggleTask = useCallback((id) => {
        dispatch({ type: 'TOGGLE_TASK', payload: id });
    }, [dispatch]);

    const removeTask = useCallback((id) => {
        dispatch({ type: 'REMOVE_TASK', payload: id });
    }, [dispatch]);

    return (
        <div className="todo-container">
            <div className="filter-buttons">
                <button onClick={() => setFilter('All')}>All</button>
                <button onClick={() => setFilter('Completed')}>Completed</button>
                <button onClick={() => setFilter('Pending')}>Pending</button>
            </div>
            <div className="tasks">
                {filteredTasks.map(task => (
                    <div key={task.id} className="task">
                        <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                            {task.text}
                        </span>
                        <button onClick={() => toggleTask(task.id)} className="complete-button">Complete</button>
                        <button onClick={() => removeTask(task.id)} className="remove-button">Remove</button>
                    </div>
                ))}
            </div>
            <div className="create-task">
                <input
                    ref={inputRef}
                    type="text"
                    value={taskInput}
                    onChange={e => setTaskInput(e.target.value)}
                    placeholder="Add a new task"
                />
                <button onClick={addTask}>Add Task</button>
            </div>
        </div>
    );
}

export default TaskManager;
