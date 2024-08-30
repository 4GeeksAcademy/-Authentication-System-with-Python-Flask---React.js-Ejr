import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Modal } from "./modal"


export const AgregarEjercicioEditar = ({ isAddExerciseModalOpen, setIsAddExerciseModalOpen, routine, setRoutine }) => {

    const { store, actions } = useContext(Context);
    // const [routine, setRoutine] = useState({});
    // const [day, setDay] = useState('');
    // const [name, setName] = useState('');
    // const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false)
    // const [isDeleteExerciseModalOpen, setIsDeleteExerciseModalOpen] = useState(false)
    // const [isEditRoutineModalOpen, setIsEditRoutineModalOpen] = useState(false)
    // const [isDeleteRoutineModalOpen, setIsDeleteRoutineModalOpen] = useState(false)
    // const [isAddExerciseModalOpen, setIsAddExerciseModalOpen] = useState(false)

    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("")
    const [addedExercises, setAddedExercises] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [selectedExercise, setSelectedExercise] = useState({ id: '', name: '' })
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectSets, setSelectSets] = useState('')
    // const [isFinishModalOpen, setIsFinishModalOpen] = useState(false)
    const [setsInput, setSetsInput] = useState('')
    const [repsInput, setRepsInput] = useState('')

    const setsList = store.allSetsList.slice(0, 5)

    async function checkIfSetExists(sets, reps) {
        try {
            // Filtra para ver si ya existe un set con las mismas series y repeticiones
            const existingSet = setsList.find(set => set.sets === parseInt(sets) && set.repetitions === parseInt(reps))

            return existingSet || null // Si existe, retorna el set si no, retorna null
        } catch (error) {
            console.error("Error al verificar el set:", error)
            return null
        }
    }

    const cerrarModalEjercicio = () => {

        closeDropdown(),
            setAddedExercises([])
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        if (!selectSets) {
            try {
                // Verifica si ya existe un set con las series y repeticiones ingresadas
                const existingSet = await checkIfSetExists(setsInput, repsInput)

                if (existingSet) {
                    // Si ya existe, usa el id del set existente
                    store.setId = existingSet.id
                    handleAddExercises(selectedExercise.id, selectedExercise.name, store.setId)
                } else {
                    // Si no existe, crea el set y guárdalo en el store
                    const newSets = await actions.postSets(setsInput, repsInput)

                    if (newSets) {
                        handleAddExercises(selectedExercise.id, selectedExercise.name, store.setId)
                    } else {
                        console.error("No se pudo crear las series y repeticiones")
                    }
                }
            } catch (error) {
                console.error("Error al verificar o crear las series y repeticiones:", error)
            }
        } else {
            // Caso 2: El usuario seleccionó un set previo
            handleAddExercises(selectedExercise.id, selectedExercise.name, selectSets)
        }
        setSetsInput('')
        setRepsInput('')
        setSelectSets('')
    }

    const handleSelectChange = (e) => {
        setSelectSets(e.target.value)
    }
    // const handleFinishRoutine = () => {
    //     setFormData({
    //         routineName: '',
    //         selectedDay: '',
    //         exercises: ''
    //     })
    //     setSelectedExercise({ id: '', name: '' })
    //     setRepsInput('')
    //     setSetsInput('')
    //     setSelectSets('')
    //     setStep(1)
    //     setAddedExercises([])
    //     setIsFinishModalOpen(false)
    //     actions.setCompleteRoutine(true)
    // }

    const handleAddExercises = async (id, name, setId) => {
        console.log(id)
        console.log(name)
        console.log(setId)

        const isExerciseAdded = addedExercises.some(exercise => exercise.id === id)
        console.log(isExerciseAdded)

        const actionPromise = new Promise(async (resolve, reject) => {
            try {
                let response
                if (isExerciseAdded) {
                    // Elimina el ejercicio si ya está agregado
                    console.log("HOLA");

                    response = await actions.deleteExerciseRoutine(routine.id.toString(), id.toString())
                    setRoutine(await store.oneRoutine)
                    if (!response || response.error) throw new Error('Error al eliminar el ejercicio')
                    resolve('Ejercicio eliminado exitosamente')
                } else {
                    // Agrega el ejercicio si no está en la rutina
                    console.log(routine.id);
                    console.log("routine.id");

                    response = await actions.postExerciseRoutine(routine.id.toString(), id.toString(), setId.toString())
                    console.log(response);
                    // setRoutine(await store.oneRoutine)
                    // await actions.oneRoutine(routine.id)

                    if (!response || response.error) throw new Error('Error al agregar el ejercicio')
                    resolve('Ejercicio agregado exitosamente')
                    setIsModalOpen(false)
                    await actions.oneRoutine(routine.id)
                }
            } catch (error) {
                reject(isExerciseAdded ? 'No se pudo eliminar el ejercicio' : 'No se pudo agregar el ejercicio')
            }
        })

        toast.promise(
            actionPromise,
            {
                pending: isExerciseAdded ? 'Eliminando ejercicio...' : 'Agregando ejercicio...',
                success: isExerciseAdded ? 'Ejercicio eliminado exitosamente 👌' : 'Ejercicio agregado exitosamente 👌',
                error: isExerciseAdded ? 'No se pudo eliminar el ejercicio 🤯' : 'No se pudo agregar el ejercicio 🤯',
            }
        )

        actionPromise.then(() => {
            console.log("HOLA");
            setAddedExercises(prevExercises => {
                if (isExerciseAdded) {
                    console.log("HOLA")

                    // Elimina el ejercicio de la lista
                    return prevExercises.filter(exercise => exercise.id !== id)
                } else {
                    // Agrega el ejercicio a la lista
                    const exerciseSet = setsList.find((item) => item.id == setId)
                    console.log(exerciseSet)
                    return [...prevExercises, { id, name, exerciseSet }]
                }
            })
        }).catch(error => {
            console.error(error)
        })
    }

    const handleOpenModal = (item) => {
        if (isExerciseSelected(item.id)) {
            handleAddExercises(item.id, item.name)
        } else {
            actions.allSets()
            setSelectedExercise({ id: item.id, name: item.name })
            console.log(item.id)
            setIsModalOpen(true)
        }
    }

    const isExerciseSelected = (id) => {
        return addedExercises.some(exercise => exercise.id === id)
    }
    const closeDropdown = () => setIsOpen(false)

    const toggleDropdown = (e) => {
        e.preventDefault()
        setIsOpen(!isOpen)
    }

    const filteredExercises = store.allExerciseList.filter((item) => {
        const matchesCategory = selectedCategory === "" || item.category === selectedCategory
        const matchesSearchTerm = item.name.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesCategory && matchesSearchTerm
    })

    function showTooltip(index) {
        const tooltip = document.getElementById(`tooltip-${index}`);
        if (tooltip) {
            tooltip.classList.remove('invisible', 'opacity-0');
            tooltip.classList.add('visible', 'opacity-100');
        }
    }

    function hideTooltip(index) {
        const tooltip = document.getElementById(`tooltip-${index}`);
        if (tooltip) {
            tooltip.classList.remove('visible', 'opacity-100');
            tooltip.classList.add('invisible', 'opacity-0');
        }
    }

    function truncateName(name) {
        const words = name.split(' ');
        if (words.length > 3) {
            return words.slice(0, 3).join(' ') + '...';
        }
        return name;
    }

    // // PREVIO A MOSTRAR EJERCICIOS EDITAR
    useEffect(() => {
        actions.allWeeklyRoutineUser()
    }, [store.allWeeklyRoutineUser, store.oneRoutine])
    useEffect(() => {
        actions.allExercise()
        actions.category()
    }, [])

    // useEffect(() => {
    //     console.log(routine);
    //     if (routine.exercises) {
    //         if (routine.exercises.length === 0) {
    //             handleDeleteSubmit(null, day)
    //         }
    //     }
    // }, [routine])
    return (
        <div tabIndex="-1" aria-hidden="true" className={`${isAddExerciseModalOpen ? '' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen bg-neutral-950/40 backdrop-blur-sm transition-all ease-in flex`}>
            <div className='bg-neutral-800 w-full flex flex-col'>
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
                                            <div>
                                                {item.name} - <span className="text-neutral-500">{item.exerciseSet.sets}/{item.exerciseSet.repetitions}</span>
                                            </div>
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
                <div className='h-[50vh] overflow-y-scroll'>
                    <div className="grid grid-cols-1 gap-4 w-full mx-auto p-2" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))" }}> {/* Grid adaptable */}

                        {filteredExercises.map((item, index) => {
                            return (
                                <article key={item.id} className="w-full h-40 flex bg-white transition-all shadow-xl dark:bg-neutral-900 border border-neutral-700 rounded-md">
                                    <div className="hidden sm:block sm:basis-36 w-1/2">
                                        <img
                                            alt=""
                                            src={item.image ? item.image : "https://placehold.jp/303031/878787/150x150.png?text=placeholder%20image"}
                                            className={`${item.image ? 'invert object-scale-down p-2' : ''} aspect-square h-full w-full object-cover overflow-hidden`}
                                            style={{
                                                filter: item.image ? 'invert(100%) sepia(100%) saturate(5000%) hue-rotate(67deg) brightness(83%)' : '',
                                            }}
                                        />
                                    </div>
                                    <div className="p-3 flex flex-1 flex-col gap-4 justify-between w-1/2">
                                        <div className="flex flex-col gap-3 dark:border-white/10 relative">
                                            <div
                                                id={`tooltip-${index}`}
                                                className="absolute -top-10 z-[99999] invisible px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition duration-300 dark:bg-gray-700 overflow-visible"
                                            >
                                                {item.name}
                                            </div>

                                            {/* Arreglar esto Tooltips */}
                                            <h3 className="font-bold text-neutral-900 dark:text-white" onMouseEnter={() => showTooltip(index)}
                                                onMouseLeave={() => hideTooltip(index)}>
                                                {truncateName(item.name)}
                                            </h3>


                                            <span className="rounded-full bg-neutral-800 px-2 w-fit py-1 text-xs font-medium lowercase text-neutral-400 text-center">
                                                {item.category}
                                            </span>
                                        </div>
                                        <div className="self-end">
                                            <input
                                                checked={isExerciseSelected(item.id)}
                                                onChange={() => handleOpenModal(item)} // Solo abre la modal al cambiar el estado del checkbox
                                                type="checkbox"
                                                id={`react-${index}`}
                                                className="peer hidden"
                                            />
                                            <label
                                                htmlFor={`react-${index}`}
                                                className="dark:hover:text-emerald-400 flex size-6 cursor-pointer items-center justify-center rounded-lg bg-white p-5 text-neutral-500 transition-all ease-in hover:bg-neutral-50 hover:text-emerald-400 active:scale-95 peer-checked:bg-gradient-to-br peer-checked:from-emerald-600 peer-checked:to-green-400 peer-checked:text-neutral-700 dark:border-emerald-600 dark:bg-neutral-800 dark:text-emerald-600 dark:hover:bg-neutral-700 dark:peer-checked:text-neutral-900"
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
                </div>

                <div className="mt-4 w-full flex gap-4 flex-col-reverse items-center sm:flex-row sm:w-fit self-end">
                    <button
                        type="button"
                        onClick={() => { setIsAddExerciseModalOpen(false), cerrarModalEjercicio() }}
                        className="disabled:bg-emerald-300 disabled:cursor-not-allowed bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded w-full sm:w-auto transition-all ease-in"
                    >
                        Finalizar
                    </button>
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                title="Elegir series y repeticiones"
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleFormSubmit}
                confirmText="Guardar ejercicio"
            >
                <form
                    className="space-y-4"
                >
                    <div className="flex flex-col gap-4">
                        <div className='flex flex-col md:flex-row gap-4 w-full'>
                            <div className="w-full">
                                <label htmlFor="sets" className="block mb-1 text-sm font-medium text-neutral-900 dark:text-white">Series</label>
                                <input
                                    value={setsInput}
                                    onChange={(e) => setSetsInput(e.target.value)}
                                    type="text" name="sets" id="sets" className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-neutral-600 dark:border-neutral-500 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 focus:ring-emerald-500 focus:border-emerald-500" placeholder="Ingrese las series" />
                            </div>
                            <div className="w-full">
                                <label htmlFor="reps" className="block mb-1 text-sm font-medium text-neutral-900 dark:text-white">Repeticiones</label>
                                <input
                                    value={repsInput}
                                    onChange={(e) => setRepsInput(e.target.value)}
                                    type="text" name="reps" id="reps" className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-neutral-600 dark:border-neutral-500 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 focus:ring-emerald-500 focus:border-emerald-500" placeholder="Ingrese las repeticiones" />
                            </div>
                        </div>
                        <span className="flex items-center">
                            <span className="h-px flex-1 bg-neutral-400"></span>
                            <span className="shrink-0 px-6 text-neutral-400">Elegir series previas</span>
                            <span className="h-px flex-1 bg-neutral-400"></span>
                        </span>
                        <div className="flex flex-col md:flex-row gap-4 w-full">
                            <div className="w-full">
                                <label
                                    htmlFor="series"
                                    className="block mb-1 text-sm font-medium text-neutral-900 dark:text-white"
                                >
                                    Series
                                </label>
                                <select
                                    value={selectSets}
                                    onChange={handleSelectChange}
                                    name="series"
                                    id="series"
                                    className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-neutral-600 dark:border-neutral-500 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 focus:ring-emerald-500 focus:border-emerald-500"

                                >
                                    <option value="">
                                        Select Series
                                    </option>
                                    {
                                        setsList.map((item, index) => (
                                            <option key={index} value={item.id}>{item.sets}/{item.repetitions}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>
        </div >
    )
};