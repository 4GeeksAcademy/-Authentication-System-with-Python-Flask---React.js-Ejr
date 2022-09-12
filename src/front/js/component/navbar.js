import React, { useContext } from "react";
import { Link } from "react-router-dom";
import rigoImageUr from "../../img/LogoSample_ByTailorBrands.jpg";
import { Context } from "../store/appContext";
export const Navbar = () => {
	const { store, actions } = useContext(Context);
	return (
		<nav className="navbar" id="navbar">
			<div className="container coco">
				
				
			<div className="fle">
			<Link to="/">
			<button type="button" class="btn coc ">HOME</button>
					
				</Link>
				<Link to="/productos">
				<button type="button" class="btn coc ">PRODUCTOS</button>
				</Link>
				<Link to="/contacto">
				<button type="button" class="btn coc ">CONTACTO</button>
				</Link>
			</div>
				<div className="ml-auto" id="iconos">
					<Link to="/demo">
				<i class="fa-solid fa-1x fa-user" id="loginicon"></i>
				</Link>
				<i class="fa-solid fa-cart-shopping cart"></i>
				</div>
			</div>
			<div className="ml-auto">
				<div class="dropdown">
					<a class="btn  dropdown-toggle"
						role="button"
						id="dropdownMenuLink"
						data-bs-toggle="dropdown"
						aria-expanded="false">Favorites&nbsp; {/* Nombre del dropdown  */}
						<strong className="contador">{store.favorites.length}</strong> {/* se agrega el contador de favoritos */}
					</a>
					<div class="dropdown-menu" aria-labelledby="dropdownMenuLink" >
						{/* Se crea un map para buscar todo lo que contiene el arreglo favorite con 2 parametros e : evento y i : identificador */}
						{store.favorites.map((e, i) => {
							return (
								<div key={i} className="dropdown-item" >
									<div className="row">
										<div className="col">{e.name}</div>
										<div className="col">
											<a className="badge badge-danger "
												onClick={() => actions.getBorrar(i)}> {/* llamamos a la funcion borrar con el  identificador */}
												<i className="far fa-trash-alt"></i></a></div>
									</div>
								</div>
							);

						})}
					</div>
				</div>
			</div>
		</nav>
	);
};
