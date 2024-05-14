import React from "react"
import { Context } from "../../store/appContext.jsx"

const List = () => {
	const { store, actions } = React.useContext(Context)

	return (
		<div className="bg-slate-300 text-black w-2/12">
      HELLO WORLD
		</div>
	)
}

export default List
