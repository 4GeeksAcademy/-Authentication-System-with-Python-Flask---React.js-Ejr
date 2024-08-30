import React, { useState, useContext, useEffect } from "react"
import { Context } from "../store/appContext"
import { toast } from "react-toastify"
import { Modal } from "./modal"
import { FormSteps } from "./formSteps"
import { StepsCount } from "./stepsCount"
import { useNavigate } from "react-router-dom"

export const MultiStepForm = () => {
  const { store, actions } = useContext(Context)
  const navigate = useNavigate();
  const [step, setStep] = useState(1) // Para controlar el paso actual
  const [formData, setFormData] = useState({
    routineName: '',
    selectedDay: '',
    exercises: ''
  })
  const [addedExercises, setAddedExercises] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [cancelRoutineCreation, setCancelRoutineCreation] = useState(false)
  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false)
  const [selectedExercise, setSelectedExercise] = useState({ id: '', name: '' })
  const [setsInput, setSetsInput] = useState('')
  const [repsInput, setRepsInput] = useState('')
  const [selectSets, setSelectSets] = useState('')

  const setsList = store.allSetsList.slice(0, 5)

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

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSetsInput('')
    setRepsInput('')
    setSelectSets('')
  }

  const handleInputChange = (input) => (e) => {
    setFormData({
      ...formData,
      [input]: e.target.value
    })
  }


  const handleNextStep = () => setStep(step + 1)
  const handlePreviousStep = () => setStep(step - 1)

  const handleOnDeleteRoutine = () => {
    actions.deleteRoutine(store.routineData.id)
    handleFinishRoutine()
    setCancelRoutineCreation(false)
  }

  const handleCreateRoutine = async (e) => {
    e.preventDefault()

    // promesa para manejar la creación de la rutina
    const createRoutine = new Promise(async (resolve, reject) => {
      try {
        const routineResponse = await actions.postRoutine(formData.routineName)

        if (!routineResponse || routineResponse.error) {
          throw new Error(routineResponse?.error || 'Error al crear la rutina')
        }

        // si se crea la rutina, se resuelve la promesa
        resolve('Rutina creada exitosamente')
        actions.setCompleteRoutine(false)
        // Avanzar al siguiente paso
        handleNextStep()
      } catch (error) {
        reject(error.message)
      }
    })

    // Usar toast.promise para mostrar los estados de la promesa
    toast.promise(
      createRoutine,
      {
        pending: 'Creando rutina...',
        success: 'Rutina creada exitosamente ',
        error: {
          render({ data }) {
            return data
          },
        },
      }
    )
  }



  const handleChooseDays = async (e) => {
    e.preventDefault()

    // promesa para manejar la asociación de la rutina con los días
    const chooseDays = new Promise(async (resolve, reject) => {
      try {
        const weekResponse = await actions.postWeeklyRoutine(
          store.routineData.id.toString(),
          formData.selectedDay
        )
        if (!weekResponse || weekResponse.error) {
          throw new Error('Error al asociar la rutina con los días')
        }
        // Si se asocian correctamente, resolver la promesa
        resolve('Rutina asociada exitosamente')
        // Avanzar al siguiente paso
        handleNextStep()
      } catch (error) {
        // Rechazar la promesa en caso de error
        console.log(error)
        reject('Error al asociar la rutina con los días')
      }
    })

    // Usar toast.promise para mostrar los estados de la promesa
    toast.promise(
      chooseDays,
      {
        pending: 'Guardando día y semana...',
        success: 'Guardado exitosamente 👌',
        error: 'No se pudo guardar 🤯',
      }
    )
  }


  const handleAddExercises = async (id, name, setId) => {
    const isExerciseAdded = addedExercises.some(exercise => exercise.id === id)

    const actionPromise = new Promise(async (resolve, reject) => {
      try {
        let response
        if (isExerciseAdded) {
          // Elimina el ejercicio si ya está agregado
          response = await actions.deleteExerciseRoutine(store.routineData.id.toString(), id.toString())
          if (!response || response.error) throw new Error('Error al eliminar el ejercicio')
          resolve('Ejercicio eliminado exitosamente')
        } else {
          // Agrega el ejercicio si no está en la rutina
          response = await actions.postExerciseRoutine(store.routineData.id.toString(), id.toString(), setId.toString())
          if (!response || response.error) throw new Error('Error al agregar el ejercicio')
          resolve('Ejercicio agregado exitosamente')
          setIsModalOpen(false)
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
      setAddedExercises(prevExercises => {
        if (isExerciseAdded) {
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
    console.log(addedExercises)
  }

  const isExerciseSelected = (id) => {
    return addedExercises.some(exercise => exercise.id === id)
  }

  const handleStepCircle = (index) => {
    if (step > index) {
      return "bg-emerald-800 text-emerald-500" // Completado
    } else if (step === index) {
      return "bg-emerald-500 text-emerald-100" // Paso actual
    } else {
      return "bg-neutral-800 text-neutral-300" // No alcanzado
    }
  }

  const handleProgressBar = (step) => {
    if (step == 1) {
      return "w-5" // paso 1
    } else if (step == 2) {
      return "w-1/2" // paso 2
    } else {
      return "w-full" // paso 3
    }
  }

  const handleFinishRoutine = () => {
    navigate("/routine")
    setFormData({
      routineName: '',
      selectedDay: '',
      exercises: ''
    })
    setSelectedExercise({ id: '', name: '' })
    setRepsInput('')
    setSetsInput('')
    setSelectSets('')
    setStep(1)
    setAddedExercises([])
    setIsFinishModalOpen(false)
    actions.setCompleteRoutine(true)
  }

  const handleStepText = (index) => {
    if (step > index) {
      return "text-emerald-400" // Completado
    } else if (step === index) {
      return "text-emerald-50" // Paso actual
    } else {
      return "text-neutral-500" // No alcanzado
    }
  }

  const filteredExercises = store.allExerciseList.filter((item) => {
    const matchesCategory = selectedCategory === "" || item.category === selectedCategory
    const matchesSearchTerm = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearchTerm
  })

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

  const handleSelectChange = (e) => {
    setSelectSets(e.target.value)
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

  useEffect(() => {
    actions.allExercise()
    actions.category()
  }, [])

  return (
    <div className="w-3/4 mx-auto flex rounded-md flex-col items-center gap-4 justify-between overflow-y-auto py-5 px-5 h-full bg-neutral-800 border-neutral-700 relative">

      {/* form title */}
      <span className="relative flex justify-center w-full sm:w-3/4">
        <div
          className="absolute inset-x-0 top-1/2 h-px -translate-y-3/4 bg-red bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-75"
        ></div>
        <span className="relative z-10 text-white font-bold px-2 sm:px-6 bg-neutral-800 sm:text-xl">Crea tu rutina</span>
      </span>

      {/* form steps */}
      <StepsCount step={step} handleProgressBar={handleProgressBar} handleStepCircle={handleStepCircle} handleStepText={handleStepText} />

      <FormSteps step={step} setCancelRoutineCreation={setCancelRoutineCreation} formData={formData} setIsFinishModalOpen={setIsFinishModalOpen} handleChooseDays={handleChooseDays} handleCreateRoutine={handleCreateRoutine} handleInputChange={handleInputChange} filteredExercises={filteredExercises} addedExercises={addedExercises} selectedCategory={selectedCategory} searchTerm={searchTerm} setSearchTerm={setSearchTerm} setSelectedCategory={setSelectedCategory} handleOpenModal={handleOpenModal} isExerciseSelected={isExerciseSelected} handleAddExercises={handleAddExercises} />

      <Modal
        isOpen={isModalOpen}
        title="Elegir series y repeticiones"
        onClose={handleCloseModal}
        // onConfirm={handleFormSubmit}
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
        <button type="submit" onClick={handleFormSubmit} className="absolute bottom-4 text-white inline-flex items-center bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800 transition-all ease-in">
          <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
          Guardar ejercicio
        </button>
      </Modal>

      <Modal
        isOpen={isFinishModalOpen}
        title="¿Seguro que quieres finalizar?"
        onClose={() => setIsFinishModalOpen(false)}
        onConfirm={handleFinishRoutine}
      />

      <Modal
        isOpen={cancelRoutineCreation}
        title="¿Seguro que quieres cancelar la creación?"
        onClose={() => setCancelRoutineCreation(false)}
        onConfirm={handleOnDeleteRoutine}
      >
        <p className="text-neutral-400">Esto eliminará lo creado hasta el momento.</p>
      </Modal>

    </div >
  )
}