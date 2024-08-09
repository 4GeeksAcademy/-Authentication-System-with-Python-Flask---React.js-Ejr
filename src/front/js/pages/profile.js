import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import ProfileIcon from "../component/profileIcon";


export const Profile = () => {
	const { store, actions } = useContext(Context);


	return (
		<div className="lg:w-1/3 w-11/12 mx-auto flex flex-col items-center gap-4 justify-between overflow-y-auto py-5 px-3 h-full bg-neutral-800 border-neutral-700">
			<h1 className="text-neutral-50 font-bold text-3xl">Perfil</h1>
			<div className="flex flex-col items-center">
				<ProfileIcon />
				<h2 className="text-neutral-50 font-bold text-3xl">Mariana Lopez</h2>
				<p className="text-neutral-400 font-bold text-base">marilop@gmail.com</p>
			</div>
			<div className="flex flex-col text-neutral-200 sm:w-11/12 w-4/6 p-6 gap-4">

				{/* <div className="grid gap-1">
					<div className="text-xs font-bold uppercase text-neutral-400">Email</div>
					<div>marilop@gmail.com</div>
				</div> */}
				<div className="grid gap-1">
					<div className="text-xs font-bold uppercase text-neutral-400">Fecha de nacimiento</div>
					<div className="text-lg">16/10/1990</div>
				</div>
				<div className="grid gap-1">
					<div className="text-xs font-bold uppercase text-neutral-400">Sexo</div>
					<div className="text-lg">Mujer</div>
				</div>
				<div className="grid gap-1">
					<div className="text-xs font-bold uppercase text-neutral-400">Peso</div>
					<div className="text-lg">63kgs</div>
				</div>
				<div className="grid gap-1">
					<div className="text-xs font-bold uppercase text-neutral-400">Altura</div>
					<div className="text-lg">1.65m</div>
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
