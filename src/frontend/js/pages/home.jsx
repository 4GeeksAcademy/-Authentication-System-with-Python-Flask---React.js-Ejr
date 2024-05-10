import React from "react"
import { Context } from "../store/appContext.jsx"
import rigoImageUrl from "../../assets/img/rigo-baby.jpg"

export const Home = () => {
	const { store, actions } = React.useContext(Context);

	const health_vars= store.backend_ready ?
		{ text: "success", style: "border-indigo-600 bg-indigo-800" } :
		{ text: "failed", style: "border-red-600 bg-red-800" }

	return (
		<div className="w-full flex-auto text-center items-center mt-5">
			<h1>Hello mf kids i killed that rigobitch</h1>
			<img className="mx-auto" src={rigoImageUrl} />
			<div className={"border-y-4 text-4xl text-white font-mono py-5 my-3 " + health_vars.style}>
				Backend connection: {health_vars.text}
			</div>
		</div>
	)
}
