import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useLocation } from "react-router-dom";
import { LogoGymtrack } from "./logoGymtrack";

export const SideMenu = () => {
  const { store, actions } = useContext(Context);
  const location = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };


  const menuItems = [
    {
      to: '/',
      label: 'Inicio',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={location.pathname === '/' ? '2' : '1.5'} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-home"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l-2 0l9 -9l9 9l-2 0" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>
      )
    },
    {
      to: '/dashboard',
      label: 'Dashboard',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-layout-board"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" /><path d="M4 9h8" /><path d="M12 15h8" /><path d="M12 4v16" /></svg>
      )
    },
    {
      to: '/statistics',
      label: 'Estadísticas',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={location.pathname === '/statistics' ? '2' : '1.5'} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chart-bar"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 13a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M15 9a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M9 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M4 20h14" /></svg>
      )
    },
    {
      to: '/routine/new',
      label: 'Crear rutina',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={location.pathname === '/routine/new' ? '2' : '1.5'} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-barbell"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M2 12h1" /><path d="M6 8h-2a1 1 0 0 0 -1 1v6a1 1 0 0 0 1 1h2" /><path d="M6 7v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1 -1v-10a1 1 0 0 0 -1 -1h-1a1 1 0 0 0 -1 1z" /><path d="M9 12h6" /><path d="M15 7v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1 -1v-10a1 1 0 0 0 -1 -1h-1a1 1 0 0 0 -1 1z" /><path d="M18 8h2a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-2" /><path d="M22 12h-1" /></svg>
      )
    },
    {
      to: '/exercises',
      label: 'Ejercicios',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={location.pathname === '/exercises' ? '2' : '1.5'} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-stretching"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M16 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M5 20l5 -.5l1 -2" /><path d="M18 20v-5h-5.5l2.5 -6.5l-5.5 1l1.5 2" /></svg>
      )
    },
    {
      to: '/weight',
      label: 'Peso corporal',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={location.pathname === '/weight' ? '2' : '1.5'} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-scale-outline"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 3m0 4a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z" /><path d="M12 7c1.956 0 3.724 .802 5 2.095l-2.956 2.904a3 3 0 0 0 -2.038 -.799a3 3 0 0 0 -2.038 .798l-2.956 -2.903a6.979 6.979 0 0 1 5 -2.095z" /></svg>
      )
    },
    {
      to: '/profile',
      label: 'Perfil',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={location.pathname === '/profile' ? '2' : '1.5'} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-user"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
      )
    }
  ];

  return (
    <>
      <button
        onClick={toggleSidebar}
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 text-sm text-neutral-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-600 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:ring-neutral-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 md:w-64 w-screen h-screen transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} backdrop-blur`}
        aria-label="Sidenav"
      >
        <div className="flex flex-col overflow-y-auto py-5 px-3 h-full border-r bg-neutral-900/75 border-neutral-700 w-screen md:w-64">
          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center">
              <LogoGymtrack logoSize="medium" />
            </div>
            <button
              onClick={closeSidebar}
              aria-controls="default-sidebar"
              type="button"
              className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-neutral-500 rounded-lg hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:ring-neutral-600"
            >
              <span className="sr-only">Close sidebar</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-x"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M18 6l-12 12" />
                <path d="M6 6l12 12" />
              </svg>
            </button>
          </div>
          {store.currentUser ? (
            <div className="flex flex-col h-full justify-between">
              <ul className="space-y-2">
                {menuItems.map(item => (
                  <li key={item.to} className="flex items-center justify-between">
                    <Link
                      to={item.to}
                      onClick={closeSidebar}
                      className={`flex items-center w-full p-2 text-base font-normal rounded-lg group hover:bg-neutral-700 dark:hover:bg-neutral-800 ${location.pathname === item.to ? 'text-emerald-500' : 'text-neutral-900 dark:text-neutral-200'
                        }`}
                    >
                      {item.icon}
                      <span className="ml-3">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => {
                  actions.logout();
                  closeSidebar();
                }}
                type="button"
                className="place-self-center inline-block rounded border border-current px-5 py-3 text-sm font-medium text-neutral-400 hover:text-red-300 transition hover:scale-105 hover:shadow-xl focus:outline-none active:text-red-500 active:scale-95"
              >
                Cerrar sesión
              </button>
            </div>
          ) : (
            <ul className="space-y-2 flex flex-col w-full">
              <li className="flex w-full items-center active:scale-95 transition-all">
                <Link to='/login'
                  className="flex w-full justify-center items-center gap-2 rounded border border-emerald-600 px-12 py-3 text-sm font-medium text-emerald-400 hover:bg-emerald-600 hover:text-neutral-900 focus:outline-none active:bg-emerald-500"
                  onClick={closeSidebar}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-login-2"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" /><path d="M3 12h13l-3 -3" /><path d="M13 15l3 -3" /></svg>
                  <span className="text-sm font-bold"> Iniciar Sesión </span>
                </Link>
              </li>
              <li className="flex w-full items-center active:scale-95 transition-all">
                <Link to='/signup'
                  onClick={closeSidebar}
                  className="flex w-full justify-center items-center gap-2 rounded border border-emerald-600 px-12 py-3 text-sm font-medium text-emerald-400 hover:bg-emerald-600 hover:text-neutral-900 focus:outline-none active:bg-emerald-500 transition-all duration-100 ease-in"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-user-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M16 19h6" /><path d="M19 16v6" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4" /></svg>
                  <span className="text-sm font-bold"> Registrarse </span>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </aside>

      <div
        className={`fixed top-0 right-0 h-screen transition-opacity duration-300 z-[30] backdrop-blur ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ width: isSidebarOpen ? `calc(100% - 16rem)` : '0' }}
        onClick={closeSidebar}
      ></div>
    </>
  );
};
