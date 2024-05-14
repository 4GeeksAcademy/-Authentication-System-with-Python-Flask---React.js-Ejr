import React from "react"

import List from "../component/board/list.jsx"

// this is just a component that renders another component centered in the viewport
export const Board= ()=>{
  
	return (
		<div className="w-screen h-screen flex-auto items-center">
      <div className="flex-auto mx-auto w-10/12 outline-1 outline-dashed outline-magenta">
        <List />
        <List />
        <List />
      </div>
		</div>
	)
}

export default Board
