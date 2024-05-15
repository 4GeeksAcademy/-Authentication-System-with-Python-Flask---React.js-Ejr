import React from "react"
import { useParams } from "react-router-dom"

import { Context } from "../store/appContext.jsx"

import Board from "../component/boardview/board.jsx"
//import BoardToolBar from "./component/board/toolbar.jsx"
//import TrashBin from "./component/trashbin.jsx"

const icon= "https://cdn.icon-icons.com/icons2/2518/PNG/512/photo_icon_151153.png"

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
    { pid, bid }= useParams() // URL route as params

  // giving href as dependency makes this also trigger on URL change, that way we can manage board-to-board links via useNavigate()
  React.useEffect(()=>{
    // TODO: flux action -- get board -- requires defining DB table
    // actions.getBoard(pid, bid)
    console.log(`hello world: ${pid} / ${bid}`)
  },[window.location.href])

  // return the board passing it the data
  return (
    <div className="flex flex-col h-full bg-red-900">
      <nav className="flex h-12 bg-zinc-900 bg-opacity-30 justify-between">
        <div className="flex h-2/3 my-auto px-4 gap-4">
          <span className="font-bold my-auto text-xl">[Board]</span>
        </div>
        <div className="flex h-2/3 my-auto px-4 gap-4">
          <span className="font-bold my-auto text-xl">[People]</span>
          <i className="fa fa-solid fa-share-nodes my-auto text-3xl" />
        </div>
      </nav>
      <Board />
    </div>
  )
}

export default BoardView