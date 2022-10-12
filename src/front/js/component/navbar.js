import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import rigoImageUr from "../../img/LogoSample_ByTailorBrands.jpg";
import { Context } from "../store/appContext";
export const Navbar = () => {
	const navigate = useNavigate();
	const FuncionCerrarSesion = () => {
		localStorage.removeItem('token');
		navigate("/demo");
	  };
	const { store, actions } = useContext(Context);
	useEffect(() => {
		actions.GetValidacion(localStorage.getItem("token"));
	  }, []);
	return (
		<nav className="navbar navb " id="navbar">
			<div className="container coco d-flex justify-content-center">
				
				
			<div className="fle">
			<Link to="/">
			<button type="button" class="btn coc ">HOME</button>
					
				</Link>
				<Link to="/productos">
				<button type="button" class="btn coc ">RECETAS</button>
				</Link>
				 <Link to="/sub">
				<button type="button" class="btn coc ">PLANES</button>
				</Link>
				<Link to="/contacto">
				<button type="button" class="btn coc ">CONTACTO</button>
				</Link>
			</div>
			</div>
			{store.login ? (
				<div class="btn-group">
				<button class="btn btn-lg dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
				<i class="fa-solid fa-user" id="loginicon"></i>
				</button>
				<div class="dropdown-menu">
				<Link to="/demo">
                    <a onClick={FuncionCerrarSesion} class="dropdown-item" href="#">Cerrar sesion</a>
                    </Link>
				</div>
			  </div>
			):(<div className="login-style"><Link to="/demo" className="logeate">Logeate</Link></div>)}
		</nav>
	);
};

