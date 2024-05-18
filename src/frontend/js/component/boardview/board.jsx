import React from "react"

import Constants from "../../app/constants.js"
import Utils from "../../app/utils.js"

import { Context } from "../../store/appContext.jsx"

import useMouseTrack from "../../effects/useMouseTrack.jsx"

import List from "./list.jsx"

const
  _CANVAS_ACTION= { abort:-2, end:-1, none:0, pan:1, panmid:2, context:3, through:4 },
  _ZOOM_LEVELS= Utils.generateZoomLevels(.025, 10.0, 48, 24), // min, max, steps, 1.0 location
  _ITEMTYPE= [List, null]

/**
 *  -- Board --
 * 
 *  There was shitload of code involved in achieving this effect in JS+React, it was surelly a challenge ngl
 * 
 */
const Board= ()=>{

  // --------------------------------------------------------------- INITIALIZATION 

  const
    { store, actions }= React.useContext(Context),
    originRef= React.useRef(null),
    canvasRef= React.useRef(null),
    pointerStateRef= useMouseTrack(canvasRef) // Custom Hook I made for handling pointer behaviour

  const
    [ canvasAction, set_canvasAction ]= React.useState(_CANVAS_ACTION.none),
    [ canvasPosition, set_canvasPosition ]= React.useState([0,0]), // read this from userPrefs at startup ?
    [ canvasOffset, set_canvasOffset ]= React.useState([0,0]),
    [ canvasZoom, set_canvasZoom ]= React.useState(_ZOOM_LEVELS.indexOf(1.0))

  // hook contextMenu events on startup and register the mouse tracker so we can use them in lists/tasks
  React.useEffect(()=>{
    window.addEventListener("contextmenu", handleContextMenu)
    //actions.setMouseTracker(pointerStateRef) // register our mouse tracker in store so we can access it easily inside subcomponents
    return ()=>{
      window.removeEventListener("contextmenu", handleContextMenu)
      //actions.setMouseTracker(null) // remove mouse tracker on leave
    }
  },[])
  
  // initialize canvas size as soon as canvasRef gets the DOM element reference
  React.useEffect(()=>{
    if(originRef.current) originRef.current.style.setProperty("--canvas-size", Constants.BOARD_SIZE_PIXELS.toString() + "px")
  },[canvasRef.current])

  // --------------------------------------------------------------- ACTIONS

  // test any click event and check if we should start/end/update an action on our canvas
  React.useEffect(()=>{
    const 
      cursor= pointerStateRef.current.cursorState?? null,
      click= pointerStateRef.current.clickState?? null

    if(click && cursor){

      const
        zsort= pointerStateRef.current.utils.getZsort(canvasRef.current),
        lmb= click[Constants.MOUSE_BTN_LEFT]?.stage,
        wmb= click[Constants.MOUSE_BTN_MIDDLE]?.stage,
        rmb= click[Constants.MOUSE_BTN_RIGHT]?.stage

      if(canvasAction <= _CANVAS_ACTION.none){
        // start an action
        if(lmb===1) {
          if(zsort === 1) set_canvasAction(_CANVAS_ACTION.through)
          if(zsort === 0) { 
            set_canvasAction(_CANVAS_ACTION.pan)
            canvasRef.current.style.setProperty("--canvas-coords-transition", "none")
          }
        }
        else if(rmb===1 && zsort === 0) set_canvasAction(_CANVAS_ACTION.context)
        else if(wmb===1 && zsort !== -1) {
          set_canvasAction(_CANVAS_ACTION.panmid)
          canvasRef.current.style.setProperty("--canvas-coords-transition", "none")
        }
      }
      else {
        // end/abort current action
        if(rmb===1) set_canvasAction(_CANVAS_ACTION.abort)
        else switch(canvasAction){
          case _CANVAS_ACTION.pan:
          case _CANVAS_ACTION.panmid:
            if((lmb===2 && wmb===1) || (lmb===1 && wmb===2)) set_canvasAction(_CANVAS_ACTION.abort) // pressed another
            else if((lmb===0 && wmb===-1) || (lmb===-1 && wmb===0)) set_canvasAction(_CANVAS_ACTION.end) // released the original
            break;
          case _CANVAS_ACTION.through:
            if(lmb===-1) set_canvasAction(_CANVAS_ACTION.end)
            else if(wmb===1) set_canvasAction(_CANVAS_ACTION.abort)
            break;
        }
      }
    }
  },[pointerStateRef.current.clickState])

  // consumable actions
  React.useEffect(()=>{
    if(canvasAction != _CANVAS_ACTION.none) {
      switch(canvasAction){
        case _CANVAS_ACTION.abort:
          set_canvasAction(_CANVAS_ACTION.none)
          _restore()
          //console.log("action aborted")
          break
        case _CANVAS_ACTION.end:
          set_canvasAction(_CANVAS_ACTION.none)
          set_canvasPosition([canvasPosition[0]+canvasOffset[0], canvasPosition[1]+canvasOffset[1]]) // save offset
          _restore()
          //console.log("action ended")
          break
        case _CANVAS_ACTION.context:
          //console.log("action started: context")
          set_canvasAction(_CANVAS_ACTION.none)
          break
      }
    }

    function _restore(){
      set_canvasOffset([0,0])
      canvasRef.current.style.setProperty("--canvas-coords-transition", "translate 75ms linear")
    }
  },[canvasAction])

  // --------------------------------------------------------------- MOUSE POSITION
  
  // drive mouse position change related tasks based on current mode (panning/moving/resizing)
  React.useEffect(()=>{

    if(canvasAction == _CANVAS_ACTION.pan || canvasAction == _CANVAS_ACTION.panmid) {

      //console.log(pointerStateRef.current)

      const
        delta= pointerStateRef.current.cursorState?.delta?.size?? [0,0],
        zoomFactor= 1.0 / _ZOOM_LEVELS[canvasZoom]

      set_canvasOffset([(delta[0] * zoomFactor) | 0, (delta[1] * zoomFactor) | 0])
    }

  },[pointerStateRef.current.cursorState?.coords])
  
  // apply canvas position
  React.useEffect(()=>{
    const center= Constants.BOARD_SIZE_PIXELS * -.5
    canvasRef.current.style.setProperty("--canvas-coords-x", (center + canvasPosition[0]).toString() + "px" )
    canvasRef.current.style.setProperty("--canvas-coords-y", (center + canvasPosition[1]).toString() + "px" )
  },[canvasPosition])
  
  // apply canvas offset
  React.useEffect(()=>{
    const center= Constants.BOARD_SIZE_PIXELS * -.5
    //canvasRef.current.style.setProperty("--canvas-offset-x", (canvasOffset[0]).toString() + "px" )
    //canvasRef.current.style.setProperty("--canvas-offset-y", (canvasOffset[1]).toString() + "px" )
    canvasRef.current.style.setProperty("--canvas-coords-x", (center + canvasPosition[0]+canvasOffset[0]).toString() + "px" )
    canvasRef.current.style.setProperty("--canvas-coords-y", (center + canvasPosition[1]+canvasOffset[1]).toString() + "px" )
  },[canvasOffset])

  // --------------------------------------------------------------- ZOOM 

  // handle zoom changes
  React.useEffect(()=>{
    const pointer= pointerStateRef.current

    if(pointer.cursorState && pointer.utils.getZsort(canvasRef.current) >= 0 && canvasAction == _CANVAS_ACTION.none){
      const delta= pointerStateRef.current.zoomDelta
      
      if(delta){
        const
          viewHalf= [window.innerWidth*.5, window.innerHeight*.5],
          current= pointerStateRef.current.cursorState?.coords?.client?? [0,0],
          new_canvasZoom= delta < 0 ? canvasZoom < _ZOOM_LEVELS.length-1 ? canvasZoom+1 : canvasZoom : canvasZoom > 0 ? canvasZoom-1 : canvasZoom
  
        if(new_canvasZoom != canvasZoom) {
  
          // double click functionality here:
  
          //const 
          //  zoom= _zoom_levels[new_canvasZoom],
          //  factor= delta < 0 ? -1.0 : 1.0,
          //  new_canvasPosition= [
          //    canvasPosition[0] + (current[0] - viewHalf[0]) * factor,
          //    canvasPosition[1] + (current[1] - viewHalf[1]) * factor,
          //  ]
  
          const
            zoom= _ZOOM_LEVELS[canvasZoom],
            new_zoom= _ZOOM_LEVELS[new_canvasZoom],
            factor= -1.0,
            offset= [
              (current[0] - viewHalf[0]) * (1/zoom) * factor,
              (current[1] - viewHalf[1]) * (1/zoom) * factor
            ],
            offsetb= [
              (current[0] - viewHalf[0]) * (1/new_zoom) * factor,
              (current[1] - viewHalf[1]) * (1/new_zoom) * factor
            ],
            new_canvasPosition= [
              (canvasPosition[0] + (offset[0] - offsetb[0])) | 0,
              (canvasPosition[1] + (offset[1] - offsetb[1])) | 0,
            ]
  
          originRef.current.style.setProperty("--canvas-zoom", new_zoom)
          
          set_canvasPosition(new_canvasPosition) // zoom towards pointer
          set_canvasZoom(new_canvasZoom)
        }
      }
    }
  },[pointerStateRef.current.zoomDelta])

  // --------------------------------------------------------------- RETURN 

	return (
    <>
      <div ref={originRef} id="board-canvas-origin" className="relative pointer-skip">
        <div ref={canvasRef} id="board-canvas" className="flex px-8 py-4 gap-6 cursor-grab">
          <div id="board-canvas-background" />
          { store.devPrefs.devRender &&
            <>
              <div className="marker-x bg-blue-800 absolute my-auto" />
              <div className="marker-y bg-red-800 absolute mx-auto" />
            </>
          }
          <div id="board-canvas-content">
            { store.board.itemCount > 0 &&
              store.board.items.map((e,i)=>{
                const Type= _ITEMTYPE[e.type]
                return <Type key={`${i}-${e.id}`} {...e.meta} />
              })
            }
          </div>
        </div>
      </div>
      { store.devPrefs.devRender && _getDevBoxElement() }
    </>
	)
  
  // --------------------------------------------------------------- HELPERS & OTHER 

  function handleContextMenu(e){
    const ps= pointerStateRef.current.cursorState
    if(ps!=null && ps.zsort!== undefined && ps.zsort===0) e.preventDefault()
  }

  // dev element
  function _getDevBoxElement(){
    const
      ps= pointerStateRef.current.cursorState,
      cs= pointerStateRef.current.clickState,
      zd= pointerStateRef.current.zoomDelta

    //console.log(ps?.target)

    return (
      <div className="flex flex-col absolute bottom-8 left-4 text-stone-400 bg-black bg-opacity-40 py-1 px-2 pointer-events-none">
        <span>canvasState= {`x:${canvasPosition[0]} y:${canvasPosition[1]} ox:${canvasOffset[0]} oy:${canvasOffset[1]} cz:${_ZOOM_LEVELS[canvasZoom]}`}</span>
        <span>pointerState= { ps ?
            `x:${ps.coords?.client[0]} y:${ps.coords?.client[1]} b:${ps.bounds?1:0} s:${ps.zsort} c:${cs.data[0].stage}|${cs.data[1].stage}|${cs.data[2].stage}| z:${zd}`
            :
            "waiting for canvas ref..."
          }
        </span>
      </div>
    )
  }
}

export default Board
