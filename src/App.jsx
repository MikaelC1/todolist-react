import { useState } from "react"


export default function App(){
  // Guardar lista de todos
  const [todos, setTodos] = useState([])
  const [text,setText] = useState("")

  function addTodo() {
    setTodos([...todos,text])
  }

  function onSubmit(e){
    e.preventDefault();
    addTodo()
    setText("")
  }

  function removeTask(indexToRemove){
    const newTodos = todos.filter((todos, index) => index != indexToRemove)
    setTodos(newTodos)
  }
  
  return(
    <main className="w-full min-h-screen">
      <form 
        className="flex gap-2 justify-center p-10" 
        onSubmit={onSubmit}
      >
        <input 
          type="text" 
          placeholder="Ingrea una tarea" 
          className="rounded p-2 text-black w-full max-w-screen-sm"
          value= {text} 
          onChange = {(e) => setText(e.target.value)}
          required
      />
        <button 
          className="bg-gray-400 text-black rounded-xl p-3">
            + Agregar
        </button>
      </form>

      <div className="max-w-screen-sm w-full mx-auto flex flex-col gap-2 p-4 items-center   ">
        {todos.length == 0 && <p className="text-4xl text-gray-500">No tienes tareas pendientes 🙅‍♂️</p>}
        {todos.map((todo,index) => {
            return(
              <div key={index} className="flex bg-gray-500 w-full justify-between gap-5 text-black px-2">
                <span className="flex items-center">{todo}</span>
                <button className=" rounded-xl p-2 w-40"
                onClick={() => removeTask(index)}
                >- Borrar</button>
              </div>
            )
          })
        }
      </div>
    </main>
  )
}