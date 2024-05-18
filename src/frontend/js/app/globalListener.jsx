import React from "react"
import { Context } from "../store/appContext.jsx"

/**
 * This is probably one of the most usefull and needed shit i've realized any project should have
 * it's just a component that u place at the root of the page, in layout, then u write here any 
 * store listeners that should work globally, no matter what page you are in
 * 
 * it renders nothing, it acts as a passive component
 */
const GlobalListener=()=>{
  const { store, actions }= React.useContext(Context)

  // TODO: global redirect listener

  // TODO: global userState listener (so we dont check the user session on EVERY page)
}

export default GlobalListener