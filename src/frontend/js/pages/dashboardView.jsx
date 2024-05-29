import React, { useState } from "react"
import { useNavigate } from "react-router-dom";


import BoardCard from "../component/cards/boardCard.jsx";
import WorkspaceCard from "../component/cards/workspaceCard.jsx";
import SideNavbar from "../component/sideNavbar.jsx";

const DashboardView = () => {
	
	const navigate=useNavigate();
	
	const [workspaces, SetWorkspaces] = useState([]);
	const [boards, SetBoards] = useState([]);

	
	const handleCreateNewWorkspace = async(e) =>{
        e.preventDefault();
		e.stopPropagation();

		const triedToCreateNewWorkspace = {id:0, title:"newWorkspace", thumbnail:"https://i.pinimg.com/564x/dc/64/5b/dc645b7e040258898be8de9c930c589b.jpg"};
		if (triedToCreateNewWorkspace) {
			console.log("u are a whore")
			SetWorkspaces(workspaces.concat(triedToCreateNewWorkspace))
    }}

	const handleCreateNewBoard = async(e) =>{
        e.preventDefault();
		e.stopPropagation();

		const triedToCreateNewBoard = {id:0, name:"newBoard", thumbnail:"https://i.pinimg.com/564x/84/13/fa/8413fa6b6f9c2032f55c464444f10023.jpg"};
		if (triedToCreateNewBoard) {
			console.log("u are a whore")
			SetBoards(boards.concat(triedToCreateNewBoard))
    }}

	return (
		<div className="w-full bg-dark flex h-full">
{/*--------- Side NavBar --------------------------------------------------------------------------------*/}
			<SideNavbar workspaces={workspaces} boards={boards}/>

{/*--------- Show Projects -----------------------------------------------------------------------------------*/}
			<div className="p-12 w-5/6">
				<div className="flex flex-col gap-5">
					<div>
						<div className="flex gap-3 items-center">
							<i className="fa-thin fa-clock"></i>
							<p className="f-body">Viewed recently</p>
						</div>
						<div id="divider" className="w-full h-[1px] bg-gray-500 mx-auto my-2"></div>
						<div className="flex items-center gap-10 my-4">
							<div className="flex flex-col gap-3">
								<p className="ml-1 text-sm">Workspace name</p>
								<button className="w-60 h-36 bg-gray-600 rounded-xl flex items-center justify-center overflow-hidden"
										onClick={()=>navigate('/workspace')}
								>
									<img className="transition duration-300 ease-in-out hover:scale-105" src="https://i.pinimg.com/564x/1c/2e/61/1c2e61c2ebbc21992a6fa804db47c764.jpg" alt="" /> 
									
								</button>
							</div>
							<div className="flex flex-col gap-3">
								<p className="ml-1 text-sm">Board name</p>
								<button className="w-60 h-36 bg-gray-600 rounded-xl flex items-center justify-center overflow-hidden"
										onClick={()=>navigate('/board')}
								>
									<img className="transition duration-300 ease-in-out hover:scale-105" src="https://i.pinimg.com/564x/6b/49/fd/6b49fd50ffa75b289265ed8939aa6017.jpg" alt="" />
									
								</button>
							</div>
							
						</div>
					</div>
					<div>
						<div className="flex gap-3 items-center">
							<p className="f-body">Workspaces</p>
						</div>
						<div id="divider" className="w-full h-[1px] bg-gray-500 mx-auto my-2"></div>
						<div className="flex items-center gap-10 my-4">
							<WorkspaceCard id={0} title="unPollonGordo" thumbnail="https://i.pinimg.com/564x/dc/64/5b/dc645b7e040258898be8de9c930c589b.jpg" />

							{workspaces.map((e, i)=>{
								return <WorkspaceCard key={`wc-${i}`} id={e.id} title={e.title} thumbnail={e.thumbnail} />	
							})}
							
							<div onClick={handleCreateNewWorkspace} className="flex flex-col gap-3">
								<p className="ml-1 text-sm">This should go after the map, so u can create a new one easily</p>
								<button className="w-60 h-36 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gray-700">Create a new workspace</button>
							</div>
						</div>
					</div>
					<div>
						<div className="flex gap-3 items-center">
							<p className="f-body">Boards</p>
						</div>
						<div id="divider" className="w-full h-[1px] bg-gray-500 mx-auto my-2"></div>
						<div className="flex items-center gap-10 my-4">
							<BoardCard id={0} name="unaPollaGorda" thumbnail="https://i.pinimg.com/564x/84/13/fa/8413fa6b6f9c2032f55c464444f10023.jpg" />	
							
							{boards.map((e, i)=>{
								return <BoardCard key={`bc-${i}`} id={e.id} name={e.name} thumbnail={e.thumbnail} />	
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
	)
}

export default DashboardView