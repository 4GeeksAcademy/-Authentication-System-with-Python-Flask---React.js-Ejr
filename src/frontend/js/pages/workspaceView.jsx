import React, { useState } from "react"
import SideNavbar from "../component/sideNavbar.jsx"

import BoardCard from "../component/cards/boardCard.jsx";

const WorkspaceView = () => {

	const [boards, SetBoards] = useState([]);
	const [workspaces, SetWorkspaces] = useState([]);


	const handleCreateNewBoard = async(e) =>{
        e.preventDefault();
		e.stopPropagation();

		const triedToCreateNewBoard = {id:0, name:"newBoard", thumbnail:"https://i.pinimg.com/564x/84/13/fa/8413fa6b6f9c2032f55c464444f10023.jpg"};
		if (triedToCreateNewBoard) {
			console.log("u are a whore")
			SetBoards(boards.concat(triedToCreateNewBoard))
    }}

	return (
		<div className="w-full h-full bg-dark flex">
{/*--------- Side NavBar --------------------------------------------------------------------------------*/}
			<SideNavbar boards={boards} workspaces={workspaces}/>

{/*--------- Show Projects -----------------------------------------------------------------------------------*/}
			<div className="p-12 w-5/6">
				<div className="flex flex-col gap-5">
					<div>
						<div className="flex gap-3 items-center">
							<p>Boards</p>
						</div>
						<div id="divider" className="w-full h-[1px] bg-gray-500 mx-auto my-2"></div>
						<div className="flex items-center gap-10 my-4">
							<div className="flex gap-5">
								<BoardCard id={0} name="unaPollaGorda" thumbnail="https://i.pinimg.com/564x/84/13/fa/8413fa6b6f9c2032f55c464444f10023.jpg" />	
								
								{boards.map((e, i)=>{
									return <BoardCard key={`bc-${i}`} id={e.id} name={e.name} thumbnail={e.thumbnail} />	
								})}

								<div onClick={handleCreateNewBoard} className="flex flex-col gap-3">
									<p className="ml-1 text-sm">+</p>
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