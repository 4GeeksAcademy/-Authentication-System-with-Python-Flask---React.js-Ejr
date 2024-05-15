import React from "react"

import List from "./list.jsx"

// here we render all the list of a given board, and the trash if anything is being dragged
export const Board= ()=>{
  
	return (
		<div className="flex px-8 py-4 gap-6 h-full bg-transparent overflow-auto">
      <List />
      <List />
      <List />
      <List />
      <List />
      <List />
      <List />
      <List />
      <List />
		</div>
	)
}

export default Board
