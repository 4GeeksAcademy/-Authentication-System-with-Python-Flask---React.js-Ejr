import React from "react"

const icon= "https://cdn.icon-icons.com/icons2/2518/PNG/512/photo_icon_151153.png"

const Navbar = () => {
	return (
		<nav className="flex justify-between h-16 bg-zinc-100 border-zinc-300 border-b dark:bg-zinc-900 dark:border-zinc-600">
			<div className="flex h-2/3 my-auto px-4 gap-4">
        <img className="bg-white rounded-xl size-9 my-auto" src={icon} />
				<span className="font-mono font-bold my-auto text-xl whitespace-pre">[Workspace] &gt;&gt; [Project]</span>
			</div>
			<div className="flex h-2/3 my-auto px-4 gap-4">
        <div className="flex font-mono rounded-lg px-2 border bg-zinc-200 border-zinc-300 dark:bg-zinc-800 dark:border-zinc-600">
          <i className="fa fa-solid fa-magnifying-glass my-auto text-2xl" />
          <input className="w-70 bg-transparent ms-4" type="text" placeholder="search..."></input>
        </div>
        <i className="fa fa-regular fa-bell my-auto text-3xl" />
        <i className="fa fa-regular fa-circle-question my-auto text-3xl" />
        <i className="fa fa-regular fa-user my-auto text-3xl" />
			</div>
		</nav>
	)
}

export default Navbar
