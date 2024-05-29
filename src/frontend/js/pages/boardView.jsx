import React from "react"
import { useParams } from "react-router-dom"
import Constants from "../app/constants.js"

import { Context } from "../store/appContext.jsx"

import Toolbar from "../component/boardview/toolbar.jsx"
import SidePanel from "../component/boardview/sidepanel.jsx"

import Board from "../component/boardview/board.jsx"
import ContextMenu from "../component/contextmenu/contextmenu.jsx"

import { useGlobalPointerHook } from "../effects/useGlobalPointerHook.jsx"

import Utils from "../app/utils.js"

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

  React.useEffect(()=>{ async function handle(){
    if(actions.getStoreDirty(Constants.STORE_DIRTY.location))
      if(!store.board || store.board.id !== bid || bid < 0) {

        console.log(`loading board: ${bid}`)
        await actions.loadBoard(bid)

        const tickIntervalId= setInterval(async ()=>{
          console.log(`fetch changes, upload changes | boardid: ${bid}`)
          changes= await actions.fetchBoard(bid)
          if(changes.length > 0){
            // apply changes
            console.log("board changed remotelly, downloading changes")
          }
        }, 1000)

        return ()=>{ clearInterval(tickIntervalId) }
        //actions.getFontAwesomeIconList()
      }
  } handle() },[store.dirty])

  return (
    <div ref={selfRef} className="flex flex-col h-full overflow-hidden relative -z-50 select-none">
      { store.readyState.pointer && store.board &&
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