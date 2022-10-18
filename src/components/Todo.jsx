import React from 'react'

function Todo({ todo, toggleTodo }) {
    function handleTodoClick(){
        toggleTodo(todo.id)
    }

    return (
        <div className='todo-item'>
            <label>
                <input className='checkbox' type="checkbox" checked={todo.complete} onChange={handleTodoClick} />
                <p className='todo-name'>{todo.name}</p>
            </label>
        </div>
    )
}

export default Todo