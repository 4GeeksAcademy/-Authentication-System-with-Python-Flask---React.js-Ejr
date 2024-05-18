import React from "react"
import { useParams } from "react-router-dom"

import { Context } from "../store/appContext.jsx"

import Toolbar from "../component/boardview/toolbar.jsx"
import SidePanel from "../component/boardview/sidepanel.jsx"

import Board from "../component/boardview/board.jsx"

/**
 *  -- Board View --
 * 
 *  Renders a board loading it from URL params 'PID' (project ID) and 'BID' (board ID)
 *  note that ids work in several ways:
 *  if no PID given then BID will be treated as a global board id (GBID) (not contained in any project)
 *  if PID is given, BID must be the board id WITHIN the project, not its GBID (all boards have GBID value stored anyway)
 *  if nothing is given, or ids doesn't get any result, we should render some custom "error, board not found" component/view
 * 
 *  As this is the Board View, the side panel and topbar must be added here
 * 
 */
const BoardView= ()=>{
  const
    { store, actions }= React.useContext(Context),
    { pid, bid }= useParams() // URL params

  React.useEffect(()=>{
    // TODO: load the board from database then store the data in some React state
    //    something like actions.getBoard(pid, bid)
    //    then pass that data to the Board component
    console.log(`board: ${pid} / ${bid}`)
    //actions.getFontAwesomeIconList()

  },[window.location.href])

  // return the board passing it the data
  return (
    <div className="flex flex-col h-full overflow-hidden relative -z-50">
      <div className="pointer-skip absolute inset-0 flex">
        <Toolbar />
        <SidePanel />
      </div>
      <Board/>
    </div>
  )
}

export default BoardView