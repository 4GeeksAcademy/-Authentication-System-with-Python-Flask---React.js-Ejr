import React from "react"

const DashboardView = () => {
	return (
		<div className="w-full h-screen bg-dark flex">
			<div className="h-full w-1/5 border-2 border-white flex flex-col p-10">
				<div className="w-full h-[1px] bg-gray-500 mx-auto my-3"></div>
				<ul>
					<li className="flex items-center hover:bg-gray-800 rounded-lg cursor-pointer p-3">
						<i className="fa-solid fa-house text-2xl mr-5"></i>
						<p className="text-2xl f-body">Home</p>
					</li>
					<li className="flex items-center hover:bg-gray-800 rounded-lg cursor-pointer p-3">
						<i className="fa-solid fa-house text-2xl mr-5"></i>
						<p className="text-2xl f-body">Home</p>
					</li>
				</ul>


			</div>
			<div>

			</div>
		</div>
	)
}

export default DashboardView