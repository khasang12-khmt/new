import React from 'react';

const Form = ({setInputText,todos,setTodos,input,setStatus}) =>{
    const inputTextHandler = (e) =>{
        console.log(e.target.value);
        setInputText(e.target.value);
    }
    const submitTodoHandler = (e) =>{
        e.preventDefault();
        setTodos([...todos,{text:input,completed:false,id:Math.random()*2000}]);
        setInputText("");
    }
    const statusHandler = (e) =>{
        setStatus(e.target.value);
    }
    
    return(
        //create select list
        <form>
            <input value={input} type="text" onChange={inputTextHandler} className="todo-input"></input>
            <button className="todo-button" onClick={submitTodoHandler} type="submit">
                <i className="fas fa-plus-square"></i>
            </button>
            <div className="select" onChange={statusHandler}>
                <select name="todos" className="filter-todo">
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="uncompleted">Uncompleted</option>
                </select>
            </div>
        </form>
    )
}

export default Form;