import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const EdicionRutina = () => {

    const navigate = useNavigate()
    const { store, actions } = useContext(Context);
    const [routine, setRoutine] = useState({});
    const [day, setDay] = useState('');
    const [name, setName] = useState('');
    const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false)
    const [isDeleteExerciseModalOpen, setIsDeleteExerciseModalOpen] = useState(false)
    const [isEditRoutineModalOpen, setIsEditRoutineModalOpen] = useState(false)
    const [isDeleteRoutineModalOpen, setIsDeleteRoutineModalOpen] = useState(false)

    // PREVIO A MOSTRAR EJERCICIOS EDITAR
    const setSelectedDay = async (e) => {
        setDay(e.target.options[e.target.selectedIndex].text)
        await actions.oneRoutine(e.target.value)
        setRoutine(await store.oneRoutine)
    }

    const handleChange = (e) => {
        setName(e.target.value);
    }

    const handleDeleteSubmit = async (e, day) => {
        if (e) {
            e.preventDefault()
        }

        const deleteWeeklyUserRoutine = new Promise(async (resolve, reject) => {
            const success = await actions.deleteWeeklyUserRoutine(day)
            
            if (success === true) {
                resolve("Rutina Dia Eliminada")
                setRoutine({})
            } else {
                reject("Elimincacion fallida")
            }
        })

        toast.promise(
            deleteWeeklyUserRoutine,
            {
                pending: 'Eliminando...',
                success: 'Rutina Dia eliminada exitosamente 👌',
                error: 'No se pudo eliminar su Rutina Dia 🤯'
            }
        )

        deleteWeeklyUserRoutine.then(() => {
            navigate("/editarrutina")
        }).catch((error) => {
            console.error(error)
        })
    }

    const handleDeleteExerciseRoutine = async (e, routine_id, exercise_id) => {
        e.preventDefault()

        const deleteExerciseRoutine = new Promise(async (resolve, reject) => {

            const success = await actions.deleteExerciseRoutine(routine_id, exercise_id)
            if (success === true) {
                setRoutine(await store.oneRoutine)

                if (routine.exercises) {
                    console.log(routine.exercises.length);

                }
                resolve("Ejercicio elimindado de la rutina")
                if (routine.exercises) {
                    if (routine.exercises.length === 1) {
                        handleDeleteSubmit(null, day)
                    }
                }
            } else {
                reject("Elimincacion fallida")
            }
        })

        toast.promise(
            deleteExerciseRoutine,
            {
                pending: 'Eliminando...',
                success: 'Ejercicio eliminado exitosamente 👌',
                error: 'No se pudo eliminar el ejercicio de la rutina 🤯'
            }
        )

        deleteExerciseRoutine.then(() => {
            navigate("/editarrutina")
        }).catch((error) => {
            console.error(error)
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const editInfoPromise = new Promise(async (resolve, reject) => {
            let success = await actions.putRoutine(
                routine.id,
                name,
            );
            if (success === true) {
                setRoutine(await store.oneRoutine)
                setIsEditRoutineModalOpen(false)
                resolve("Actualizacion exitosa");
            } else {
                reject("Error al actualizar");
            }
            success = true
        });

        toast.promise(
            editInfoPromise,
            {
                pending: 'Actualizando...',
                success: 'Actualizacion exitosa 😎',
                error: 'Error al actualizar'
            }
        );
    };

    // PREVIO A MOSTRAR EJERCICIOS EDITAR
    useEffect(() => {
        actions.allWeeklyRoutineUser()
    }, [store.allWeeklyRoutineUser, store.oneRoutine])

    // useEffect(() => {
    //     console.log(routine);
    //     if (routine.exercises) {
    //         if (routine.exercises.length === 0) {
    //             handleDeleteSubmit(null, day)
    //         }
    //     }
    // }, [routine])
    return (
        <>
            <div>
                <select
                    name="HeadlineAct"
                    disabled={store.allWeeklyRoutineUserList.length == 0 ? true : false}
                    id="HeadlineAct"
                    className="bg-neutral-900 border-none text-neutral-300 text-sm/none font-medium ms-2 md:me-2 px-4 py-2 h-8 rounded-md focus:ring-transparent focus:border-transparent"
                    onChange={(e) => setSelectedDay(e)}
                >
                    <option value={"default"} className="flex items-center border-e px-4 py-2 text-sm/none font-medium text-neutral-600 dark:border-e-neutral-800 dark:text-neutral-300">
                        Filtrar
                    </option>
                    {store.allWeeklyRoutineUserList.sort((a, b) => a.day_num - b.day_num).map((item, index) => (
                        <option key={item.id} className="lowercase px-4 py-2" value={item.routine.id}>
                            {item.day}
                        </option>
                    ))}
                </select>
                <label className="text-white" htmlFor="">{routine.name}</label>
                {routine.id && <>{/* modal toggle */}
                    <div className="flex flex-col sm:flex-row items-center gap-4">

                        <button
                            onClick={() => setIsEditRoutineModalOpen(true)}
                            className="block text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded text-sm px-5 py-3 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
                            type="button"
                        >
                            Cambiar nombre de la rutina
                        </button>
                        {/* <button type="button" className="place-self-center inline-block rounded border border-current px-5 py-3 text-sm font-medium text-neutral-400 hover:text-red-300 transition hover:scale-105 hover:shadow-xl focus:outline-none active:text-red-500 active:scale-95" href="#">Desactivar cuenta</button> */}
                        {/* <!-- Modal toggle --> */}
                        <button onClick={() => setIsDeleteRoutineModalOpen(true)} className="place-self-center inline-block rounded border border-current px-5 py-3 text-sm font-medium text-neutral-400 hover:text-red-300 transition hover:scale-105 hover:shadow-xl focus:outline-none active:text-red-500 active:scale-95" type="button">
                            Eliminar Rutina
                        </button>

                        {/* <!-- Main modal --> */}
                        <div tabIndex="-1" aria-hidden="true" className={`${isDeleteRoutineModalOpen ? '' : 'hidden'}  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen bg-neutral-950/40 backdrop-blur-sm transition-all ease-in flex`}>
                            <div className="relative p-4 w-full max-w-2xl max-h-full">
                                {/* <!-- Modal content --> */}
                                <div className="relative rounded-lg shadow dark:bg-neutral-700">
                                    {/* <!-- Modal header --> */}
                                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-neutral-700">
                                        <h3 className="text-xl text-neutral-50 font-bold">
                                            Eliminar Rutina
                                        </h3>
                                        <button type="button" onClick={() => setIsDeleteRoutineModalOpen(false)} className="text-neutral-400 bg-transparent hover:bg-neutral-200 hover:text-neutral-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-neutral-600 dark:hover:text-white">
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span className="sr-only">Cerrar</span>
                                        </button>
                                    </div>
                                    {/* <!-- Modal body --> */}
                                    <div className="p-4 md:p-5 space-y-4">
                                        <p className="text-xs font-bold uppercase text-neutral-400">
                                            Se eliminara esta rutina dia de su rutina semanal
                                        </p>
                                    </div>
                                    {/* <!-- Modal footer --> */}
                                    <div className="flex items-center p-4 md:p-5 border-t border-neutral-200 rounded-b dark:border-neutral-600">
                                        <button onClick={(e) => handleDeleteSubmit(e, day)} type="button" className="transition-all duration-200 text-white bg-red-900 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-900 dark:hover:bg-red-800 dark:focus:ring-red-800">Eliminar Rutina</button>
                                        <button onClick={() => setIsDeleteRoutineModalOpen(false)} type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-neutral-900 focus:outline-none bg-white rounded-lg border border-neutral-200 hover:bg-neutral-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-neutral-100 dark:focus:ring-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-600 dark:hover:text-white dark:hover:bg-neutral-700">Cancelar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* modal */}
                        <div id="crud-modal" tabIndex="-1" aria-hidden="true" className={`${isEditRoutineModalOpen ? '' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen bg-neutral-950/40 backdrop-blur-sm transition-all ease-in flex`}>
                            <div className="relative p-4 w-full max-w-md max-h-full">
                                <div className="relative bg-white rounded-lg shadow dark:bg-neutral-700">
                                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-neutral-600">
                                        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                                            {routine.name}
                                        </h3>
                                        <button
                                            onClick={() => setIsEditRoutineModalOpen(false)}
                                            className="text-neutral-400 bg-transparent hover:bg-neutral-200 hover:text-neutral-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-neutral-600 dark:hover:text-white"
                                        >
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span className="sr-only">Cerrar</span>
                                        </button>
                                    </div>
                                    <form onSubmit={handleSubmit} className="p-4 md:p-5 space-y-4">
                                        <div className="flex flex-col gap-4">
                                            <div className='flex flex-col md:flex-row gap-4 w-full'>
                                                <div className="w-full">
                                                    <label htmlFor="name" className="block mb-1 text-sm font-medium text-neutral-900 dark:text-white">Nuevo Nombre</label>
                                                    <input value={name}
                                                        onChange={handleChange} type="text" name="name" id="name" className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-neutral-600 dark:border-neutral-500 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 focus:ring-emerald-500 focus:border-emerald-500" placeholder="Ingresar nuevo nombre" required />
                                                </div>
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                            </div>
                                        </div>
                                        <button type="submit" className="text-white inline-flex items-center bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800 transition-all ease-in">
                                            <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                            Guardar cambios
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div></>}
                <ul className="bg-neutral-900 p-3 space-y-3">

                    {routine.id &&


                        routine.exercises.map((item, index) => {

                            return (
                                <div key={item.id + "a"}>
                                    < label
                                        key={index}
                                        htmlFor={`option ${index}`}
                                        className="flex items-center cursor-pointer gap-4 rounded-lg border p-4 transition border-gray-700 bg-gradient-to-r from-neutral-800 to-neutral-900"
                                    >
                                        <div className="flex items-center">
                                            <a
                                                href="#"
                                                className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
                                            >
                                                <span
                                                    className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
                                                ></span>

                                                <div className="sm:flex sm:justify-between sm:gap-4">
                                                    <div>
                                                        <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                                                            {item.exercise.name}
                                                        </h3>

                                                        <p className="mt-1 text-xs font-medium text-gray-600">{item.exercise.category}</p>
                                                    </div>

                                                    <div className="hidden sm:block sm:shrink-0">
                                                        <img
                                                            alt=""
                                                            src={item.exercise.image}
                                                            className="size-16 rounded-lg object-cover shadow-sm"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="mt-4">
                                                    <p className="text-pretty text-sm text-gray-500">
                                                        {item.exercise.description}
                                                    </p>
                                                </div>

                                                <dl className="mt-6 flex gap-4 sm:gap-6">
                                                </dl>
                                            </a>

                                        </div>
                                        <div>
                                            <p className="font-medium text-white">{item.exercise.name}</p>
                                        </div>
                                        <div>
                                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                                <button
                                                    onClick={() => setIsExerciseModalOpen(true)}
                                                    className="block text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded text-sm px-5 py-3 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
                                                    type="button"
                                                >
                                                    Cambiar ejercicio y/o series
                                                </button>
                                                {/* <button type="button" className="place-self-center inline-block rounded border border-current px-5 py-3 text-sm font-medium text-neutral-400 hover:text-red-300 transition hover:scale-105 hover:shadow-xl focus:outline-none active:text-red-500 active:scale-95" href="#">Desactivar cuenta</button> */}
                                                {/* <!-- Modal toggle --> */}
                                                <button onClick={() => setIsDeleteExerciseModalOpen(true)} className="place-self-center inline-block rounded border border-current px-5 py-3 text-sm font-medium text-neutral-400 hover:text-red-300 transition hover:scale-105 hover:shadow-xl focus:outline-none active:text-red-500 active:scale-95" type="button">
                                                    Quitar Ejercicio
                                                </button>

                                                {/* <!-- Main modal --> */}
                                                <div tabIndex="-1" aria-hidden="true" className={`${isDeleteExerciseModalOpen ? '' : 'hidden'}  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen bg-neutral-950/40 backdrop-blur-sm transition-all ease-in flex`}>
                                                    <div className="relative p-4 w-full max-w-2xl max-h-full">
                                                        {/* <!-- Modal content --> */}
                                                        <div className="relative rounded-lg shadow dark:bg-neutral-700">
                                                            {/* <!-- Modal header --> */}
                                                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-neutral-700">
                                                                <h3 className="text-xl text-neutral-50 font-bold">
                                                                    Quitar Ejercicio
                                                                </h3>
                                                                <button type="button" onClick={() => setIsDeleteExerciseModalOpen(false)} className="text-neutral-400 bg-transparent hover:bg-neutral-200 hover:text-neutral-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-neutral-600 dark:hover:text-white">
                                                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                                    </svg>
                                                                    <span className="sr-only">Cerrar</span>
                                                                </button>
                                                            </div>
                                                            {/* <!-- Modal body --> */}
                                                            <div className="p-4 md:p-5 space-y-4">
                                                                <p className="text-xs font-bold uppercase text-neutral-400">
                                                                    Se quitara este ejercicio de su rutina
                                                                </p>
                                                            </div>
                                                            {/* <!-- Modal footer --> */}
                                                            <div className="flex items-center p-4 md:p-5 border-t border-neutral-200 rounded-b dark:border-neutral-600">
                                                                <button onClick={(e) => handleDeleteExerciseRoutine(e, routine.id, item.exercise.id)} type="button" className="transition-all duration-200 text-white bg-red-900 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-900 dark:hover:bg-red-800 dark:focus:ring-red-800">Quitar Ejercicio</button>
                                                                <button onClick={() => setIsDeleteExerciseModalOpen(false)} type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-neutral-900 focus:outline-none bg-white rounded-lg border border-neutral-200 hover:bg-neutral-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-neutral-100 dark:focus:ring-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-600 dark:hover:text-white dark:hover:bg-neutral-700">Cancelar</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div id="crud-modal" tabIndex="-1" aria-hidden="true" className={`${isExerciseModalOpen ? '' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen bg-neutral-950/40 backdrop-blur-sm transition-all ease-in flex`}>
                                                    <div className="relative p-4 w-full max-w-md max-h-full">
                                                        <div className="relative bg-white rounded-lg shadow dark:bg-neutral-700">
                                                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-neutral-600">
                                                                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                                                                    {routine.name}
                                                                </h3>
                                                                <button
                                                                    onClick={() => setIsExerciseModalOpen(false)}
                                                                    className="text-neutral-400 bg-transparent hover:bg-neutral-200 hover:text-neutral-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-neutral-600 dark:hover:text-white"
                                                                >
                                                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                                    </svg>
                                                                    <span className="sr-only">Cerrar</span>
                                                                </button>
                                                            </div>
                                                            <form className="p-4 md:p-5 space-y-4">
                                                                <div className="flex flex-col gap-4">
                                                                    <div className='flex flex-col md:flex-row gap-4 w-full'>
                                                                        <div className="w-full">
                                                                            <label htmlFor="name" className="block mb-1 text-sm font-medium text-neutral-900 dark:text-white">Editar Ejercicio</label>
                                                                            <input
                                                                                type="text" name="name" id="name" className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-neutral-600 dark:border-neutral-500 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 focus:ring-emerald-500 focus:border-emerald-500" placeholder="Ingresar nuevo nombre" required />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-span-6 sm:col-span-3">
                                                                    </div>
                                                                </div>
                                                                <button type="submit" className="text-white inline-flex items-center bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800 transition-all ease-in">
                                                                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                                                    Guardar cambios
                                                                </button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            )
                        })
                    }

                </ul >
            </div>
        </>
    )
};