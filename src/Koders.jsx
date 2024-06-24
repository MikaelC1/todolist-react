import { useState } from "react"
import { useForm } from "react-hook-form"
import clsx from "clsx"

export default function App(){
  // Guardar lista de todos
    const [koders, setKoders] = useState([])

    const {
        register, 
        handleSubmit,
        reset, 
        formState: { errors, isValid, isSubmitted},
    } = useForm() 

    function onSubmit(data){
        console.log("data: ", data)
        setKoders( [...koders, {name: data.name, lastName: data.lastName, email: data.email}] )
        reset()
    }

    function deleteKoder(index) {
        const newKoders = koders.filter((koder, i) => i !== index);
        setKoders(newKoders);
    }


    return(
        <main className="w-full min-h-screen">
                <p className="w-full bg-teal-600 text-black font-bold text-center text-xl py-2">Koders react-hook-form</p>
            <form 
                className="flex gap-2 justify-center p-10" 
                onSubmit={handleSubmit(onSubmit)}
            >
                <input 
                    type="text" 
                    placeholder="Ingrea tu nombre" 
                    className={clsx("rounded p-2 text-black w-full max-w-screen-sm", {
                    'border-2 border-red-400 bg-red-200': errors.todo
                    })}
                    required
                    {...register("name", {
                        required: { value: true, message: "Campo requerido"  },
                        minLength: { value: 1, message: "Minimo 1 caractere1" } ,
                        maxLength: { value: 180, message: "Maximo 30 caracteres"}
                    })}
                />
                <input 
                    type="text" 
                    placeholder="Ingresa tu apellido" 
                    className={clsx("rounded p-2 text-black w-full max-w-screen-sm", {
                    'border-2 border-red-400 bg-red-200': errors.todo
                    })}
                    required
                    {...register("lastName", {
                        required: { value: true, message: "Campo requerido"  },
                        minLength: { value: 3, message: "Minimo 1 caractere" } ,
                        maxLength: { value: 180, message: "Maximo 30 caracteres"}
                    })}
                />
                <input 
                    type="email" 
                    placeholder="Ingrea un correo" 
                    className={clsx("rounded p-2 text-black w-full max-w-screen-sm", {
                    'border-2 border-red-400 bg-red-200': errors.todo
                    })}
                    required
                    {...register("email", {
                        required: { value: true, message: "Campo requerido"},
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

                {koders.length == 0 && <p className="text-4xl text-gray-500">No tienes tareas pendientes 🙅‍♂️</p>}

                {koders.map((koder,index) => {
                    return(
                    <div key={index} className="flex bg-gray-500 w-full justify-between gap-5 text-black px-2">
                        <span className="flex items-center">{koder.name}</span>
                        <span className="flex items-center">{koder.lastName}</span>
                        <span className="flex items-center">{koder.email}</span>
                        <button className=" rounded-xl p-2 w-40" onClick={() => deleteKoder(index)}>- Borrar</button>
                    </div>
                    )
                })
                }
            </div>
        </main>
    )
}