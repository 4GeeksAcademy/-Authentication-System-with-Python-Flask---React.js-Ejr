
import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";


export const ErrorView = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="grid min-h-[60vh] place-content-center px-4">
            <div className="text-center">
                <h1 className="text-9xl font-black text-neutral-200">404</h1>

                <p className="text-2xl font-bold tracking-tight text-neutral-50 sm:text-4xl">¡Lo sentimos!</p>

                <p className="mt-4 text-neutral-50">No encontramos esa página... pero puedes volver a el inicio</p>

                <Link
                    to="/"
                    className="mt-6 inline-block rounded text-neutral-50 bg-emerald-600 px-5 py-3 text-sm font-mediumfocus:ring hover:bg-emerald-600 hover:text-neutral-900 focus:outline-none active:bg-emerald-500 transition-all duration-100 ease-in"
                >
                    Ir al Inicio
                </Link>
            </div>
        </div >
    );
};
