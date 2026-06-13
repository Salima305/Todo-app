import { useState } from "react";

const App = () => {
  const [newTodo, setNewTodo]=useState('')
  const [todos, setTodos]=useState([
    {id:1,text:'Learn React',completed:false},
    {id:2,text:'Build Todo App',completed:false},
    {id:3,text:'Deploy to Vercel',completed:false}
  ])
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
 return (
  <div className="max-w-md mx-auto mt-10  rounded-lg shadow-md overflow-hidden">
    <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6">
    <h1 className="text-3xl font-bold text-center text-white">Todo App</h1>
</div>
    <div className="bg-white p-6">
      <div className="flex gap-2">
      <input 
        value={newTodo} 
        onChange={(e) => setNewTodo(e.target.value)} 
        placeholder="Add a todo..."
        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button 
        onClick={addTodo}
        className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
      >
        Add
      </button>
    </div>
</div>
    <div className="space-y-3">
      {todos.map((todo) => (
        <div key={todo.id} className={`flex items-center justify-between bg-gray-50 p-3 rounded-lg ${todo.completed?'bg-green-100' :'bg-gray-50'} `}>
          <div className="flex items-center gap-3">
            <input 
              type="checkbox" 
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
              className="w-5 h-5"
            />
            <p style={{ textDecoration: todo.completed ? 'line-through' : 'none' }} className="text-gray-700">
              {todo.text}
            </p>
          </div>
          <button 
            onClick={() => deleteTodo(todo.id)}
            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 text-sm"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  </div>
)
}

export default App