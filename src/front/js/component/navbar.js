import React,{useState} from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	const [isAuthenticate,setIsAuthenticate]= useState(true)
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
			
			<button>Login</button>
			<button>singup</button>
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

