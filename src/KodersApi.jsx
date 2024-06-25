import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { getKoders, createKoder, deleteKoder } from './api'
import { Toaster, toast } from "sonner"
import clsx from "clsx"

export default function App(){
  // Guardar lista de todos
    const [koders, setKoders] = useState([])

    // Recibe 2 parametros
    // 1.- Callback / funcion
    // 2.- Un arreglo de dependencias
    // useEffect se usa para ejecutar codigo en partes especificas del ciclo de vida de un componente
    // useEffect se ejecuta en 2 ocaciones, 
    // 1.- Cuando el componente se renderiza por primera vez
    // 2.- Cuando cambia una de sus dependencias
    useEffect(() => {
        getKoders()
        .then((koders) => {
            setKoders(koders)
        }) 
        .catch((error) => {
            console.log('error al crear el koder',error)
        }) 
    }, [])

    const {
        register, 
        handleSubmit,
        reset, 
        formState: { errors, isValid, isSubmitted},
        setFocus
    } = useForm() 

    async function onSubmit(data){
        try{
            await createKoder({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email
            })
            
            const kodersList = await getKoders();
            setKoders(kodersList)
            reset()
            toast.success("Koder Creado")
        } catch (error) {
            console.error("Error al crear koder", error)
        }
        
    }

    function onDelete(koderId){
        deleteKoder(koderId)
        .then(() => {
            toast.success("Koder Eliminado")
            getKoders()
                .then((koders) => {
                    setKoders(koders)
                })
                .catch((error) => {
                    console.error('error al obtener koders', error)
                })
        })
        .catch((error) => {
            console.error('error al eliminar el koder', error)
        })
    }


    return(
        <main className="w-full min-h-screen">
            <Toaster position="top" richColors />
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
                    {...register("firstName", {
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
                        <button className=" rounded-xl p-2 w-40" onClick={() => onDelete(koder.id)}>- Borrar</button>
                    </div>
                    )
                })
                }
            </div>
        </main>
    )
}