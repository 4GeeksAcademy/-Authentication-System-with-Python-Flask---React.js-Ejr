import React,{useState} from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	const [isAuthenticate,setIsAuthenticate]= useState(false)
	return (
		<>
		<nav className="navbar p-2  bg-pink jost ">
			{/* left-side */}
			
				<Logo/>
			
			{/* right-side */}
			
			 {isAuthenticate?<AutnGadgeth/>: <SingupAndLogin/>}
			
		</nav>

				
		</>
	);
};
 
const Logo = () => {
	return (
		<div>
		<h1 className="ms-5">eCommerce</h1>
		</div>
		

	);
};
 
const SingupAndLogin = () => {
	return (
		<>
		<div>
			
			<button className="bg-white p-2 border border-0 text-color"><Link to="/login">Ingresa</Link></button>
			<button className="bg-button p-2 ms-3 me-5 border border-0 text-color2 ">Registrate</button>
		</div>

		
		</>
		
	);
};

const AutnGadgeth = () => {
	return (
		<>
		<div>
			
			<h1>hello</h1><span>something</span>
		</div>

		
		</>
		
	);
};

