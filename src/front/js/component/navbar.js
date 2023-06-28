import React, {useContext} from "react";
import { Link } from "react-router-dom";
import ReactSwitch from "react-switch";
import { ThemeContext } from "../layout";

export const Navbar = () => {
	const { theme, toggleTheme } = useContext(ThemeContext);

	return (
		<>
			<nav className="navbar navbar-light bg-light">
				<div className="container">
					<Link to="/">
						<span className="navbar-brand mb-0 h1">WhataCar</span>
					</Link>
					<div className="ml-auto">
						<Link to="/demo">
							<button className="btn btn-primary">Check the Context in action</button>
						</Link>
					</div>


					<Link to={'/signup'}>Únete!</Link>

					
					<div className="switch">
						<label className="mode me-2">{theme==="light" ? "🌕" : "🌑"}</label>
						<ReactSwitch onChange={toggleTheme} checked={theme === "dark"}/>
					</div>
				</div>
			</nav>			
		</>
	);
};
