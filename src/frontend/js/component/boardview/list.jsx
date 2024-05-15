import React from "react"
import { Context } from "../../store/appContext.jsx"

import Element from "./element.jsx"
import Utils from "../../app/utils.js"

const List = () => {
	const 
    { store, actions } = React.useContext(Context)

  function handleMove(e){
    Utils.cancelEvent(e)
    if(Utils.isMouseLeft(e)){
      console.log("move started")
      window.addEventListener('mouseup', acceptListener)
      window.addEventListener('mousedown', cancelListener)
    }
  }

  function handleResize(e){
    Utils.cancelEvent(e)
    if(Utils.isMouseLeft(e)){
      console.log("resize started")
      window.addEventListener('mouseup', acceptListener)
      window.addEventListener('mousedown', cancelListener)
    }
  }

  function acceptListener(e){
    if(Utils.isMouseLeft(e)){
      Utils.cancelEvent(e)
      console.log("event ended")
      window.removeEventListener('mouseup', acceptListener) // remove itself
      window.removeEventListener('mousedown', cancelListener)
    }
  }

  function cancelListener(e){
    if(Utils.isMouseRight(e)){
      Utils.cancelEvent(e)
      console.log("event canceled")
      window.removeEventListener('mouseup', acceptListener)
      window.removeEventListener('mousedown', cancelListener) // remove itself
    }
  }

	return (
		<div className="h-min bg-zinc-900 text-white min-w-80 rounded-lg">
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="h-4 cursor-move" onMouseDown={e=>{handleMove(e)}}>
            <div className="w-fit mx-auto">
              <i className="-translate-y-1 fa fa-solid fa-grip-lines text-zinc-700 text-xl" />
            </div>
          </div>
          <div className="flex justify-between text-xl">
            <div className="mx-6 h-8 font-bold">[Title]</div>
            <button><i className="mx-4 my-auto fa fa-solid fa-palette text-zinc-600 hover:text-zinc-400" /></button>
          </div>
          <div className="flex flex-col m-2 gap-2">
            <Element />
            <Element />
            <Element />
            <Element />
            <Element />
          </div>
        </div>
        <div className="flex flex-row justify-between h-6 text-zinc-600 relative text-lg">
          <button className="flex hover:text-zinc-400">
            <i className="mx-2 mb-2 fa fa-solid fa-plus my-auto" />
            <span className="-mt-2">Add Row</span>
          </button>
          <i className="mx-2 mb-2 fa fa-solid fa-grip-lines my-auto scale-105 -rotate-45" />
          <button className="absolute cursor-se-resize size-8 right-0 bottom-0" onMouseDown={e=>{handleResize(e)}} />
        </div>
      </div>
		</div>
	)
}

export default List
