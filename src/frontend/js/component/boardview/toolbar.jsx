import React from 'react'

const Toolbar=()=>{
  return (
    <nav className="flex h-12 bg-zinc-900 justify-between bg-opacity-70">
      <div className="flex h-2/3 my-auto px-4 gap-4">
        <span className="font-bold my-auto text-xl">[Board]</span>
      </div>
      <div className="flex h-2/3 my-auto px-4 gap-4">
        <span className="font-bold my-auto text-xl">[People]</span>
        <i className="fa fa-solid fa-share-nodes my-auto text-3xl" />
      </div>
    </nav>
  )
}

export default Toolbar