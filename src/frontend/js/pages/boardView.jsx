import React from "react"
import { useParams } from "react-router-dom"

import { Context } from "../store/appContext.jsx"

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
const BoardView = () => {
	return (
		<div className="w-full flex-auto text-center items-center mt-5">
			<h1>Hello world // Board View</h1>
		</div>
	)
}

export default BoardView