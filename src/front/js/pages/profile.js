import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import ProfileIcon from "../component/profileIcon";
import { toast } from "react-toastify";

export const Profile = () => {
  const { store, actions } = useContext(Context)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userData, setUserData] = useState({
    height: null,
    weight: null,
    // date: ,
  })

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const signupPromise = new Promise(async (resolve, reject) => {
      // const success = await actions.signup(
      //     user.weight,
      //     user.height,
      // );
      // if (success === true) {
      //     resolve("Registro exitoso");
      // } else {
      //     reject("Error al registrarse");
      // }
      // success = true
    });

    // toast.promise(
    //   signupPromise,
    //   {
    //     pending: 'Registrando...',
    //     success: 'Registro exitoso 😎',
    //     error: 'Error al registrarse'
    //   }
    // );

    console.log(userData);
  };

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


      {/* modal toggle */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="block text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded text-sm px-5 py-3 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
          type="button"
        >
          Editar información física
        </button>
        <button type="button" className="place-self-center inline-block rounded border border-current px-5 py-3 text-sm font-medium text-neutral-400 hover:text-red-300 transition hover:scale-105 hover:shadow-xl focus:outline-none active:text-red-500 active:scale-95" href="#">Desactivar cuenta</button>
      </div>
      {/* modal */}
      <div id="crud-modal" tabindex="-1" aria-hidden="true" className={`${isModalOpen ? '' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen bg-neutral-950/40 backdrop-blur-sm transition-all ease-in flex`}>
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-neutral-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-neutral-600">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                Información física
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-neutral-400 bg-transparent hover:bg-neutral-200 hover:text-neutral-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-neutral-600 dark:hover:text-white"
              >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 md:p-5">
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2 sm:col-span-1">
                  <label for="weight" className="block mb-2 text-sm font-medium text-neutral-900 dark:text-white">Peso (kg)</label>
                  <input value={userData.weight}
                    step="0.1"
                    onChange={handleChange} type="number" name="weight" id="weight" className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-neutral-600 dark:border-neutral-500 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 focus:ring-emerald-500 focus:border-emerald-500" placeholder="76,8" required />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label for="height" className="block mb-2 text-sm font-medium text-neutral-900 dark:text-white">Altura (cm)</label>
                  <input value={userData.height}
                    onChange={handleChange} type="number" name="height" id="height" className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-neutral-600 dark:border-neutral-500 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 focus:ring-emerald-500 focus:border-emerald-500" placeholder="178 cm" required />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="date" className="block text-sm font-medium text-neutral-700 dark:text-neutral-200">
                    Fecha de hoy
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={new Date().toISOString().split('T')[0]}
                    className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-neutral-600 dark:border-neutral-500 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 focus:ring-emerald-500 focus:border-emerald-500"
                    readOnly
                  />
                </div>
              </div>
              <button type="submit" className="text-white inline-flex items-center bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800 transition-all ease-in">
                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                Guardar cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
