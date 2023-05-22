import React,{ useState,useEffect }  from 'react';
import './App.css';
//Importing Components
import MyForm from './components/MyForm';
import TodoList from './components/TodoList';


function App() {

  //State stuff
  const [inputText, setInputText]=useState("");
  const [todos, setTodos]= useState([]);
  const [status, setStatus]= useState('all');
  const [filteredTodos, setFilteredTodos]= useState([]);
    //RUN ONCE when the app start
    useEffect(()=>{
      getLocalTodos();
    },[])
    //Use Effect
    useEffect(() => {
      filterHandler();
    }, [todos, status]);

  //Functions
  const filterHandler = () => {
    switch(status){
      case 'completed' : 
        setFilteredTodos(todos.filter(todo => todo.completed === true))
        break;
      case 'uncompleted' : 
        setFilteredTodos(todos.filter(todo => todo.completed === false))
        break;
      default :
        setFilteredTodos(todos);
        break;
    }
  }

  //Save to Local
  const saveLocalTodos = () => {
      localStorage.setItem('todos',JSON.stringify(todos))
  };
  const getLocalTodos = () => {
    if(localStorage.getItem('todos')===null){
      localStorage.setItem('todos', JSON.stringify([]));
    }else{
     let todoLocal = JSON.parse(localStorage.getItem("todos"))
    setTodos(todoLocal)
    }
  };
  


  return (
    <div className="App">
    <header>
      <h1>Ed's Todo List{inputText}</h1>
    </header>
    <MyForm
    inputText={inputText}
    todos={todos} 
    setTodos={setTodos} 
    setInputText={setInputText}
    setStatus={setStatus}
    
    />
    
    <TodoList 
     filteredTodos={filteredTodos}
     setTodos={setTodos} 
     todos={todos}
     />
    </div>
  );
};

export default App;


