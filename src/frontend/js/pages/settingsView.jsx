import React from "react"

import { Context } from "../store/appContext.jsx"

const SettingsView = () => {
  const { store, actions }= React.useContext(Context)
  
	return (
		<div className="w-full flex-auto text-center items-center mt-5">
      <h1>Hello world // Settings View // Requires Auth</h1>
      { store.userData ?
        <div className="py-5">
          <img className="mx-auto min-w-40" src={store.userData.avatar} />
          <p>username: {store.userData.username}</p>
          <p>alias: {store.userData.displayname}</p>
          <p>email: {store.userData.email}</p>
        </div>
        :
        <p>no user logged</p>
      }
      { store.userData &&
        <p>user!</p>
      }
      { !store.userData &&
        <p>please log in</p>
      }
    </div>
	)
}

export default SettingsView