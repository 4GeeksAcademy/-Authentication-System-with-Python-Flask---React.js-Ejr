import React from "react"
import { useNavigate } from "react-router-dom";

const DashboardView = () => {
	//change all useNavigate links
	
	//useEffect => fetch a action.getUserWorkSpaces

	
	/* getUserWorkSpaces(); */
	

	const navigate=useNavigate();

	return (
		<div className="w-full bg-dark flex h-full">
{/*--------- Side NavBar --------------------------------------------------------------------------------*/}
			<div className="w-1/6 border-r-[1px] border-gray-500 flex flex-col p-3 sticky h-full">
				<ul>
					<li className="flex items-center hover:bg-gray-800 rounded-lg cursor-pointer p-3">
						<i className="fa-solid fa-house text-sm mr-5"></i>
						<p className="text-sm f-body">Home</p>
					</li>
				</ul>
				<div id="divider" className="w-full h-[1px] bg-gray-500 mx-auto my-2"></div>
				<p className="text-[10px] m-1">Workspaces</p>
				<ul>
					<li className="flex items-center hover:bg-gray-800 rounded-lg cursor-pointer p-3">
						<p className="text-sm f-body">Workspace name</p>
					</li>
					<li className="flex items-center hover:bg-gray-800 rounded-lg cursor-pointer p-3">
						<p className="text-sm f-body">This should be a map o the workspaces</p>
					</li>
					<li className="flex ite ms-center hover:bg-gray-800 rounded-lg cursor-pointer p-3">
						<p className="text-sm f-body">And then onClick a function that opens this workspaces, or maybe a useNav idk</p>
					</li>
				</ul>
				<div id="divider" className="w-full h-[1px] bg-gray-500 mx-auto my-2"></div>
				<p className="text-[10px] m-1">Boards</p>
				<ul>
					<li className="flex items-center hover:bg-gray-800 rounded-lg cursor-pointer p-3">
						<p className="text-sm f-body">Board 1</p>
					</li>
					<li className="flex items-center hover:bg-gray-800 rounded-lg cursor-pointer p-3">
						<p className="text-sm f-body">Same as workspaces</p>
					</li>
					<li className="flex items-center hover:bg-gray-800 rounded-lg cursor-pointer p-3">
						<p className="text-sm f-body">Have to fix no scrolleable</p>
					</li>
				</ul>
			</div>

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
							<div className="flex flex-col gap-3">
								<p className="ml-1 text-sm">Workspace name</p>
								<button className="w-60 h-36 bg-gray-600 rounded-xl flex items-center justify-center overflow-hidden"
										onClick={()=>navigate('/workspace')}
								>
									<img className="transition duration-300 ease-in-out hover:scale-105" src="https://i.pinimg.com/564x/1c/2e/61/1c2e61c2ebbc21992a6fa804db47c764.jpg" alt="" /> 
									
								</button>
							</div>
							<div className="flex flex-col gap-3">
								<p className="ml-1 text-sm">This should be a map as well</p>
								<button className="w-60 h-36 bg-gray-600 rounded-xl flex items-center justify-center overflow-hidden"
										onClick={()=>navigate('/workspace')}
								>
									<img className="transition duration-300 ease-in-out hover:scale-105" src="https://i.pinimg.com/564x/1c/2e/61/1c2e61c2ebbc21992a6fa804db47c764.jpg" alt="" /> 
									
								</button>
							</div>
							<div className="flex flex-col gap-3">
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
							<div className="flex flex-col gap-3">
								<p className="ml-1 text-sm">Board name</p>
								<button className="w-60 h-36 bg-gray-600 rounded-xl flex items-center justify-center overflow-hidden"
										onClick={()=>navigate('/board')}
								>
									<img className="transition duration-300 ease-in-out hover:scale-105" src="https://i.pinimg.com/564x/6b/49/fd/6b49fd50ffa75b289265ed8939aa6017.jpg" alt="" />
									
								</button>
									
							</div>
							<div className="flex flex-col gap-3">
								<p className="ml-1 text-sm">This should be a map as well</p>
								<button className="w-60 h-36 bg-gray-600 rounded-xl flex items-center justify-center overflow-hidden"
										onClick={()=>navigate('/board')}
								>
									<img className="transition duration-300 ease-in-out hover:scale-105" src="https://i.pinimg.com/564x/6b/49/fd/6b49fd50ffa75b289265ed8939aa6017.jpg" alt="" />
									
								</button>
							</div>
							<div className="flex flex-col gap-3">
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