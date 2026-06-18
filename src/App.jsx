import { useState,useEffect } from "react";
import { useContext } from "react";
import { ThemeContext } from "./themeContext";

const App = () => {
  const [newTodo, setNewTodo]=useState('')
  const [todos, setTodos]=useState(()=>{
    const saved = localStorage.getItem("todos")
    return saved ?JSON.parse(saved):[]
  })
const{theme,setTheme}=useContext(ThemeContext)
  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])

const[searchTerm,setSearchTerm]=useState('')
const[sortType,setSortType]= useState('none')
const[editingId,setEditingId]=useState(null)
const[editText,setEditText]=useState('')

const filteredTodos=todos.filter(todo=>todo.text.toLowerCase().includes(searchTerm.toLowerCase()))

let sortedTodos=[...filteredTodos]
if (sortType==="a-z") {
  sortedTodos=filteredTodos.sort((a,b)=>a.text.localeCompare(b.text))
} else if(sortType==="z-a"){
  sortedTodos=filteredTodos.sort((a,b)=>b.text.localeCompare(a.text))
}else if(sortType==="completed"){
  sortedTodos=filteredTodos.sort((a,b)=>b.completed-a.completed)
}

const addTodo=()=>{
  if(newTodo.trim()==='') return
  setTodos([...todos,{
    id:todos.length+1,text:newTodo,completed:false
  }])
  setNewTodo('')
}


  const deleteTodo=(id)=>{
    setTodos(todos.filter((todo)=>todo.id!==id))
  }

  const toggleComplete=(id)=>{
    setTodos(todos.map((todo)=>
      todo.id===id? {...todo,completed:!todo.completed}: todo
    ))
  }
  const hour= new Date().getHours()
  let greeting=""

  if (hour<12) {
   greeting = "Good Morning"
  } else if (hour<18) {
    greeting = "Good Afternoon"
  } else {
    greeting = "Good Evening"
  }
 return (
  <div className={`max-w-md mx-auto mt-10 rounded-lg shadow-md overflow-hidden ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white"}`}>
    <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6">
    <h1 className="text-3xl font-bold text-center text-white">Todo App</h1>
    <h2 className="text-center">{greeting} Salima</h2>
    <button 
  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
  className="mt-2 px-4 py-1 rounded-lg bg-white text-indigo-600 text-sm font-medium"
>
  {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
</button>
</div>
    <div className={`p-6 ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
      <div className="flex gap-2">
      <input 
        value={newTodo} 
        onChange={(e) => setNewTodo(e.target.value)} 
        placeholder="Add a todo..."
        className={`flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600 ${theme === "dark" ? "bg-gray-800 text-white border-gray-600" : "border-gray-300"}`}
        />
      <button 
        onClick={addTodo}
        className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
      >
        Add
      </button>
      </div>
      <input value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} placeholder="Search todos..." className={`w-full border rounded-lg px-3 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${theme === "dark" ? "bg-gray-800 text-white border-gray-600" : "border-gray-300"}`}/>
      <select value={sortType} onChange={(e)=>setSortType(e.target.value)}  className={`w-full border border-gray-300 rounded-lg px-3 py-2 mt-2 ${theme === "dark" ? "bg-gray-800 text-white border-gray-600" : "bg-white text-gray-700"}`}>
        <option value="none">Sort By</option>
        <option value="a-z">A-Z</option>
        <option value="z-a">Z-A</option>
        <option value="completed">Completed First</option>
      </select>
</div>
    <div className={`space-y-3 p-3 ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
      {sortedTodos.map((todo) => (
        <div key={todo.id} className={`flex items-center justify-between bg-gray-50 p-3 rounded-lg ${todo.completed?'bg-green-100' :'bg-gray-50'} `}>
         {todo.id===editingId?(
          <div className="flex items-center gap-2 w-full" >
            <input value={editText} onChange={(e)=>setEditText(e.target.value)} className={`flex-1 border rounded-lg px-3 py-1 ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "border-gray-300"}`}/>
            <button onClick={()=>{
              setTodos(todos.map(t=>t.id===editingId?{...t,text:editText}:t))
              setEditingId(null)
            }}
           className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm" >Save</button>
            </div>
         ):(
          <>
          <div className="flex items-center gap-3">
            <input type="checkbox" checked={todo.completed} onChange={()=>toggleComplete(todo.id)}
            className="w-5 h-5"
            />
            <p style={{ textDecoration: todo.completed ? 'line-through' : 'none' }} className="text-gray-700">
            {todo.text}
          </p>
        </div>
         <div className="flex gap-2">
          <button 
            onClick={() => {
              setEditingId(todo.id)
              setEditText(todo.text)
            }}
            className="bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm"
          >
            Edit
          </button>
          <button 
            onClick={() => deleteTodo(todo.id)}
            className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm"
          >
            Delete
          </button>
        </div>
        </>
        )}
     </div>
    ))}
  </div>
  </div>
)
}



export default App