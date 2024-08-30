import React from 'react'
import { MultiStepForm } from '../component/multiStepForm'

export const CreateRoutine = () => {
  // useEffect(() => {
  //   const handleOnBeforeUnload = (event) => {
  //     console.log('el usuario se fue de la página')
  //     event.preventDefault()
  //     return (event.returnValue = '')
  //   }
  //   window.addEventListener('beforeunload', handleOnBeforeUnload, { capture: true })
  // }, []);

  return (
    <div className="min-h-screen justify-center">
      <MultiStepForm />
    </div>
  )
}
