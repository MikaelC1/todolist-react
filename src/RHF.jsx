import { useState } from "react"
import { useForm } from "react-hook-form"
import clsx from "clsx"

export default function App(){
  // Guardar lista de todos
  const [todos, setTodos] = useState([])

  const {
    register, 
    handleSubmit,
    reset, 
    formState: { errors, isValid, isSubmitted},
    } = useForm() 

  function onSubmit(data){
    console.log("data: ", data)
    setTodos([...todos, data.todo])
    reset()
  }

  return(
    <main className="w-full min-h-screen">
            <p className="w-full bg-teal-600 text-black font-bold text-center text-xl py-2">To-do react-hook-form</p>
        <form 
            className="flex gap-2 justify-center p-10" 
            onSubmit={handleSubmit(onSubmit)}
        >
            <input 
            type="text" 
            placeholder="Ingrea una tarea" 
            className={clsx("rounded p-2 text-black w-full max-w-screen-sm", {
              'border-2 border-red-400 bg-red-200': errors.todo
            })}
            required
            {...register("todo", {
                required: { value: true, message: "Campo requerido"  },
                minLength: { value: 3, message: "Minimo 3 caracteres" } ,
                maxLength: { value: 180, message: "Maximo 180 caracteres"}
            })}
        />
        
            <button 
            className={clsx("text-black rounded-xl p-3 bg-gray-400 disabled:bg-red-500", 
              // {
              //   'bg-stone-400': isSubmitted ? !isValid : false,
              //   'bg-gray-400': isSubmitted ? isValid : true
              // }
            )} 
            disabled={isSubmitted ? !isValid : false}>
                + Agregar
            </button>
        </form>

        { errors.todo && (
          <p className="w-full text-red-500 text-center text-bold text-xl ">{errors.todo?.message}</p>
          )}

        <div className="max-w-screen-sm w-full mx-auto flex flex-col gap-2 p-4 items-center   ">
            {todos.length == 0 && <p className="text-4xl text-gray-500">No tienes tareas pendientes 🙅‍♂️</p>}
            {todos.map((todo,index) => {
                return(
                <div key={index} className="flex bg-gray-500 w-full justify-between gap-5 text-black px-2">
                    <span className="flex items-center">{todo}</span>
                    <button className=" rounded-xl p-2 w-40"
                    >- Borrar</button>
                </div>
                )
            })
            }
        </div>
    </main>
  )
}