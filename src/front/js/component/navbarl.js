import React, { useContext } from "react";
import { Link } from "react-router-dom";
import rigoImageUr from "../../img/LogoSample_ByTailorBrands.jpg";
import { Context } from "../store/appContext";
export const NavbarL = () => {
	const { store, actions } = useContext(Context);
	return (
		<nav className="navbar" id="navbar">
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
			<div className="ml-auto" id="iconos">
				<Link to="/demo">
					<i class="fa-solid fa-1x fa-user" id="loginicon"></i>
				</Link>

			</div>
			<div className="ml-auto">
				<div class="dropdown dropdown-menu-end ">
					<a class="btn  dropdown-toggle"
						role="button"
						id="dropdownMenuLink"
						data-bs-toggle="dropdown"
						aria-expanded="false"><i class="fa-solid fa-2x fa-cart-shopping cart"></i>&nbsp; {/* Nombre del dropdown  */}
						<strong className="contador">{store.favorites.length}</strong> {/* se agrega el contador de favoritos */}
					</a>
					<div class="dropdown-menu dropdown-menu-lg-end" aria-labelledby="dropdownMenuLink" >
						{/* Se crea un map para buscar todo lo que contiene el arreglo favorite con 2 parametros e : evento y i : identificador */}
						{store.favorites.length > 0 ?
							store.favorites.map((e, i) => {
								return (
									<div key={i} className="dropdown-item" >
										<div className="row">
											<div className="col">{e.price}</div>
											<div className="col">
												<a className="badge badge-danger "
													onClick={() => actions.getBorrar(i)}> {/* llamamos a la funcion borrar con el  identificador */}
													<i className="far fa-trash-alt"></i></a></div>
										</div>
									</div>
								);

							})
							:
							<div>

								empty
							</div>
						}
						costo total = 0$
						
					</div>
				</div>
			</div>
		</nav>
	);
};
