import React from 'react'

export const StepsCount = ({ step, handleProgressBar, handleStepCircle, handleStepText,  }) => {
  return (
    <div className="w-full mb-10">
      <h2 className="sr-only">Steps</h2>

      <div className="relative after:mt-4 after:block after:h-1 after:w-full after:rounded-lg after:bg-neutral-200">
        <div className={`absolute bottom-0 h-1 transition-all ease-in rounded-full bg-emerald-500 ${handleProgressBar(step)}`}></div>
        <ol className="grid grid-cols-3 text-sm font-medium text-neutral-500">
          <li className="relative flex justify-start text-emerald-600">
            <span className={`absolute -bottom-[1.90rem] start-0 rounded-full transition-all ease-in ${handleStepCircle(1)}`}>
              <svg
                className="size-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </span>

            <span className={`hidden sm:block ${handleStepText(1)}`}> Nombre </span>

            <svg xmlns="http://www.w3.org/2000/svg" width="24" reps="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`${handleStepText(1)} size-6 sm:hidden icon icon-tabler icons-tabler-outline icon-tabler-pencil`}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>
          </li>

          <li className="relative flex justify-center text-emerald-600">
            <span className={`absolute -bottom-[1.90rem] left-1/2 transform -translate-x-1/2 rounded-full transition-all ease-in ${handleStepCircle(2)}`}>
              {
                step >= 2 ? (
                  <svg
                    className="size-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <div className="size-6 rounded-full border-[3px] border-neutral-800 bg-neutral-400">
                  </div>
                )
              }
            </span>

            <span className={`hidden sm:block ${handleStepText(2)}`}> Dia </span>

            <svg xmlns="http://www.w3.org/2000/svg" width="24" reps="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`${handleStepText(2)} mx-auto size-6 sm:hidden icon icon-tabler icons-tabler-outline icon-tabler-calendar-month`}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" /><path d="M16 3v4" /><path d="M8 3v4" /><path d="M4 11h16" /><path d="M7 14h.013" /><path d="M10.01 14h.005" /><path d="M13.01 14h.005" /><path d="M16.015 14h.005" /><path d="M13.015 17h.005" /><path d="M7.01 17h.005" /><path d="M10.01 17h.005" /></svg>
          </li>

          <li className="relative flex justify-end">
            <span className={`absolute -bottom-[1.90rem] end-0 rounded-full transition-all ease-in ${handleStepCircle(3)}`}>
              {
                step == 3 ? (
                  <svg
                    className="size-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <div className="size-6 rounded-full border-[3px] border-neutral-800 bg-neutral-400">
                  </div>
                )
              }
            </span>

            <span className={`hidden sm:block ${handleStepText(3)}`}> Ejercicios </span>

            <svg xmlns="http://www.w3.org/2000/svg" width="24" reps="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`${handleStepText(3)} size-6 sm:hidden icon icon-tabler icons-tabler-outline icon-tabler-barbell`}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M2 12h1" /><path d="M6 8h-2a1 1 0 0 0 -1 1v6a1 1 0 0 0 1 1h2" /><path d="M6 7v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1 -1v-10a1 1 0 0 0 -1 -1h-1a1 1 0 0 0 -1 1z" /><path d="M9 12h6" /><path d="M15 7v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1 -1v-10a1 1 0 0 0 -1 -1h-1a1 1 0 0 0 -1 1z" /><path d="M18 8h2a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-2" /><path d="M22 12h-1" /></svg>
          </li>
        </ol>
      </div>
    </div>
  )
}