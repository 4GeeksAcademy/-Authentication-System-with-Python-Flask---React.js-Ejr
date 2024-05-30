import React from "react"
import { useNavigate } from "react-router-dom"
import { Context } from "../store/appContext.jsx"

const NavbarBreadcumb= ()=>{
  const 
    { language, store, actions }= React.useContext(Context),
    nav= useNavigate()

  return (
    <div className="flex p-2">
      { store.navbarBreadcumb && 
        <>
          <div className="flex">
            {
              store.navbarBreadcumb.map((e,i)=>
                <button key={`ncb-${i}`} onClick={()=>{nav(e[1])}}>{e[0]}</button>
              )
            }
          </div>
        </>
      }
    </div>
  ) 
}

export default NavbarBreadcumb

