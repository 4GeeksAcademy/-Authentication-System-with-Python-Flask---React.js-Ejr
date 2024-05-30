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
    [ lastUpdate, set_lastUpdate ]= React.useState({ millistamp:0, interval:1 }),
    { bid }= useParams(),
    lastUpdateRef= React.useRef(lastUpdate),
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

  React.useEffect(()=>{
    const last= lastUpdateRef.current?? null
    if(store.board && last){

      setTimeout(async ()=>{

        const idnum= Number(bid??"-1")

        console.log(`fetch changes, upload changes | boardid: ${bid}`)
        const res= await actions.boards_fetch(idnum, lastUpdateRef.current??0)
        console.log(res)
  
        Utils.clamp((nextUpdate= res ? lastUpdate[1]*2 : lastUpdate[1]*res*.85)|0, 250, 5000)
  
        set_lastUpdate({millistamp: res ? Date.now() : last.millistamp, interval: nextUpdate})
  
      }, last.interval)
    }
  },[lastUpdateRef.current?.interval])

  React.useEffect(()=>{ async function handle(){
    
    const idnum= Number(bid??"-1")
    if(!store.board || store.board.id !== idnum || idnum < 0) {

      console.log(store.board!=null, store.board?.id??null, idnum)
      console.log(!store.board==null, store.board?.id??null !== Number(idnum), idnum < 0)

      console.log(`loading board: ${idnum}`)
      await actions.boards_instance_get(idnum) // board gets into 'store.board'
      
      if(store.board){
        const millis= store.board.millis
        set_lastUpdate({ millistamp:millis, interval:250 })
        //actions.getFontAwesomeIconList()
      }
    }
  } handle() },[store.board])

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