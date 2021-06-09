import React from 'react';
import Todo from './Todo'
const TodoList = ({todos,setTodos,filters}) =>{    
    return (
        <div className="todo-container">
            <ul className="todo-list">
                {filters.map(todo=>(
                    <Todo 
                    text={todo.text} 
                    key={todo.id}
                    todos={todos}
                    todo={todo}
                    setTodos={setTodos}
                    />
                ))}
            </ul>
        </div>
    )
}
export default TodoList;