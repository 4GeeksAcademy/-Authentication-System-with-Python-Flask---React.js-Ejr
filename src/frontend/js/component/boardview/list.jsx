import React from "react"
import Constants from "../../app/constants.js"

import { Context } from "../../store/appContext.jsx"

import mysvg from "../../../assets/img/Blender.svg?raw"

import Element from "./element.jsx"

const List = ({title, coords, bref}) => {
  
  // --------------------------------------------------------------- INITIALIZATION 

	const 
    { store, actions } = React.useContext(Context),
    itemRef= React.useRef(null)

  const 
    [ itemState, _scs ]= React.useState({
      title: title,
      coords: { x:coords[0], y:coords[1] },
      offset: { x:0, y:0 },
      size: { x:0, y:0 },
      dirty: 0,
      timestamp: Date.now()
    }),
    [ elementList, set_elementList ]= React.useState([])
  
  function merge_itemState(new_state){ _scs({ ...Object.assign(itemState, { ...new_state, timestamp: Date.now() })})}

  React.useEffect(()=>{ 
    bref[0].current[bref[1]]= {
      get: (prop)=> { return !prop ? itemRef : itemState[prop] }, 
      set: (prop, value)=>{ merge_itemState(prop, value) }
    }

    merge_itemState({dirty:Constants.ITEM_DIRTY.all})
  },[])

  // --------------------------------------------------------------- DIRTY UPDATES
  
  // apply canvas position changes
  React.useEffect(()=>{
    if(itemState.dirty != 0){
      const itemStyle= itemRef.current.style
  
      if(itemState.dirty & Constants.ITEM_DIRTY.coords){
        itemStyle.setProperty("--item-coords-x", itemState.coords.x + "px" )
        itemStyle.setProperty("--item-coords-y", itemState.coords.y + "px" )
      }
  
      if(itemState.dirty & Constants.ITEM_DIRTY.size){
        itemStyle.setProperty("--item-size-x", itemState.size.x + "px")
        itemStyle.setProperty("--item-size-y", itemState.size.y + "px")
      }
  
      if(itemState.dirty & Constants.ITEM_DIRTY.style){
      }
      
      if(itemState.dirty & Constants.ITEM_DIRTY.cursor){
      }
  
      merge_itemState({dirty:0})
    }
  },[itemState.dirty])
  
  // --------------------------------------------------------------- CONTEXTUAL MENU 
    
  function handleContextualMenu(e){
    if(pointerUtils.getZsort(canvasRef.current) === 0) {
      console.log("board context menu!")
      e.preventDefault()
    }
  }

  // --------------------------------------------------------------- BUTTON HANDLES

  function handleAddRowButton(e) {
    const new_elementList= structuredClone(elementList)
    new_elementList.push("empty row...")
    set_elementList(new_elementList)
  }

  function handleStylesButton(e) {
    console.log("styles button")
  }

  function handleMenuButton(e) {
    console.log("menu button")
  }

  // --------------------------------------------------------------- RETURN 

	return (
		<div ref={itemRef} className="k--list k--ghostifyable h-min min-w-80 rounded-lg cursor-auto dark:bg-zinc-900 dark:text-white">
    <img src={mysvg} />
      <div className="flex flex-col h-full justify-between">
        <div>
          <button data-knob="grab" className="w-full h-4 cursor-move hover:text-zinc-500 pointer-skip-below dark:text-zinc-700">
            <div className="w-fit mx-auto">
              <i className="-translate-y-1 fa fa-solid fa-grip-lines text-xl" />
            </div>
          </button>
          <h3 className="mx-4 h-8 font-bold text-xl">{itemState.title}</h3>
          <div className="flex flex-col m-2 gap-2">
            { elementList.length > 0 ? 
              elementList.map((e,i)=>
                <Element key={`tel-${i}`} title={e}/>
              )
              :
              <div className="h-1 w-full dark:bg-zinc-800" />
            }
          </div>
        </div>
        <div className="flex flex-row justify-between h-6  relative text-lg dark:text-zinc-600">
          <button className="flex dark:hover:text-zinc-400" onClick={handleAddRowButton}>
            <i className="mx-2 mb-2 fa fa-solid fa-plus my-auto" />
            <span className="-mt-1.5">Add Row</span>
          </button>
          <div className="flex">
            <div className="flex mr-4 gap-3">
              <ListSmallButton icon="fa-solid fa-palette" onClick={handleStylesButton} />
              <ListSmallButton icon="fa-solid fa-bars" onClick={handleMenuButton} />
            </div>
            <i className="mx-2 mb-2 fa fa-solid fa-grip-lines my-auto scale-105 -rotate-45" />
            <button data-knob="resize" className="absolute cursor-se-resize size-8 right-0 bottom-0" />
          </div>
        </div>
      </div>
		</div>
	)
}

export default List

const ListSmallButton= ({ icon, onClick})=>{
  return (
    <button className="flex dark:hover:text-zinc-400" onClick={onClick}>
      <i className={"fa " + {icon}} />
    </button>
  )
}
