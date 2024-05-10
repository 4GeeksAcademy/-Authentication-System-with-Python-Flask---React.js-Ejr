import React from "react"
import { Context } from "../store/appContext.jsx"
import rigoImageUrl from "../../assets/img/rigo-baby.jpg"
import "../../styles/home.css"

export const Home = () => {
	const { store, actions } = React.useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Hello mf kids i killed that rigobitch</h1>
			<p><img src={rigoImageUrl} /></p>
			<div className="alert alert-danger">
				Backend connection: {store.backend_health ? "failed" : "success"}
			</div>
		</div>
	)
}
