import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom"
import "../../styles/home.css";
import ProfileIcon from "../component/profileIcon";
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export const Profile = () => {
  const { store, actions } = useContext(Context);
  const [isModalOpen, setIsModalOpen] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Crear una promesa para manejar el login
    const deleteAccount = new Promise(async (resolve, reject) => {
      const success = await actions.deleteAccount()
      if (success === true) {
        resolve("Cuenta Eliminada")
      } else {
        reject("Elimincacion fallida")
      }
    })

    toast.promise(
      deleteAccount,
      {
        pending: 'Eliminando...',
        success: 'Cuenta eliminada exitosamente 👌',
        error: 'No se pudo eliminar su cuenta 🤯'
      }
    )

    deleteAccount.then(() => {
      navigate("/")
    }).catch((error) => {
      console.error(error)
    })
  }

  return (
    <div className="lg:w-1/3 w-11/12 mx-auto flex flex-col items-center gap-4 justify-between overflow-y-auto py-5 px-3 h-full bg-neutral-800 border-neutral-700">
      <h1 className="text-neutral-50 font-bold text-3xl">Perfil</h1>
      <div className="flex flex-col items-center">
        {
          !store.currentUser ? <>
            <div role="status" className="animate-pulse rtl:space-x-reverse md:flex md:items-center">
              <div className="size-40 rounded-full flex items-center justify-center bg-neutral-300 dark:bg-neutral-700">
                <svg className="w-10 h-10 text-neutral-200 dark:text-neutral-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <spanath d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
              </div>
              <span className="sr-only">Loading...</span>
            </div>
          </> : <ProfileIcon gender={store.currentUser.user.sex} />
        }

        <h2 className=" text-neutral-50 font-bold text-3xl">
          {!store.currentUser
            ? <>
              <div role="status" className="max-w-sm animate-pulse">
                <div className="h-10 bg-neutral-200 rounded-full dark:bg-neutral-700 w-20"></div>
                <span className="sr-only">Loading...</span>
              </div>
            </>
            : store.currentUser.user.name
          }
        </h2>
        <span className="text-neutral-400 font-bold text-base">
          {!store.currentUser
            ? <>
              <div role="status" className="max-w-sm animate-pulse">
                <div className="h-4 bg-neutral-200 rounded-full dark:bg-neutral-700 w-32 mt-3"></div>
                <span className="sr-only">Loading...</span>
              </div>
            </>
            : store.currentUser.user.email
          }
        </span>
      </div>
      <div className="flex flex-col text-neutral-200 sm:w-11/12 w-4/6 p-6 gap-4">

        {/* <div className="grid gap-1">
					<div className="text-xs font-bold uppercase text-neutral-400">Email</div>
					<div>marilop@gmail.com</div>
				</div> */}
        <div className="grid gap-1">
          <div className="text-xs font-bold uppercase text-neutral-400">Fecha de nacimiento</div>
          <div className="text-lg">
            {
              !store.currentUser
                ? <>
                  <div role="status" className="max-w-sm animate-pulse">
                    <div className="h-6 bg-neutral-200 rounded-full dark:bg-neutral-700 w-28"></div>
                    <span className="sr-only">Loading...</span>
                  </div>
                </>
                : new Date(store.currentUser.user.birthday).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric"
                })
            }
          </div>
        </div>
        <div className="grid gap-1">
          <div className="text-xs font-bold uppercase text-neutral-400">Sexo</div>
          <div className="text-lg">{!store.currentUser
            ? <>
              <div role="status" className="max-w-sm animate-pulse">
                <div className="h-6 bg-neutral-200 rounded-full dark:bg-neutral-700 w-32 mt-3"></div>
                <span className="sr-only">Loading...</span>
              </div>
            </>
            : store.currentUser.user.sex
          }</div>
        </div>
        <div className="grid gap-1">
          <div className="text-xs font-bold uppercase text-neutral-400">Peso</div>
          <div className="text-lg">
            {!store.currentUser
              ? <>
                <div role="status" className="max-w-sm animate-pulse">
                  <div className="h-6 bg-neutral-200 rounded-full dark:bg-neutral-700 w-16"></div>
                  <span className="sr-only">Loading...</span>
                </div>
              </>
              : store.currentUser.user.name // cambiar este valor al correcto
            }
          </div>
        </div>
        <div className="grid gap-1">
          <div className="text-xs font-bold uppercase text-neutral-400">Altura</div>
          <div className="text-lg">
            {!store.currentUser
              ? <>
                <div role="status" className="max-w-sm animate-pulse">
                  <div className="h-6 bg-neutral-200 rounded-full dark:bg-neutral-700 w-20"></div>
                  <span className="sr-only">Loading...</span>
                </div>
              </>
              : store.currentUser.user.name // cambiar este valor al correcto
            }
          </div>
        </div>

        <div className="grid gap-1">
          <div className="text-xs font-bold uppercase text-neutral-400">IMC</div>
          <div>23.1</div>
        </div>
      </div>
      {/* <button type="button" className="place-self-center inline-block rounded border border-current px-5 py-3 text-sm font-medium text-neutral-400 hover:text-red-300 transition hover:scale-105 hover:shadow-xl focus:outline-none active:text-red-500 active:scale-95" href="#">Desactivar cuenta</button> */}
      {/* <!-- Modal toggle --> */}
      <button onClick={() => setIsModalOpen(true)} className="place-self-center inline-block rounded border border-current px-5 py-3 text-sm font-medium text-neutral-400 hover:text-red-300 transition hover:scale-105 hover:shadow-xl focus:outline-none active:text-red-500 active:scale-95" type="button">
        Eliminar cuenta
      </button>

      {/* <!-- Main modal --> */}
      <div id="default-modal" tabindex="-1" aria-hidden="true" className={`${isModalOpen ? '' : 'hidden'}  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen bg-neutral-950/40 backdrop-blur-sm transition-all ease-in flex`}>
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          {/* <!-- Modal content --> */}
          <div className="relative rounded-lg shadow dark:bg-neutral-700">
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-neutral-700">
              <h3 className="text-xl text-neutral-50 font-bold">
                Eliminar cuenta permanentemente
              </h3>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-neutral-400 bg-transparent hover:bg-neutral-200 hover:text-neutral-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-neutral-600 dark:hover:text-white" data-modal-hide="default-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="p-4 md:p-5 space-y-4">
              <p className="text-xs font-bold uppercase text-neutral-400">
                Su cuenta se eliminara de manera permanente, asi como sus rutinas e informacion fisica.
              </p>
            </div>
            {/* <!-- Modal footer --> */}
            <div className="flex items-center p-4 md:p-5 border-t border-neutral-200 rounded-b dark:border-neutral-600">
              <button onClick={handleSubmit} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Eliminar Cuenta</button>
              <button onClick={() => setIsModalOpen(false)} type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-neutral-900 focus:outline-none bg-white rounded-lg border border-neutral-200 hover:bg-neutral-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-neutral-100 dark:focus:ring-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-600 dark:hover:text-white dark:hover:bg-neutral-700">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
