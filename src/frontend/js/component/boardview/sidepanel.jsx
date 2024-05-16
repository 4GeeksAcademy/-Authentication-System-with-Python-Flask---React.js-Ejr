import React from 'react'

const SidePanel=()=>{
  return (
    <section className="flex w-96 h-full bg-zinc-900 bg-opacity-70">
      <div className="flex h-2/3 my-auto px-4 gap-4">
        <span className="font-bold my-auto text-xl">[Board]</span>
      </div>
      <div className="flex h-2/3 my-auto px-4 gap-4">
        <span className="font-bold my-auto text-xl">[People]</span>
        <i className="fa fa-solid fa-share-nodes my-auto text-3xl" />
      </div>
    </section>
  )
}

export default SidePanel