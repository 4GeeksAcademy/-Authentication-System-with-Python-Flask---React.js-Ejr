import React,{useState} from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	const [isAuthenticate,setIsAuthenticate]= useState(false)
	return (
		<>
		<nav className="navbar bg-pink">
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
		<h1>eCommerce</h1>
		</div>
		
		
	);
};
 
const SingupAndLogin = () => {
	return (
		<>
		<div>
			
			<button className="bg-white p-2 border border-0 text-color">Login</button>
			<button className="bg-button p-2 ms-3 me-5 border border-0 text-color2 ">singup</button>
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

