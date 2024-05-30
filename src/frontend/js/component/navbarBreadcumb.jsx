import React from "react"
import { useNavigate } from "react-router-dom"
import { Context } from "../store/appContext.jsx"
import LocalizedString from "./localizedString.jsx"

const NavbarBreadcumb= ()=>{
  const 
    { store, actions }= React.useContext(Context),
    nav= useNavigate()

  return (
    <div className="flex p-2">
      { store.navbarBreadcumb && 
        <>
          <div className="flex font-body font-bold text-xl text-stone-600 dark:text-zinc-500 select-none gap-2">
            {
              store.navbarBreadcumb.map((e,i)=>{
                const last= store.navbarBreadcumb.length -1 == i
                return (
                  <div key={`bci-${i}`} className="flex gap-2">
                    <span className="whitespace-pre font-black text-2xl text-purple-800 dark:text-accent-n scale-y-150 -mt-1">&gt;</span>
                    <button key={`ncb-${i}`} onClick={e[1] ? ()=>{nav(e[1])} : null}><LocalizedString label={e[0]} /></button>
                  </div>
                )

              }
                
              )
            }
          </div>
        </>
      }
    </div>
  ) 
}

export default NavbarBreadcumb

