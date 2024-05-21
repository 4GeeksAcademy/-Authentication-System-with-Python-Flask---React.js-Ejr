import React from "react"
import { useLocation } from "react-router-dom"
import { Context } from "../store/appContext.jsx"

/**
 * This is probably one of the most usefull and needed shit i've realized any project should have
 * it's just a component that u place at the root of the page, in layout, then u write here any 
 * short of listeners that should work globally, independent of the page you are in
 * 
 * it renders nothing, it just acts as a passive component that acts right on the page or the store
 */
const GlobalListener=()=>{
  const 
    { store, actions }= React.useContext(Context),
    location= useLocation()

  /** -------------------------------------------------------------------------- HOVER BOX */

  React.useEffect(()=>{
    window.addEventListener("mousemove", handleHoverBox)
    return ()=>{ window.removeEventListener("mousemove", handleHoverBox)}
  },[])

  function handleHoverBox(e){
    if(e.target){
      const t= e.target
      if(t.getAttribute("data-hover")){
        
      }
    }
  }

  /** -------------------------------------------------------------------------- TITLE UPDATER */
  
  React.useEffect(()=>{
    const path= window.location.href.match(/(?<=\/)[^:\.\/]+($|(?=\/))/)
    console.log("page.title." + (path ? path[0] : "root"))
  },[location])

  /** -------------------------------------------------------------------------- TODO: global redirect listener */

  /** -------------------------------------------------------------------------- TODO: global userState listener */
}

export default GlobalListener