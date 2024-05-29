import React from "react"

const WorkspaceView = () => {
	return (
		<div className="w-full h-full bg-dark flex">
{/*--------- Side NavBar --------------------------------------------------------------------------------*/}
			<div className="w-1/6 border-r-2 flex flex-col p-3 sticky h-full">
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
					<li className="flex items-center hover:bg-gray-800 rounded-lg cursor-pointer p-3">
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
							<p>Boards</p>
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
								<p className="ml-1 text-sm ">This should be a map</p>
								<button className="w-60 h-36 bg-gray-600 rounded-xl flex items-center justify-center overflow-hidden "
										onClick={()=>navigate('/board')}
								>
									<img className="transition duration-300 ease-in-out hover:scale-105" src="https://i.pinimg.com/564x/6b/49/fd/6b49fd50ffa75b289265ed8939aa6017.jpg" alt="" />
									
								</button>
							</div>
							
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default WorkspaceView