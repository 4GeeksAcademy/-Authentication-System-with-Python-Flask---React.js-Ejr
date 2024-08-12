import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import ProfileIcon from "../component/profileIcon";

export const Profile = () => {
  const { store, actions } = useContext(Context);

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
                <div className="h-6 bg-gray-200 rounded-full dark:bg-neutral-700 w-32 mt-3"></div>
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

      <button type="button" className="place-self-center inline-block rounded border border-current px-5 py-3 text-sm font-medium text-neutral-400 hover:text-red-300 transition hover:scale-105 hover:shadow-xl focus:outline-none active:text-red-500 active:scale-95" href="#">Desactivar cuenta</button>
    </div>
  );
};
