import React from "react"
import Constants from "../../app/constants.js"

import { Context } from "../../store/appContext.jsx"

import Element from "./element.jsx"

import useClickDrag from "../../effects/useClickDrag.jsx"

const List = ({title, coords}) => {
	const 
    { store, actions } = React.useContext(Context),
    [ elementList, set_elementList ]= React.useState([]),
    [ localOffset, set_localOffset ]= React.useState([0,0]),
    [ localCoords, set_localCoords ]= React.useState(coords),
    moveRef= React.useRef(null),
    resizeRef= React.useRef(null),
    moveDrag= useClickDrag(Constants.MOUSE_BTN_LEFT, moveRef),
    resizeDrag= useClickDrag(Constants.MOUSE_BTN_LEFT, resizeRef)

  function handleAddRowButton(e) {
    const new_elementList= structuredClone(elementList)
    new_elementList.push("empty row...")
    set_elementList(new_elementList)
  }
  
  React.useEffect(()=>{
    if(moveDrag?.delta) {
      console.log(moveDrag.delta[0], moveDrag.delta[1])
      
    }
  },[moveDrag])
  
  React.useEffect(()=>{
    if(resizeDrag?.delta) {
      console.log(resizeDrag.delta[0], resizeDrag.delta[1])
    }
  },[resizeDrag])

	return (
		<div className="k--list h-min bg-zinc-900 text-white min-w-80 rounded-lg cursor-auto" style={{"--list-coords-x": localCoords[0] + "px", "--list-coords-y": localCoords[1] + "px"}}>
      <div className="flex flex-col h-full justify-between">
        <div>
          <div ref={moveRef} className="h-4 cursor-move text-zinc-700 hover:text-zinc-500">
            <div className="w-fit mx-auto">
              <i className="-translate-y-1 fa fa-solid fa-grip-lines text-xl" />
            </div>
          </div>
          <div className="flex justify-between text-xl">
            <h3 className="mx-6 h-8 font-bold">{title}</h3>
            <div className="flex mx-4 my-auto gap-3">
              <button className="p-0.5 bg-zinc-800 text-zinc-600 w-8 rounded-md hover:bg-zinc-700 hover:text-zinc-400"><i className="fa fa-solid fa-palette" /></button>
              <button className="p-0.5 bg-zinc-800 text-zinc-600 w-8 rounded-md hover:bg-zinc-700 hover:text-zinc-400"><i className="fa fa-solid fa-bars " /></button>
            </div>
          </div>
          <div className="flex flex-col m-2 gap-2">
            { elementList.length > 0 ? 
              elementList.map((e,i)=>
                <Element key={`tel-${i}`} title={e}/>
              )
              :
              <div className="flex h-12">
                <div className="w-fit m-auto text-lg">- this is emptier than my hearth -</div>
              </div>
            }
          </div>
        </div>
        <div className="flex flex-row justify-between h-6 text-zinc-600 relative text-lg">
          <button className="flex hover:text-zinc-400" onClick={handleAddRowButton}>
            <i className="mx-2 mb-2 fa fa-solid fa-plus my-auto" />
            <span className="-mt-1.5">Add Row</span>
          </button>
          <i className="mx-2 mb-2 fa fa-solid fa-grip-lines my-auto scale-105 -rotate-45" />
          <button ref={resizeRef} className="absolute cursor-se-resize size-8 right-0 bottom-0" />
        </div>
      </div>
		</div>
	)
}

export default List
