import React from 'react'

import { Context } from "../../store/appContext.jsx"

const Toolbar=()=>{
  const
    { store, actions }= React.useContext(Context)

  return (
    <div className="flex w-full h-12 bg-zinc-900 justify-between bg-opacity-70 backdrop-blur-md border-b border-zinc-800">
      <div className="flex h-2/3 my-auto px-4 gap-4">
        { store.board.icon && 
          <img src={store.board.icon} />
        }
        <span className="font-bold my-auto text-xl">{store.board.title}</span>
      </div>
      <div className="flex h-2/3 my-auto px-4 gap-4">
        <span className="font-bold my-auto text-xl">[People]</span>
        <i className="fa fa-solid fa-share-nodes my-auto text-3xl" />
      </div>
    </div>
  )
}

export default Toolbar