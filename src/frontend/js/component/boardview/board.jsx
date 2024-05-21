import React from "react"

import Constants from "../../app/constants.js"
import Utils from "../../app/utils.js"

import { Context } from "../../store/appContext.jsx"

import useContextualMenu from "../../effects/useContextualMenu.jsx"
import getPointerHook from "../../effects/useGlobalPointerHook.jsx"

const
  _ACTION_ID= { end:0, context:1, grab:3, resize: 4, pan:5 },
  _ZOOM_LEVELS= Utils.generateZoomLevels(.025, 10.0, 48, 24) // min, max, steps, 1.0 location

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
    [ pointer, pointerUtils ]= getPointerHook(),
    canvasRef= React.useRef(null)

  useContextualMenu(handleContextualMenu)

  const
    [ canvasState, _scs ]= React.useState({
      action: null,
      item: null,
      size: { x:0, y:0 },
      coords: { x:0, y:0 },
      offset: { x:0, y:0 },
      origin: { x:0, y:0 },
      zoom: Utils.getClosestIndex(_ZOOM_LEVELS, 1.0),
      dirty: 0,
      timestamp: Date.now()
    }),
    [childItems, set_childItems]= React.useState([]),
    itemUtils= React.useRef([])

  function merge_canvasState(new_state){ _scs({ ...Object.assign(canvasState, { ...new_state, timestamp: Date.now() })})}

  React.useEffect(()=>{

    if(store.items.length > 0){

      const content= store.board.content
      if(content?.length > 0){

        itemUtils.current= Array(content.length)

        const react= content.map((c,i)=>{

          const item= store.items.find(e=>e.id===c)
          if(item) {
            const Type= store.itemclasses[item.type]
            return <Type key={`${item.id}|${item.bid}`} id={item.id} bref={[itemUtils, i]} {...item.props} />
          }
        }).filter(e=>e!=null)
        set_childItems(react)
        console.log(`board contains ${react.length} items`)
      }
      else console.log(`empty board with id: ${store.board.id}`)
    }
    
  },[store.board])
 
  React.useEffect(()=>{ merge_canvasState({dirty:Constants.CANVAS_DIRTY.all}) },[canvasRef])
  
  // --------------------------------------------------------------- DIRTY UPDATES 
  
  // apply canvas changes and clear the dirty state
  React.useEffect(()=>{
    if(canvasState.dirty>0) {

      const dirty= canvasState.dirty

      const 
        half= store.board.size * .5,
        originStyle= canvasRef.current.parentNode.style,
        canvasStyle= canvasRef.current.style

      if(dirty & Constants.CANVAS_DIRTY.size){
        originStyle.setProperty("--canvas-size", store.board.size.toString() + "px")
        originStyle.setProperty("--canvas-size-half", half.toString() + "px")
      }

      if(dirty & Constants.CANVAS_DIRTY.zoom){
        originStyle.setProperty("--canvas-zoom", _ZOOM_LEVELS[canvasState.zoom])
      }

      if((dirty & Constants.CANVAS_DIRTY.coords) | (dirty & Constants.CANVAS_DIRTY.origin)){
        const 
          coords= canvasState.coords,
          offset= canvasState.offset,
          origin= [half+store.board.origin[0], half+store.board.origin[1]]
        canvasStyle.setProperty("--canvas-coords-x", ((-origin[0] + coords.x+offset.x)|0) + "px" )
        canvasStyle.setProperty("--canvas-coords-y", ((-origin[1] + coords.y+offset.y)|0) + "px" )
      }

      if(dirty & Constants.CANVAS_DIRTY.style){
      }

      if(dirty & Constants.CANVAS_DIRTY.background){
        canvasStyle.setProperty("--canvas-background", `url('${store.board.background}')` )
      }
      
      if(dirty & Constants.CANVAS_DIRTY.cursor){
        const panning= canvasState.action === _ACTION_ID.pan || canvasState.action === _ACTION_ID.panmid
        canvasStyle.setProperty("--canvas-cursor", panning ? "grabbing" : "auto" )
      }

      merge_canvasState({dirty:0})
    }
  },[canvasState.timestamp])
  
  // --------------------------------------------------------------- CONTEXTUAL MENU 
    
  function handleContextualMenu(e){
    if(pointerUtils.getZsort(canvasRef.current) === 0) {
      console.log("board context menu!")
      e.preventDefault()
    }
  }

  // --------------------------------------------------------------- ACTIONS

  // double click happened
  React.useEffect(()=>{
    if(pointer.current.double.button !== -1){

      if(pointerUtils.getZsort(canvasRef.current) === 0){
        const
          half= store.board.size * .475,
          cur_coords= canvasState.coords,
          mus_coords= pointer.current.coords,
          viewFactor= [ window.innerWidth*.5, window.innerHeight*.5 ],
          mus_point= [ (mus_coords.x - viewFactor[0]) * -1.0, (mus_coords.y - viewFactor[1]) * -1.0 ],

          zoominv= 1/_ZOOM_LEVELS[canvasState.zoom],

          new_coords= {
            x: Utils.clamp(cur_coords.x + (mus_point[0] * zoominv | 0), -half, half),
            y: Utils.clamp(cur_coords.y + (mus_point[1] * zoominv | 0), -half, half),
          }

        merge_canvasState({
          coords: new_coords,
          dirty: Constants.CANVAS_DIRTY.coords
        })
      }
    }
  },[pointer.current.double])

  // test any click event and check if we should start/end/update an action on our canvas
  React.useEffect(()=>{
    const 
      click= pointer.current.click,
      buttons= pointer.current.button,
      zsort= pointerUtils.getZsort(canvasRef.current)

    if(zsort >= 0){
      if(zsort===0 || click.button=== Constants.MOUSE_BTN_MIDDLE) _process_board_click(click, buttons, zsort)
      else _process_item_click(click, buttons)
    }
  },[pointer.current.button])

  /** processes a click on the board canvas */
  function _process_board_click(click, buttons, zsort){
    if(click.button != -1){
      const current= buttons[click.button]
      if(!canvasState.action){
        if(current.stage === 1){
          if(click.button === Constants.MOUSE_BTN_LEFT && zsort === 0 || click.button === Constants.MOUSE_BTN_MIDDLE && zsort !== -1) {
            const 
              half= store.board.size * .475,
              coords= canvasState.coords
            merge_canvasState({
              action: { 
                id: _ACTION_ID.pan, 
                middle: click.button === Constants.MOUSE_BTN_MIDDLE,
                origin: click.origin,
                limit: [
                    [ -half - coords.x, half - coords.x ],
                    [ -half - coords.y, half - coords.y ]
                  ],
                zoominv: 1 / _ZOOM_LEVELS[canvasState.zoom]
              }
            })
          }
        }
      }
      else{
        if(current.stage === -1) merge_canvasState({action: { id: _ACTION_ID.end, abort: false }})
        else if(buttons[Constants.MOUSE_BTN_RIGHT].stage > 0) merge_canvasState({action: { id: _ACTION_ID.end, abort: true }})
        else if(canvasState.action.id === _ACTION_ID.pan){
          if(buttons[Constants.MOUSE_BTN_LEFT].stage > 0 && buttons[Constants.MOUSE_BTN_MIDDLE].stage > 0) merge_canvasState({action: { id: _ACTION_ID.end, abort: true }})
        }
      }
    }
    else if(canvasState.action?.id > _ACTION_ID.end) merge_canvasState({action: { id: _ACTION_ID.end, abort: false }})
  }

  /** processes a click on a board item, only left button allowed */
  function _process_item_click(click, buttons){
    if(click.button != -1){
      const current= buttons[click.button]
      if(!canvasState.action){
        if(click.button === Constants.MOUSE_BTN_LEFT && current.stage === 1 && childItems.length > 0){

          const item= itemUtils.current.find(e=>e.get().current.contains(click.element))
          if(item) {
    
            const
              node= item.get().current,
              grab= node.querySelector("[data-knob='grab']"),
              resize= node.querySelector("[data-knob='resize']")

            if(click.element === grab || click.element === resize){

              const 
                mode= grab===click.element ? _ACTION_ID.grab : _ACTION_ID.resize,
                overlay= document.body.querySelector("#board-canvas-overlay"),
                top= canvasRef.current.querySelector("#board-canvas-top"),
                ghost= node.cloneNode(true)
  
              top.appendChild(ghost)
              
              node.style.setProperty("opacity", ".5")

              overlay.style.setProperty("--overlay-cursor", mode===_ACTION_ID.grab ? "move": "se-resize")
              overlay.style.setProperty("--overlay-pointerevents", "auto")

              merge_canvasState({ 
                item: [item, ghost], 
                action: {
                  id: mode,
                  half: store.board.size * .5,
                  coords: item.get(Constants.ITEMDATA.coords),
                  origin: pointer.current.click.origin,
                  zoom: _ZOOM_LEVELS[canvasState.zoom],
                  zoominv: 1 / _ZOOM_LEVELS[canvasState.zoom]
                }})
            }
          }
        }
      }
      else{
        if(current.stage === -1) merge_canvasState({action: { id: _ACTION_ID.end, abort: false }})
        else if(buttons[Constants.MOUSE_BTN_RIGHT].stage > 0) merge_canvasState({action: { id: _ACTION_ID.end, abort: true }})
      }
    }
    else if(canvasState.action?.id > _ACTION_ID.end) merge_canvasState({action: { id: _ACTION_ID.end, abort: false }})
  }

  // action finishing
  React.useEffect(()=>{
    if(canvasState.action?.id === _ACTION_ID.end){
      const new_state= {
        action: null, 
        item: null,
        offset: { x:0, y:0 },
        dirty: Constants.CANVAS_DIRTY.transform | Constants.CANVAS_DIRTY.cursor
      }
      if(!canvasState.action.abort) {
        new_state.coords= { x: canvasState.coords.x+canvasState.offset.x, y: canvasState.coords.y+canvasState.offset.y }
      }
      if(canvasState.item) {
        const overlay= document.body.querySelector("#board-canvas-overlay")

        if(!canvasState.action.abort){
          const new_coords= {
            x: parseInt(canvasState.item[1].style.getPropertyValue('--item-coords-x').replace("px","")),
            y: parseInt(canvasState.item[1].style.getPropertyValue('--item-coords-y').replace("px",""))
          }
  
          canvasState.item[0].set({
            coords: new_coords, 
            dirty: Constants.ITEM_DIRTY.coords
          })
        }

        canvasState.item[0].get().current.style.removeProperty("opacity")
        canvasState.item[1].remove()

        overlay.style.removeProperty("--overlay-cursor")
        overlay.style.removeProperty("--overlay-pointerevents")

        new_state.item=null
      }
      merge_canvasState(new_state)
    }
  },[canvasState.action])

  // --------------------------------------------------------------- MOUSE POSITION
  
  // drive mouse position change related tasks based on current mode (panning/moving/resizing)
  React.useEffect(()=>{

    if(canvasState.action && pointer.current.click.button != -1){

      if(canvasState.action.id === _ACTION_ID.pan) {     // PANNING
  
        const 
          action= canvasState.action,
          cursor= pointer.current.coords,
          delta= [ cursor.x - action.origin.x, cursor.y - action.origin.y]
  
        merge_canvasState({
          offset: {
            x: Utils.clamp((delta[0] * action.zoominv) | 0, action.limit[0][0], action.limit[0][1]),
            y: Utils.clamp((delta[1] * action.zoominv) | 0, action.limit[1][0], action.limit[1][1])
          },
          dirty: Constants.CANVAS_DIRTY.coords | Constants.CANVAS_DIRTY.cursor
        })
      }
      else if(canvasState.action.id === _ACTION_ID.grab) {     // GRABBING
        
        const 
          action= canvasState.action,
          ghost= canvasState.item[1]

        const
          cursor= pointer.current.coords,
          delta= [ cursor.x - (action.origin.x - action.coords.x * action.zoom), cursor.y - (action.origin.y - action.coords.y * action.zoom)],
          new_coords= {
            x: Utils.clamp((delta[0] * action.zoominv) | 0, -action.half, action.half),
            y: Utils.clamp((delta[1] * action.zoominv) | 0, -action.half, action.half)
          }

        ghost.style.setProperty("--item-coords-x", new_coords.x + "px")
        ghost.style.setProperty("--item-coords-y", new_coords.y + "px")
      }
      else if(canvasState.action.id === _ACTION_ID.resize) {     // RESIZING
  
        console.log("resizing")
      }
    }

  },[pointer.current.coords])

  // --------------------------------------------------------------- ZOOM 

  // handle zoom changes
  React.useEffect(()=>{
    if(pointerUtils.getZsort(canvasRef.current.parentNode) >= -1 && !canvasState.action){
      const delta= pointer.current.wheel
      
      if(delta){
        const
          cur_zoom= canvasState.zoom,
          new_zoom= delta < 0 ? cur_zoom < _ZOOM_LEVELS.length-1 ? cur_zoom+1 : cur_zoom : cur_zoom > 0 ? cur_zoom-1 : cur_zoom
  
        if(new_zoom != cur_zoom) {
  
          const
            half= store.board.size * .475,
            cur_coords= canvasState.coords,
            mus_coords= pointer.current.coords,
            viewFactor= [ window.innerWidth*.5, window.innerHeight*.5 ],
            mus_point= [ (mus_coords.x - viewFactor[0]) * -1.0, (mus_coords.y - viewFactor[1]) * -1.0 ],

            cur_zoomcomp= 1/_ZOOM_LEVELS[cur_zoom],
            new_zoomcomp= 1/_ZOOM_LEVELS[new_zoom],
            
            cur_offset= [ mus_point[0] * cur_zoomcomp, mus_point[1] * cur_zoomcomp ],
            new_offset= [ mus_point[0] * new_zoomcomp, mus_point[1] * new_zoomcomp ],
            new_coords= {
              x: Utils.clamp((cur_coords.x + (cur_offset[0] - new_offset[0])) | 0, -half, half),
              y: Utils.clamp((cur_coords.y + (cur_offset[1] - new_offset[1])) | 0, -half, half),
            }

          merge_canvasState({
            coords: new_coords,
            zoom: new_zoom,
            dirty: Constants.CANVAS_DIRTY.coords | Constants.CANVAS_DIRTY.zoom
          })
        }
      }
    }
  },[pointer.current.wheel])

  // --------------------------------------------------------------- RETURN 

	return (
    <div id="board-canvas-wrapper" className="bg-zinc-300 dark:bg-zinc-800">
      <div id="board-canvas-origin" className="relative pointer-skip">
        <div ref={canvasRef} id="board-canvas" className="flex px-8 py-4 gap-6 border-zinc-800 dark:border-zinc-300">
          <div id="board-canvas-background">
            { store.devPrefs.devRender &&
              <>
                <div className="marker-x bg-blue-800" />
                <div className="marker-y bg-red-800" />
              </>
            }
          </div>
          <div id="board-canvas-content">
            {childItems}
          </div>
          <div id="board-canvas-top" />
        </div>
      </div>
      <div id="board-canvas-overlay" />
      { store.devPrefs.devRender && _getDevBoxElement() }
    </div>
	)
  
  // --------------------------------------------------------------- DEVELOPER SHIT

  // dev box
  function _getDevBoxElement(){
    const
      c= canvasState,
      p= pointer.current,
      zs= pointerUtils.getZsort(canvasRef.current?.parentElement?? null)

    return (
      <div className="devbox flex flex-col absolute bottom-8 left-4 text-stone-400 py-1 px-2 pointer-events-none">
        <span>canvasState= {`x:${c.coords.x} y:${c.coords.y} ox:${c.offset.x} oy:${c.offset.y} cz:${_ZOOM_LEVELS[c.zoom]}`}</span>
        <span>pointerState= { p ?
            `x:${p.coords.x} y:${p.coords.y} b:${zs>-2?1:0} s:${zs} c:${p.button[0].stage}|${p.button[1].stage}|${p.button[2].stage}`
            :
            "waiting for canvas ref..."
          }
        </span>
      </div>
    )
  }
}

export default Board
