import React from "react"
import { Context } from "../../store/appContext.jsx"

const Task = ({ label }) => {
	const { store, actions } = React.useContext(Context)

	return (
    <div className="flex h-12 rounded-md bg-zinc-200 dark:bg-zinc-800">
      <div className="my-auto">
        <span className="mx-4 text-lg">{label}</span>
      </div>
		</div>
	)
}

export default Task
