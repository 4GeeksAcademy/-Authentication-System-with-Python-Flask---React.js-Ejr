import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import LoginModal from "../pages/loginModal";


export const Navbar = () => {
	const {store, actions} = useContext(Context)

	
	return (
		<nav id="navbar-design" className="navbar fixed-top">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand fs-2 mb-0 color-font">GitLoot</span>
				</Link>
				<div className="ml-auto">
					<div className="btn-group dropstart">
						<button type="button" style={{borderRadius:"33% 67% 32% 68% / 90% 9% 91% 10% "}}
							className="btn btn-outline-info dropdown-toggle px-5" data-bs-toggle="dropdown" aria-expanded="false">
								Tu loot!
						</button>
						<ul className="dropdown-menu">
						{store.cart.map((plate, index)=>{
						return(
							<div className="d-flex flex-row" key={index}>
								<li><a className="dropdown-item d-flex flex-row overflow-hidden"  href="#">{plate.plateName}</a></li>
								{/* <button onClick={()=>actions.deleteCartItem(index)} type="button" className="badge rounded-pill bg-info mx-auto">X</button> */}
							</div>
							)})}
							<li className="dropdown-item"><Link to="/checkout"><button className="btn btn-success">Ir a pagar!</button></Link></li>
						</ul>
					</div>
					{
					!!store.accessToken?
					""                                                                          
					:
					<>
						<button type="button" style={{borderRadius:"33% 67% 32% 68% / 90% 9% 91% 10% "}} 
							className="btn btn-outline-primary py-2 px-5" 
							data-bs-toggle="modal" data-bs-target="#loginModal">
								Inicia Sesión!
							</button>
						<Link to="/register">
							<button type="button" style={{borderRadius:"33% 67% 32% 68% / 90% 9% 91% 10% "}} className="btn btn-outline-success py-2 px-5">
								Registrate!
							</button>
						</Link>
					</>
					}
					
					<Link to="/profile">
						<button type="button" style={{borderRadius:"33% 67% 32% 68% / 90% 9% 91% 10% "}} className="btn btn-outline-secondary py-2 px-5">
							Tu Perfil
						</button>
					</Link>
				</div>
			</div>
		</nav>
		
		
	);
};














