import React from "react"

import List from "./board/list.jsx"

// here we render all the list of a given board, and the trash if anything is being dragged
export const Board= ()=>{
  
	return (
		<div className="w-screen h-screen flex-auto items-center">
      <div className="flex-auto mx-auto w-10/12 bg-white dark:bg-black outline-1 outline-dashed outline-magenta">
        <List />
        <List />
        <List />
      </div>
		</div>
	)
}

export default Board
