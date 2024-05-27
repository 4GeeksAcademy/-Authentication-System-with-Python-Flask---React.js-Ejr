import React from 'react'

/**
 * Custom hook to track click'n'drag mouse movement values to use for any purpose, such resizing or moving elements
 * 
 * @param {*} btn the mouse button to track, see Constants.MOUSE_BTN... in flux.jsx
 * @param {*} ref an useRef() pointing to the object where click must start
 * @returns an object containing the click origin position, current position and the difference
 */
const useClickDrag=(btn, ref)=>{

  const
    [ coords, set_coords ]= React.useState(null),
    [ origin, set_origin ]= React.useState(null)

  React.useEffect(()=>{
    if(ref.current){
      const element= ref.current
      element.addEventListener("mousedown", handleMusPress)
      return ()=>{ element.removeEventListener("mousedown", handleMusPress) }
    }
  },[ref.current])

  React.useEffect(()=>{
    if(origin){
      const eventListeners= [
        ["mouseup", handleMusRelease],
        ["mousemove", handleMusPosition]
      ]
      for(let el of eventListeners) window.addEventListener(el[0], el[1])

      return ()=>{
        for(let el of eventListeners) window.removeEventListener(el[0], el[1])
      }
    }
  },[origin])
  
  function handleMusPress(e) { if(e.button == btn) { set_origin([e.clientX, e.clientY]) }}
  function handleMusRelease(e) { if(e.button == 0) { set_origin(null) }}
  function handleMusPosition(e) { set_coords([e.clientX, e.clientY]) }

  return {
    coords: coords,
    origin: origin,
    delta: coords && origin ? [coords[0] - origin[0], coords[1] - origin[1]] : null
  }
}

export default useClickDrag