import React from "react"

import { Context } from "../../store/appContext.jsx"

import List from "./list.jsx"

import backgroundImage from "../../../assets/img/dev-grid.png"

/**
 *  -- Mouse Handling for Canvas Simulation --
 * 
 *  This is a little tricky, it requires to 
 * 
 * @returns 
 */
const useCanvasHooks= (canvasRef)=>{
  const
    [ cursorState, set_cursorState ]= React.useState(null),
    [ clickState, set_clickState ]= React.useState(null),
    [ zoomDelta, set_zoomDelta ]= React.useState(0)
  
  React.useEffect(()=>{
    if(canvasRef.current){
      const eventListeners= [
        ["mousedown", handleMusPress],
        ["mouseup", handleMusRelease],
        ["mousemove", handleMusPosition],
        ["wheel", handleMusZoom]
      ]
      for(let el of eventListeners) window.addEventListener(el[0], el[1])
      console.log("canvas listeners added")

      return ()=>{
        for(let el of eventListeners) window.removeEventListener(el[0], el[1])
        console.log("canvas listeners removed")
      }
    }
  },[canvasRef.current])
  
  React.useEffect(()=>{ if(zoomDelta != 0) set_zoomDelta(0) },[zoomDelta]) // restore zoom state to neutral

  function handleMusPress(e){ set_clickState(e.button) }
  function handleMusRelease(e){ set_clickState(null) }

  function handleMusPosition(e){
    let new_cursorState= null
    if(e && canvasRef.current){
      const 
        pos= [e.clientX, e.clientY],
        rect= canvasRef.current.getBoundingClientRect(),
        zsort= e.target===canvasRef.current ? 0 : canvasRef.current.contains(e.target) ? 1 : -1

      new_cursorState= {
          position: pos,
          target: e.target,
          bounds: zsort > -1 && _doesBBoxContain(...pos, rect),
          zsort: zsort
        }
    }
    set_cursorState(new_cursorState)
  }

  function handleMusZoom(e){ set_zoomDelta(e.deltaY) }

  function _doesBBoxContain(x,y,rect) { return x > rect.left && y > rect.top && x < rect.right && y < rect.bottom }
  
  return {
    cursorState,
    clickState,
    zoomDelta
  }
}

let _context_menu= true

/**
 *  -- Board --
 * 
 *  There was shitload of code involved in achieving this effect in JS+React, it was surelly a challenge ngl
 * 
 */
const Board= ()=>{
  const
    { store, actions }= React.useContext(Context),
    canvasElement= React.useRef(null),
    canvasState= useCanvasHooks(canvasElement) // Custom Hook I made for handling canvas behaviour

  const
    ps= canvasState?.cursorState?? null,
    cs= canvasState?.clickState?? -1,
    zd= canvasState?.zoomDelta?? 0

  _context_menu= ps?.zsort!== undefined && ps?.zsort!==0

  React.useEffect(()=>{
    window.addEventListener("contextmenu", handleContextMenu)
    return ()=>{
      window.removeEventListener("contextmenu", handleContextMenu)
    }
  },[])

  const
    full= 262144,
    half= 131072,
    posx= ps?.position ? ps.position[0] : 0,
    posy= ps?.position ? ps.position[1] : 0

  const 
    fullpx= `${full}px`,
    posxpx= `${-half+posx}px`,
    posypx= `${-half+posy}px`

  const canvasStyle= {
    minWidth: fullpx, width: fullpx, maxWidth: fullpx,
    minHeight: fullpx, height: fullpx, maxHeight: fullpx,
    background:`url('${backgroundImage}') repeat`,
    transform: `translate(${posxpx}, ${posypx})`
  }

  const originStyle= {
    margin: "auto",
    //transform: `translate(50vw, 50vh)`
  }
  
	return (
    <>
      <div ref={canvasElement} className="flex px-8 py-4 gap-6 -z-40" style={canvasStyle} >
        <div className="bg-red-800 absolute mx-auto w-1 h-full" />  
        <div className="bg-blue-800 absolute my-auto h-1 w-full" />
        <div id="origin" style={originStyle}>
          <List />
        </div>
      </div>
      <div className="flex flex-col absolute bottom-8 left-4 text-devcolor bg-black py-1 px-2">
        { ps ?
          <span>{`pointerState= x:${ps.position[0]} y:${ps.position[1]} b:${ps.bounds?1:0} s:${ps.zsort} c:${cs} z:${zd}`}</span>
          :
          <span>waiting for canvas...</span>
        }
      </div>
    </>
	)
  
  function handleContextMenu(e){
    if(!_context_menu) e.preventDefault()
  }
}

export default Board
