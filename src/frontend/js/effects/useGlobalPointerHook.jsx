import React from 'react'

import { Context } from "../store/appContext.jsx"

const _CLICK_EMPTY= {
  button: -1,
  origin: null,
  keys: 0,
  timestamp: -1,
  element: null
}

let _pointerHook= null
const getPointerHook= ()=>{ return _pointerHook }

/**
 *  -- Mouse behaviour tracking (used on our Canvas) --
 * 
 *  This reunites (in a single React effect) the handling of the mouse event listeners required to implement the canvas
 *    so code doesn't get (too) messy
 * 
 * @returns a React Ref poiting to the calculated results
 */
export const useGlobalPointerHook= ()=>{

  // --------------------------------------------------------------- INITIALIZATION
  const { actions }= React.useContext(Context)

  const
    [ pointerState, set_pointerState ]= React.useState({
      coords: {x:0, y:0},
      wheel: 0,
      hover: null,
      keys: 0,
      click: _CLICK_EMPTY,
      button: [{stage:0}, {stage:0}, {stage:0}],
      dirty: false
    })
  function merge_pointerState(new_state){ set_pointerState({ ...Object.assign(pointerStateRef.current, new_state) })}
  function update_buttonState(idx, new_button){ const cur_state= pointerStateRef.current.button; return Array.from({length:3}).map((e,i)=>i===idx?new_button:cur_state[i]) }

  const pointerStateRef= React.useRef(pointerState)
  
  React.useEffect(()=>{
    const eventListeners= [
      ["mousedown", handleMusPress],
      ["mouseup", handleMusRelease],
      ["mousemove", handleMusPosition],
      ["wheel", handleMusWheel]
    ]
    for(let el of eventListeners) window.addEventListener(el[0], el[1])
    console.log("mouse listeners added")
  
    _pointerHook= [
      pointerStateRef, 
      {
        getIsInsideBounds,
        getZsort
      }
    ]
    actions.setPointerReady(true)

    return ()=>{
      for(let el of eventListeners) window.removeEventListener(el[0], el[1])
      console.log("mouse listeners removed")

      actions.setPointerReady(false)
      _pointerHook= null
    }
  },[])
  
  // --------------------------------------------------------------- MOUSE POSITION

  function handleMusPosition(e){
    merge_pointerState({
      coords: { x: e.clientX, y: e.clientY },
      hover: e.target
    })
  }
  
  // --------------------------------------------------------------- MOUSE WHEEL

  function handleMusWheel(e){ if(!e.ctrlKey) merge_pointerState({ wheel: e.deltaY }) }
  React.useEffect(()=>{ if(pointerState.wheel != 0) merge_pointerState({ wheel: 0 }) } ,[pointerState.wheel]) // restore zoom state to neutral
  
  // --------------------------------------------------------------- MOUSE BUTTON PRESS / HOLD / RELEASE

  // on button press
  function handleMusPress(e){
    if(e.button < 4){
      const 
        coords= { x: e.clientX, y: e.clientY },
        keys= _getEventKeys(e),
        timestamp= e.timeStamp,
        element= e.target

      const button= update_buttonState(e.button, {
        coords, keys, timestamp, element,
        stage: 1
      })

      if(pointerStateRef.current.click.button === -1){
        merge_pointerState({
          click:{
            button: e.button,
            origin: coords,
            keys, timestamp, element
          },
          button, 
          dirty: true
        })
      }
      else merge_pointerState({ button, dirty: true })
    }
  }

  // on button release
  function handleMusRelease(e){
    if(e.button < 4){

      const button= update_buttonState(e.button, {
        coords: { x: e.clientX, y: e.clientY }, 
        keys: _getEventKeys(e),
        timestamp: e.timeStamp,
        element: e.target,
        stage: -1
      })

      if(pointerStateRef.current.click.button !== -1){
        merge_pointerState({ click:_CLICK_EMPTY, button, dirty: true })
      }
      else merge_pointerState({ button, dirty: true })
    }
  }

  // --------------------------------------------------------------- DIRTY UPDATES

  // handles button stage changes, from pressed to held, from released to unset
  React.useEffect(()=>{ 
    if(pointerState.dirty){
      const cur_button= pointerState.button
      for(let btn=0; btn < 3; btn++) {
        if(cur_button[btn].stage === 1) cur_button[btn].stage= 2 // held
        else if(cur_button[btn].stage === -1) cur_button[btn].stage= 0 // unset
      }
      merge_pointerState({ button:cur_button, dirty: false })
    }
  },[pointerState.dirty])

  // --------------------------------------------------------------- PUBLIC UTILS

  /** check if pointer is currently contained inside an element bounding box */
  function getIsInsideBounds(e){
    const 
      {x,y}= pointerStateRef.current.coords,
      rect= e.getBoundingClientRect()
    return x > rect.left && y > rect.top && x < rect.right && y < rect.bottom }

  /** check the relative z sorting between given element (e) and the currently hovered item
   * 
   *    0  = hovered item IS e
   * 
   *    1  = hovered item is direct children of e (1st level)
   * 
   *    2  = hovered item is children of e, but not direct
   * 
   *    3  = hovered item is brother of e
   * 
   *    -1 = hovered item is direct parent of e (1st level)
   * 
   *    -2 = hovered item is parent of e, but not direct
   * 
   *    -3  = other situation (I.E: hovering a child of a grandparent, unmatched node)
   * 
   *    -4 = error / any item resulted null
   * 
   */
  function getZsort(e){
    const hover= pointerStateRef.current.hover
    if(!e || !hover) return -4
    if(e === hover) return 0
    if(e.contains(hover)) return Array.from(e.children).includes(hover) ? 1 : 2
    if(hover.contains(e)) return Array.from(hover.children).includes(e) ? -1 : -2
    if(hover.parentNode.contains(e)) return 3
    return -3
  }

  /** collect the key-states data carried by the mouse-event */
  function _getEventKeys(e){ return (1 * e.ctrlKey ? 0:1) | (2 * e.altKey ? 0:1) | (4 * e.shiftKey ? 0:1) }
}

export default getPointerHook