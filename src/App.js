import React, { useState, useRef, useEffect } from 'react';

import { v4 } from 'uuid';

import TodoList from './components/TodoList';

import img from './img/Arrow.png';

import './styles/nullstyle.css';
import './styles/App.css';

const LOCAL_STORAGE_KEY = 'todo-app.key'

function App() {
    const [todos, setTodos] = useState([]);
    const inputRef = useRef();

    useEffect(() => {
        const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedTodos) setTodos(JSON.parse(storedTodos))
    }, [])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    }, [todos])

    function handleAddTodo(e) {
        addTodo()
    }

    function addTodo() {
        const name = inputRef.current.value;
        if (name === '') return;
        setTodos(prevTodos => {
            return [...prevTodos, { id: v4(), name: name, complete: false }]
        });
        inputRef.current.value = null
    }

    function toggleTodo(id) {
        const newTodos = [...todos];
        const todo = newTodos.find(todo => todo.id === id);
        todo.complete = !todo.complete;
        setTodos(newTodos);
    }

    function handleClearTodos(e) {
        e.preventDefault();

        const newTodos = todos.filter(todo => !todo.complete);
        setTodos(newTodos);
    }

    function handleEnter(e) {
        if (e.key === 'Enter') {
            addTodo()
        }
    }

    return (
        <div className='App'>
            <h1 className='title'>Todo</h1>
            <div className='todo-container'>
                <div className='todo-input-wrapper'>
                    <input ref={inputRef} type='text' onKeyUp={handleEnter} className='todo-input' placeholder='Create a new todo...'></input>
                    <button className='todo-button' onClick={handleAddTodo}><img src={img}></img></button>
                </div>
                <TodoList toggleTodo={toggleTodo} todos={todos} />
                <div className='todo-funcs'>
                    <div className='todo-items'>{todos.filter(todo => !todo.complete).length}</div>
                    <button className='todo-clear' onClick={handleClearTodos}>Clear Complete</button>
                </div>
            </div>
        </div>
    );
}

export default App;
