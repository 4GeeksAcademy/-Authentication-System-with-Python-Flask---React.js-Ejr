import React, { useState } from "react"
import { Context } from "../store/appContext.jsx";

import SideNavbar from "../component/sideNavbar.jsx"
import BoardCard from "../component/cards/boardCard.jsx";
import { useParams } from "react-router-dom";

const WorkspaceView = () => {

  // new

  const
    { store, actions }= React.useContext(Context),
    [workspace, set_workspace] = React.useState([]),
    [boards, set_boards] = React.useState([]),
    { wid }= useParams()

  React.useEffect(()=>{ async function handle(){

    const workspace = await actions.workspaces_instance_get(wid)

    console.log("workspace:", workspace)
    console.log("boards:", workspace.boards)

    set_boards(workspace.boards)
    workspace.boards= null;
    set_workspace(workspace)
      
  } handle() },[])

	const handleCreateNewBoard = async(e) =>{
    e.preventDefault(); e.stopPropagation()

		const new_board = await actions.boards_instance_create();
		if(new_board) set_boards([new_board, ...boards]) // put new on the left
  }

	return (
		<div className="w-full h-full bg-dark flex">
{/*--------- Side NavBar --------------------------------------------------------------------------------*/}
			<SideNavbar boards={boards}/>

{/*--------- Show Projects -----------------------------------------------------------------------------------*/}
			<div className="p-12 w-5/6">
				<div className="flex flex-col gap-5">
					<div>
						<div className="flex gap-3 items-center">
							<p>Boards</p>
						</div>
						<div id="divider" className="w-full h-[1px] bg-gray-500 mx-auto my-2"></div>
						<div className="flex items-center gap-10 my-4">
							<div className="flex flex-col gap-3">
								
								{boards && boards.map((e, i)=>{
									return <BoardCard key={`bc-${i}`} data={e} />	
								})}

								<div onClick={handleCreateNewBoard} className="flex flex-col gap-3">
									<p className="ml-1 text-sm">This should go after the map, so u can create a new one easily</p>
									<button className="w-60 h-36 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gray-700">Create a new board</button>
								</div>
							</div>
							
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default WorkspaceView