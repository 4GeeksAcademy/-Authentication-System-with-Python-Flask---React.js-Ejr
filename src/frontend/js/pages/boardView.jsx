import React from "react"
import { useParams } from "react-router-dom"
import Constants from "../app/constants.js"

import { Context } from "../store/appContext.jsx"

import Toolbar from "../component/boardview/toolbar.jsx"
import SidePanel from "../component/boardview/sidepanel.jsx"

import Board from "../component/boardview/board.jsx"
import ContextMenu from "../component/contextmenu/contextmenu.jsx"

import { useGlobalPointerHook } from "../effects/useGlobalPointerHook.jsx"

/* had to make this here as circular imports aren't allowed */
import List from "../component/boardview/list.jsx"
import Task from "../component/boardview/task.jsx"
import Utils from "../app/utils.js"

const _ITEMCLASSES= Object.freeze([
  null,  
  null,  
  null,  
  null,  
  null,  
  List,  
  Task,  
  null,  
  null,  
  null
])

/**
 *  -- Board View --
 * 
 *  Renders a board loading it from URL param 'bid' (board ID)
 *  if nothing is given, or ids doesn't get any result, we should render some custom "error, board not found" component/view
 */
const BoardView= ()=>{
  const
    { store, actions }= React.useContext(Context),
    [ contextMenu, set_contextMenu ]= React.useState(null),
    { bid }= useParams(),
    selfRef= React.useRef(null)

  // custom stateless React Hook I made for handling pointer behaviour
  useGlobalPointerHook()

  // register item classes
  React.useEffect(()=>{ 
    if(!store.itemclasses) actions.setItemClasses(_ITEMCLASSES) 
  },[])

  // register custom event listener
  React.useEffect(()=>{ 
    if(selfRef.current) {
      window.addEventListener("k-contextmenu", onContexMenu)
      return ()=>{
        window.removeEventListener("k-contextmenu", onContexMenu)
      }
    }
  },[selfRef.current])

  async function onContexMenu(e){
    const props= e.detail
    set_contextMenu(null)
    if(props) {
      await Utils.waitUntil(()=>contextMenu===null)
      await Utils.wait(50)
      set_contextMenu(<ContextMenu {...props} />)
    }
  }

  React.useEffect(()=>{ 
    if(store.dirty & Constants.STORE_DIRTY.location) {
      // TODO: load the board from database then store the data in some React state
      //    something like actions.getBoard(pid, bid)
      //    then pass that data to the Board component
      console.log(`boardView: load board ${bid}`)
      //actions.getFontAwesomeIconList()
    }
  },[store.dirty])

  React.useEffect(()=>{
    // TODO: load the board from database then store the data in some React state
    //    something like actions.getBoard(pid, bid)
    //    then pass that data to the Board component
    console.log(`boardView: load board ${bid}`)
    //actions.getFontAwesomeIconList()

  },[store.dirty.location])

  return (
    <div ref={selfRef} className="flex flex-col h-full overflow-hidden relative -z-50">
      { store.itemclasses && store.readyState.pointer && store.board &&
        <>
          <div className="pointer-skip absolute inset-0 flex">
{/*             <Toolbar />
            <SidePanel /> */}
          </div>
          <Board/>
        </>
      }
      { contextMenu }
    </div>
  )
}

export default BoardView