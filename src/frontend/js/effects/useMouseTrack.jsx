import React from 'react'

/**
 *  -- Mouse behaviour tracking (used on our Canvas) --
 * 
 *  This reunites (in a single React effect) the handling of the mouse event listeners required to implement the canvas
 *    so code doesn't get (too) messy
 * 
 * @returns a React Ref poiting to the calculated results
 */
const useMouseTrack= (ref)=>{

  // --------------------------------------------------------------- INITIALIZATION

  const
    [ cursorState, set_cursorState ]= React.useState(null),
    [ clickState, set_clickState ]= React.useState({data:[{stage:0},{stage:0},{stage:0}],requireUpdate:null}),
    [ zoomDelta, set_wheelState ]= React.useState(0),
    [ hoverElement, set_hoverElement ]= React.useState(null)

  const selfStateRef= React.useRef(null)
  
  React.useEffect(()=>{
    if(ref.current){
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
  },[ref.current])
  
  // --------------------------------------------------------------- MOUSE BUTTON PRESS / HOLD / RELEASE

  // on button press
  function handleMusPress(e){
    if(e.button < 4){
      const new_clickState= structuredClone(selfStateRef.current.clickState)
      new_clickState.data[e.button]={
        origin: _getEventPositions(e),
        keys: _getEventKeys(e),
        timestamp: e.timeStamp,
        stage: 1
      } 
      new_clickState.requireUpdate= e.timeStamp
      set_clickState(new_clickState)
    }
  }

  // on button release
  function handleMusRelease(e){
    if(e.button < 4){
      const new_clickState= structuredClone(selfStateRef.current.clickState)
      new_clickState.data[e.button].stage= -1 // none
      new_clickState.requireUpdate= e.timeStamp
      set_clickState(new_clickState)
    }
  }

  // handles button stage changes, from pressed to held, from released to unset
  React.useEffect(()=>{ 
    if(clickState.requireUpdate){
      const new_clickState= structuredClone(clickState)
      for(let btn=0; btn < 3; btn++) {
        if(new_clickState.data[btn].stage === 1) new_clickState.data[btn].stage= 2 // held
        else if(new_clickState.data[btn].stage === -1) new_clickState.data[btn].stage= 0 // unset
      }
      new_clickState.requireUpdate= null
      set_clickState(new_clickState)
    }
  },[clickState.requireUpdate])
  
  // --------------------------------------------------------------- MOUSE WHEEL

  function handleMusZoom(e){ set_wheelState(e.ctrlKey ? 0 : e.deltaY) }
  React.useEffect(()=>{ if(zoomDelta != 0) set_wheelState(0) },[zoomDelta]) // restore zoom state to neutral
  
  // --------------------------------------------------------------- MOUSE POSITION

  function handleMusPosition(e){
    const
      coords= _getEventPositions(e),
      origin= _getClickOrigin(),
      delta= origin ? _calculateDeltas(origin.client, coords.client) : null
    
    set_hoverElement(e.target)
    set_cursorState({ 
      coords, 
      origin, 
      delta, 
      holding: origin != null, 
      dragging: delta ? delta.sqmag > 5 : false
    })
  }

  function getBounds(e){
    return cursorState ? _getRectContainsPos(...cursorState.coords.client, e.getBoundingClientRect()) : null
  }

  function getZsort(e){
    return hoverElement ? e===hoverElement ? 0 : (e.contains(hoverElement) ? 1 : -1) : -2
  }

  // --------------------------------------------------------------- RETURN
  
  selfStateRef.current={
    cursorState,
    clickState,
    zoomDelta,
    hoverElement,
    utils: {
      getBounds,
      getZsort
    }
  }

  return selfStateRef 

  // --------------------------------------------------------------- HELPERS & OTHER 

  /** collect needed position data carried by the mouse-event object */
  function _getEventPositions(e){ return { client: [e.clientX, e.clientY], layer: [e.layerX, e.layerY] }}

  /** find the current click origin, the oldest origin if multiple (first to click), or null if no clicks */
  function _getClickOrigin(){ 
    const 
      cur_clickState= selfStateRef.current?.clickState,
      max_int= 0xFFFFFFFF>>>0
    let origin, timestamp=max_int
    for(let i=0, ts; i< 3; i++){
      ts= cur_clickState.data[i].timestamp
      if(cur_clickState.data[i].stage > 0 && ts < timestamp){
        origin= cur_clickState.data[i].origin
        timestamp= ts
      }
    }
    return timestamp!= max_int ? origin : null
  }

  function _calculateDeltas(origin, coords){
    const size= [coords[0]-origin[0], coords[1]-origin[1]]
    return {
      size,
      sqmag: size[0]**2 + size[1]**2
    }
  }

  /** collect the key-states data carried by the mouse-event */
  function _getEventKeys(e){ return { ctrl: e.ctrlKey, alt: e.altKey, shift: e.shiftKey }}

  /** check if a given position is contained inside a rect's bound, returns true if it does */
  function _getRectContainsPos(x,y,rect) { return x > rect.left && y > rect.top && x < rect.right && y < rect.bottom }
}

export default useMouseTrack