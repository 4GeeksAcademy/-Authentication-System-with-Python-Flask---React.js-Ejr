import React from "react"

import Constants from "../../app/constants.js"
import Utils from "../../app/utils.js"

import { Context } from "../../store/appContext.jsx"

import List from "./list.jsx"

import useContextualMenu from "../../effects/useContextualMenu.jsx"
import getPointerHook from "../../effects/useGlobalPointerHook.jsx"

//ITEMTYPE_WORKSPACE: 0,
//ITEMTYPE_PROJECT: 1,
//ITEMTYPE_TEAM: 2,
//ITEMTYPE_USER: 3,
//ITEMTYPE_BOARD: 4,
//ITEMTYPE_LIST: 5,
//ITEMTYPE_TASK: 6,
//ITEMTYPE_TEXT: 7,
//ITEMTYPE_MEDIA: 8,
//ITEMTYPE_EMBED: 9,
const _ITEMTYPE= [null, null, null, null, null, List, null, null, null, null]

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
    [boardItems, set_boardItems]= React.useState([]),
    itemUtils= React.useRef([])

  function merge_canvasState(new_state){ _scs({ ...Object.assign(canvasState, { ...new_state, timestamp: Date.now() })})}

  React.useEffect(()=>{

    if(store.items.length > 0){

      itemUtils.current= Array(store.items.length)

      const items= store.items.map((e,i)=>{
        const Type= _ITEMTYPE[e.type]
        return <Type key={`${e.id}|${e.bid}`} bref={[itemUtils, i]} {...e.props} />
      })

      set_boardItems(items)

      console.log(`board contains ${store.items.length} items`)
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
        canvasStyle.setProperty("--canvas-coords-x", (-origin[0] + coords.x+offset.x).toString() + "px" )
        canvasStyle.setProperty("--canvas-coords-y", (-origin[1] + coords.y+offset.y).toString() + "px" )
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
        if(current.stage === 1 && boardItems.length > 0){

          const item= itemUtils.current.find(e=>e.get().current.contains(click.element))
          if(item) {
    
            const
              node= item.get().current,
              grab= node.querySelector("[data-knob='grab']"),
              resize= node.querySelector("[data-knob='resize']")

            if(click.element === grab || click.element === resize){

              const 
                mode= grab===click.element ? _ACTION_ID.grab : _ACTION_ID.resize,
                overlay= canvasRef.current.querySelector("#board-canvas-overlay"),
                ghost= node.cloneNode(true)
  
              node.style.setProperty("opacity", ".5")
              overlay.style.setProperty("cursor", mode===_ACTION_ID.grab ? "move": "se-resize", "important")
              overlay.style.setProperty("pointer-events", "auto", "important")
              overlay.appendChild(ghost)

              merge_canvasState({ 
                item: [item, ghost], 
                action: {
                  id: mode,
                  half: store.board.size * .5,
                  coords: item.get(Constants.ITEMDATA_COORDS),
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
      const state= {
        action: null, 
        item: null,
        offset: { x:0, y:0 },
        dirty: Constants.CANVAS_DIRTY.transform | Constants.CANVAS_DIRTY.cursor
      }
      if(!canvasState.action.abort) {
        state.coords= { x: canvasState.coords.x+canvasState.offset.x, y: canvasState.coords.y+canvasState.offset.y }
      }
      if(canvasState.item) {
        const overlay= canvasRef.current.querySelector("#board-canvas-overlay")
        overlay.style.removeProperty("cursor")
        overlay.style.removeProperty("pointer-events")
        canvasState.item[0].get().current.style.removeProperty("opacity")
        canvasState.item[1].remove()
      }
      merge_canvasState(state)
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
  
          // double click functionality here:
  
          //const 
          //  zoom= _zoom_levels[new_canvasZoom],
          //  factor= delta < 0 ? -1.0 : 1.0,
          //  new_coords= [
          //    canvasPosition[0] + (current[0] - viewHalf[0]) * factor,
          //    canvasPosition[1] + (current[1] - viewHalf[1]) * factor,
          //  ]
  
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
            {boardItems}
          </div>
          <div id="board-canvas-overlay"><div/></div>
        </div>
      </div>
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
