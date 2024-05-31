import React from 'react'

const useContextualMenu=(callback)=>{

  React.useEffect(()=>{
    window.addEventListener("contextmenu", callback)
    return ()=>{ window.removeEventListener("contextmenu", callback) }
  },[])
}

export default useContextualMenu