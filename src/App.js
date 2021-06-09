import React,{useState,useEffect} from 'react';
import './App.css';
//import components
import Form from "./components/Form"
import TodoList from "./components/TodoList"
 
function App() {
  let todoLocal=null;
  //default state
  const [input,setInputText] = useState("");
  const [todos,setTodos] = useState([]);
  const [status,setStatus] = useState("all");
  const [filters,setFilters] = useState([]);
  useEffect(()=>{
    document.title = `Todoapp`
    getLocalTodos();
  },[]);
  useEffect(()=>{
    filterHandler();
    saveLocalTodos();
  },[todos,status]); //useeffect runs whenever todos and status change 
  //save to local storage
  const saveLocalTodos = () =>{
    localStorage.setItem("todos",JSON.stringify(todos));
  }
  const getLocalTodos = () =>{
    if(localStorage.getItem("todos")===null)
        localStorage.setItem("todos",JSON.stringify([]));
    else{
        todoLocal = JSON.parse(localStorage.getItem("todos"));
        console.log(todoLocal);
        setTodos(todoLocal);
    }
  }
  
  const filterHandler = () =>{
    switch(status){
      case "completed":
        setFilters(todos.filter(todo=>todo.completed))
        break;
      case "uncompleted":
        setFilters(todos.filter(todo=>!todo.completed))
        break;
      default:
        setFilters(todos);
        break;
    }
  }
  return (
    <div className="App">
      <header>
        <h1>My To-do list</h1>
      </header>
      <Form 
      input={input} 
      todos={todos} 
      setInputText={setInputText} 
      setTodos={setTodos}
      setStatus={setStatus}
      />
      <TodoList 
      todos={todos} 
      setTodos={setTodos}
      filters={filters}
      />
    </div>
  );
}

export default App;
