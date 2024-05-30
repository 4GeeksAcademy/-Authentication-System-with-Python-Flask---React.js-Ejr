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
          <div className="breadcumb flex font-bold text-xl">
            {
              store.navbarBreadcumb.map((e,i)=>{
                const last= store.navbarBreadcumb.length -1 == i
                return (
                  <>
                    <button key={`ncb-${i}`} onClick={()=>{nav(e[1])}}><LocalizedString label={e[0]} /></button>
                    { !last && 
                      <span className="font-black text-3xl text-primary-n dark:text-accent-n">&gt;</span>
                    }
                  </>
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

