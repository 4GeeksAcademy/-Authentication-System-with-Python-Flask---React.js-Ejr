import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { toast } from "react-toastify";


export const EdicionRutina = () => {
    const { store, actions } = useContext(Context);
    const [routine, setRoutine] = useState({});
    const [day, setDay] = useState('');
    const [name, setName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("")
    const [addedExercises, setAddedExercises] = useState([])
    const [isOpen, setIsOpen] = useState(false)

    const handleNextStep = () => setStep(step + 1)
    const isExerciseSelected = (id) => {
        return addedExercises.some(exercise => exercise.id === id)
    }

    const filteredExercises = store.allExerciseList.filter((item) => {
        const matchesCategory = selectedCategory === "" || item.category === selectedCategory;
        const matchesSearchTerm = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearchTerm;
    })

    const toggleDropdown = (e) => {
        e.preventDefault()
        setIsOpen(!isOpen)
    }
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
        e.preventDefault()

        const deleteWeeklyUserRoutine = new Promise(async (resolve, reject) => {
            const success = await actions.deleteWeeklyUserRoutine(day)
            if (success === true) {
                resolve("Rutina Dia Eliminada")
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

    const handleSubmit = async (e) => {
        e.preventDefault();


        const editInfoPromise = new Promise(async (resolve, reject) => {
            let success = await actions.putRoutine(
                routine.id,
                name,
            );
            if (success === true) {
                setRoutine(await store.oneRoutine)
                setIsModalOpen(false)
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

    useEffect(() => {
        actions.allExercise()
        actions.category()
    }, [])

    // PREVIO A MOSTRAR EJERCICIOS EDITAR
    useEffect(() => {
        actions.allWeeklyRoutineUser()
    }, [])
    return (
        <>
            <div>
                <select
                    name="HeadlineAct"
                    id="HeadlineAct"
                    className="bg-neutral-900 border-none text-neutral-300 text-sm/none font-medium ms-2 md:me-2 px-4 py-2 h-8 rounded-md focus:ring-transparent focus:border-transparent"
                    onChange={(e) => setSelectedDay(e)}
                >
                    <option className="flex items-center border-e px-4 py-2 text-sm/none font-medium text-neutral-600 dark:border-e-neutral-800 dark:text-neutral-300" value="">
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
                            onClick={() => setIsModalOpen(true)}
                            className="block text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded text-sm px-5 py-3 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
                            type="button"
                        >
                            Cambiar nombre de la rutina
                        </button>
                        {/* <button type="button" className="place-self-center inline-block rounded border border-current px-5 py-3 text-sm font-medium text-neutral-400 hover:text-red-300 transition hover:scale-105 hover:shadow-xl focus:outline-none active:text-red-500 active:scale-95" href="#">Desactivar cuenta</button> */}
                        {/* <!-- Modal toggle --> */}
                        <button onClick={() => setIsDeleteModalOpen(true)} className="place-self-center inline-block rounded border border-current px-5 py-3 text-sm font-medium text-neutral-400 hover:text-red-300 transition hover:scale-105 hover:shadow-xl focus:outline-none active:text-red-500 active:scale-95" type="button">
                            Eliminar Rutina
                        </button>

                        {/* <!-- Main modal --> */}
                        <div tabIndex="-1" aria-hidden="true" className={`${isDeleteModalOpen ? '' : 'hidden'}  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen bg-neutral-950/40 backdrop-blur-sm transition-all ease-in flex`}>
                            <div className="relative p-4 w-full max-w-2xl max-h-full">
                                {/* <!-- Modal content --> */}
                                <div className="relative rounded-lg shadow dark:bg-neutral-700">
                                    {/* <!-- Modal header --> */}
                                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-neutral-700">
                                        <h3 className="text-xl text-neutral-50 font-bold">
                                            Eliminar Rutina
                                        </h3>
                                        <button type="button" onClick={() => setIsDeleteModalOpen(false)} className="text-neutral-400 bg-transparent hover:bg-neutral-200 hover:text-neutral-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-neutral-600 dark:hover:text-white">
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
                                        <button onClick={(e) => handleDeleteSubmit(e, day)} type="button" className="transition-all duration-200 text-white bg-red-900 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-900 dark:hover:bg-red-800 dark:focus:ring-red-800">Eliminar Cuenta</button>
                                        <button onClick={() => setIsDeleteModalOpen(false)} type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-neutral-900 focus:outline-none bg-white rounded-lg border border-neutral-200 hover:bg-neutral-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-neutral-100 dark:focus:ring-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-600 dark:hover:text-white dark:hover:bg-neutral-700">Cancelar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* modal */}
                        <div id="crud-modal" tabIndex="-1" aria-hidden="true" className={`${isModalOpen ? '' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen bg-neutral-950/40 backdrop-blur-sm transition-all ease-in flex`}>
                            <div className="relative p-4 w-full max-w-md max-h-full">
                                <div className="relative bg-white rounded-lg shadow dark:bg-neutral-700">
                                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-neutral-600">
                                        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                                            {routine.name}
                                        </h3>
                                        <button
                                            onClick={() => setIsModalOpen(false)}
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
                                                    onClick={() => setIsModalOpen(true)}
                                                    className="block text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded text-sm px-5 py-3 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
                                                    type="button"
                                                >
                                                    Cambiar ejercicio y/o series
                                                </button>
                                                {/* <button type="button" className="place-self-center inline-block rounded border border-current px-5 py-3 text-sm font-medium text-neutral-400 hover:text-red-300 transition hover:scale-105 hover:shadow-xl focus:outline-none active:text-red-500 active:scale-95" href="#">Desactivar cuenta</button> */}
                                                {/* <!-- Modal toggle --> */}
                                                <button onClick={() => setIsDeleteModalOpen(true)} className="place-self-center inline-block rounded border border-current px-5 py-3 text-sm font-medium text-neutral-400 hover:text-red-300 transition hover:scale-105 hover:shadow-xl focus:outline-none active:text-red-500 active:scale-95" type="button">
                                                    Quitar Ejercicio
                                                </button>

                                                {/* <!-- Main modal --> */}
                                                <div tabIndex="-1" aria-hidden="true" className={`${isDeleteModalOpen ? '' : 'hidden'}  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen bg-neutral-950/40 backdrop-blur-sm transition-all ease-in flex`}>
                                                    <div className="relative p-4 w-full max-w-2xl max-h-full">
                                                        {/* <!-- Modal content --> */}
                                                        <div className="relative rounded-lg shadow dark:bg-neutral-700">
                                                            {/* <!-- Modal header --> */}
                                                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-neutral-700">
                                                                <h3 className="text-xl text-neutral-50 font-bold">
                                                                    Quitar Ejercicio
                                                                </h3>
                                                                <button type="button" onClick={() => setIsDeleteModalOpen(false)} className="text-neutral-400 bg-transparent hover:bg-neutral-200 hover:text-neutral-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-neutral-600 dark:hover:text-white">
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
                                                                <button onClick={(e) => handleDeleteSubmit(e, day)} type="button" className="transition-all duration-200 text-white bg-red-900 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-900 dark:hover:bg-red-800 dark:focus:ring-red-800">Quitar Ejercicio</button>
                                                                <button onClick={() => setIsDeleteModalOpen(false)} type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-neutral-900 focus:outline-none bg-white rounded-lg border border-neutral-200 hover:bg-neutral-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-neutral-100 dark:focus:ring-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-600 dark:hover:text-white dark:hover:bg-neutral-700">Cancelar</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* modal */}
                                                <div className="w-3/4 mx-auto flex rounded-md flex-col items-center gap-4 justify-between overflow-y-auto py-5 px-5 h-full bg-neutral-800 border-neutral-700 relative">

                                                    {/* form title */}
                                                    <span className="relative flex justify-center w-full sm:w-3/4">
                                                        <div
                                                            className="absolute inset-x-0 top-1/2 h-px -translate-y-3/4 bg-red bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-75"
                                                        ></div>
                                                        <span className="relative z-10 text-white font-bold px-2 sm:px-6 bg-neutral-800 sm:text-xl">Crea tu rutina</span>
                                                    </span>
                                                    <div className="w-3/4 mx-auto flex rounded-md flex-col items-center gap-4 justify-between overflow-y-auto py-5 px-5 h-full bg-neutral-800 border-neutral-700 relative">
                                                        <form className="w-full">
                                                            <div id="crud-modal" tabIndex="-1" aria-hidden="true" className={`${isModalOpen ? '' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen bg-neutral-950/40 backdrop-blur-sm transition-all ease-in flex`}>
                                                                <div className='w-full flex flex-col'>
                                                                    {/* Paso 3: Ejercicios */}
                                                                    <div className="flex flex-row flex-wrap gap-2 w-full items-end justify-end mb-5">

                                                                        {/* search input */}
                                                                        <div className="relative">
                                                                            <label htmlFor="Search" className="sr-only"> Search for... </label>
                                                                            <input
                                                                                type="text"
                                                                                id="Search"
                                                                                placeholder="buscar ejercicios..."
                                                                                className="border-none max-w-40 h-8 rounded-md px-4 py-2 pe-10 shadow-sm sm:text-sm dark:bg-neutral-900 dark:text-white focus:ring-emerald-500 focus:border-emerald-500"
                                                                                value={searchTerm}
                                                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                                            />

                                                                            <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                                                                                <span
                                                                                    className="text-neutral-600 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
                                                                                >
                                                                                    <span className="sr-only">Search</span>

                                                                                    <svg
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                        fill="none"
                                                                                        viewBox="0 0 24 24"
                                                                                        strokeWidth="1.5"
                                                                                        stroke="currentColor"
                                                                                        className="size-4"
                                                                                    >
                                                                                        <path
                                                                                            strokeLinecap="round"
                                                                                            strokeLinejoin="round"
                                                                                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                                                                        />
                                                                                    </svg>
                                                                                </span>
                                                                            </span>
                                                                        </div>

                                                                        {/* filtrar */}
                                                                        <div>
                                                                            <select
                                                                                name="HeadlineAct"
                                                                                id="HeadlineAct"
                                                                                className="bg-neutral-900 border-none text-neutral-300 text-sm/none font-medium ms-2 md:me-2 px-4 py-2 h-8 rounded-md focus:ring-transparent focus:border-transparent"
                                                                                value={selectedCategory}
                                                                                onChange={(e) => setSelectedCategory(e.target.value)}
                                                                            >
                                                                                <option className="flex items-center border-e px-4 py-2 text-sm/none font-medium text-neutral-600 dark:border-e-neutral-800 dark:text-neutral-300" value="">
                                                                                    Filtrar
                                                                                </option>
                                                                                {store.allCategoryList.map((item, index) => (
                                                                                    <option key={index} className="lowercase px-4 py-2" value={item}>
                                                                                        {item}
                                                                                    </option>
                                                                                ))}
                                                                            </select>
                                                                        </div>

                                                                        {/* lista de ejercicios */}
                                                                        <div className="relative">
                                                                            <div className="inline-flex items-center overflow-hidden rounded-md h-8 border bg-white dark:border-neutral-800 dark:bg-neutral-900">
                                                                                <div
                                                                                    className="border-e px-4 py-2 text-sm/none font-medium text-neutral-600 dark:border-e-neutral-800 dark:text-neutral-300"
                                                                                >
                                                                                    Ejercicios
                                                                                    <span className={`bg-neutral-900 border border-neutral-700 text-neutral-300 text-xs font-medium ms-2 me-2 px-2.5 py-0.5 rounded-full`}>
                                                                                        {addedExercises.length}
                                                                                    </span>
                                                                                </div>

                                                                                <button
                                                                                    className="h-full p-2 text-neutral-600 hover:bg-neutral-50 hover:text-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
                                                                                    onClick={toggleDropdown}
                                                                                >
                                                                                    <span className="sr-only">Menu</span>
                                                                                    <svg
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                        className="size-4"
                                                                                        viewBox="0 0 20 20"
                                                                                        fill="currentColor"
                                                                                    >
                                                                                        <path
                                                                                            fillRule="evenodd"
                                                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                                            clipRule="evenodd"
                                                                                        />
                                                                                    </svg>
                                                                                </button>
                                                                            </div>

                                                                            {isOpen && (
                                                                                <div
                                                                                    className="absolute end-0 z-10 mt-2 w-56 rounded-md border border-neutral-100 bg-white shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
                                                                                    role="menu"
                                                                                >
                                                                                    {addedExercises.length > 0 ? (
                                                                                        addedExercises.map((item, index) => (
                                                                                            <div
                                                                                                key={index}
                                                                                                className="flex justify-between rounded-lg px-4 py-2 text-sm text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
                                                                                                role="menuitem"
                                                                                            >
                                                                                                {item.name}
                                                                                                <button onClick={() => handleAddExercises(item.id, item.name)} type="button" className="w-fit flex p-1 cursor-pointer items-center justify-center rounded-lg border-neutral-200 bg-white text-neutral-500 hover:text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:peer-checked:text-neutral-300 active:scale-95 transition-all ease-in">
                                                                                                    <div>
                                                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x size-4"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                                                                                                    </div>
                                                                                                </button>
                                                                                            </div>
                                                                                        ))) : (
                                                                                        <div
                                                                                            className="block rounded-lg px-4 py-2 text-sm text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
                                                                                            role="menuitem"
                                                                                            onClick={closeDropdown}
                                                                                        >
                                                                                            No hay ejercicios
                                                                                        </div>
                                                                                    )
                                                                                    }
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                    <div className="mb-4 flex flex-wrap gap-4">
                                                                        {filteredExercises.map((item, index) => {
                                                                            return (
                                                                                <article className="flex-grow flex-shrink-0 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 max-w-full flex bg-white transition-all shadow-xl dark:bg-neutral-900 border border-neutral-700 rounded-md overflow-hidden">
                                                                                    <div className="hidden sm:block sm:basis-36">
                                                                                        <img
                                                                                            alt=""
                                                                                            src="https://images.unsplash.com/photo-1609557927087-f9cf8e88de18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                                                                                            className="aspect-square h-full w-full object-cover"
                                                                                        />
                                                                                    </div>
                                                                                    <div className="p-3 flex flex-1 flex-col gap-4 justify-between">
                                                                                        <div className="flex flex-col gap-3 dark:border-white/10">
                                                                                            <h3 className="font-bold uppercase text-neutral-900 dark:text-white">
                                                                                                {item.name}
                                                                                            </h3>
                                                                                            <span className="rounded-full bg-neutral-800 px-2 w-fit py-1 text-xs font-medium lowercase text-neutral-400 text-center">
                                                                                                {item.category}
                                                                                            </span>
                                                                                        </div>
                                                                                        <div className="self-end">
                                                                                            <input
                                                                                                checked={isExerciseSelected(item.id)}
                                                                                                onChange={() => handleAddExercises(item.id, item.name)}
                                                                                                type="checkbox"
                                                                                                id={`react-${index}`}
                                                                                                className="peer hidden"
                                                                                            />
                                                                                            <label
                                                                                                htmlFor={`react-${index}`}
                                                                                                className="dark:hover:text-emearld-400 flex size-6 cursor-pointer items-center justify-center rounded-lg bg-white p-5 text-neutral-500 transition-all ease-in hover:bg-neutral-50 hover:text-emerald-400 active:scale-95 peer-checked:bg-gradient-to-br peer-checked:from-emerald-600 peer-checked:to-green-400 peer-checked:text-neutral-700 dark:border-emerald-600 dark:bg-neutral-800 dark:text-emerald-600 dark:hover:bg-neutral-700 dark:peer-checked:text-neutral-900"
                                                                                            >
                                                                                                <div>
                                                                                                    <svg
                                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                                        viewBox="0 0 24 24"
                                                                                                        fill="none"
                                                                                                        stroke="currentColor"
                                                                                                        strokeWidth="2"
                                                                                                        strokeLinecap="round"
                                                                                                        strokeLinejoin="round"
                                                                                                        className="icon icon-tabler icons-tabler-outline icon-tabler-plus size-8"
                                                                                                    >
                                                                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                                                                        <path d="M12 5l0 14" />
                                                                                                        <path d="M5 12l14 0" />
                                                                                                    </svg>
                                                                                                </div>
                                                                                            </label>
                                                                                        </div>
                                                                                    </div>
                                                                                </article>
                                                                            )
                                                                        })}
                                                                    </div>

                                                                    <div className="w-full flex gap-4 flex-col items-center sm:flex-row sm:w-fit self-end">
                                                                        <button
                                                                            type="button"
                                                                            className="bg-transparent hover:bg-neutral-600 text-white font-bold py-2 px-4 rounded w-full sm:w-auto transition-all ease-in"
                                                                        >
                                                                            Cancelar
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => setStep(1)}
                                                                            className="disabled:bg-emerald-300 disabled:cursor-not-allowed bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded w-full sm:w-auto transition-all ease-in"
                                                                            disabled={addedExercises.length == 0 ? true : false}
                                                                        >
                                                                            Confirmar Cambios
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
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