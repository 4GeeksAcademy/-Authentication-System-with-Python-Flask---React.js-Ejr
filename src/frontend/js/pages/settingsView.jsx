import React from "react"

import { Context } from "../store/appContext.jsx"

const SettingsView = () => {
  const { store, actions }= React.useContext(Context)
  
	return (
		<div className="w-full flex-auto text-center items-center mt-5">
      <h1>Hello world // Settings View // Requires Auth</h1>
      { store.fakeUser ?
        <div className="py-5">
          <img className="mx-auto" src={store.fakeUser.avatar} />
          <p>username: {store.fakeUser.username}</p>
          <p>email: {store.fakeUser.username}</p>
        </div>
        :
        <p>no user logged</p>
      }
      { store.fakeUser &&
        <p>fakeUser active</p>
      }
      { !store.fakeUser &&
        <p>please log in</p>
      }
    </div>
	)
}

export default SettingsView