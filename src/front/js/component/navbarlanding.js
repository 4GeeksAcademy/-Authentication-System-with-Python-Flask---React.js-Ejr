import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
import facebook from "../../img/facebook.png";
import google from "../../img/google.png";
import inicio from "../../img/inicio.png";

export const Navbarlanding = () => {
	return (
		<nav className="navbar fixed-top">
			<div className="header container-fluid">
				<div className="brand">
				 <Link to="/">
					<img className="logo" src={logo}/>
				    <span className="nombre">CoinChange</span>

				 </Link>
				</div>
				<div className="ml-auto">
					
					<button type="button" className="buttonNavbar" data-bs-toggle="modal" data-bs-target="#modalinicio">Iniciar sesión</button>

					<div className="modal fade" id="modalinicio" tabindex="-1" aria-hidden="true" aria-labelledby="modalTitle">
						<div className="modal-dialog">
						  <div className="modal-content">
						        <div className="modal-header"style={{backgroundColor:'#2B3E84',color:"#ffffff"}}>
						             <h5 className="modal-title fw-bold" id="modalTitle" style={{backgroundColor:'#2B3E84',color:"#ffffff","margin-left":"180px"}}>Bienvenido</h5>
						             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						        </div>
							<div className="container">
								<div className="row">
									
									<div className="col p-5">
									<div className="text-start">
										<img className="logo" src={logo} style={{width:"70px", height:"70px"}}/>
									</div>
										<form action="#">
											<div className="mb-4">
												<label for="email" className="form-label">Correo electrónico</label>
												<input type="email" className="form-control" name="email"></input>
											</div>
											<div className="mb-4">
											<label for="password" className="form-label">Contraseña</label>
												<input type="password" className="form-control" name="password"></input>
											</div>
											<div className="mb-4 form-check">
												<input type="checkbox" name="connected" className="form-check-input" id=""/>
												<label for="connected" className="form-check-label">Mantenerme conectado</label>

											</div>
											<div className="d-grid">
												<button type="submit" style={{backgroundColor:'#2B3E84',color:"#ffffff","margin-bottom":"10px","border-radius":"8px" }}>Iniciar Sesión</button>
											</div>
											<div className="my-3">
												<span>¿No tienes cuenta? <a href="#">Regístrate</a></span><br></br>
												<span><a href="#">Recuperar contraseña</a></span>
											</div>
											<div className="container w-100 my-5">
												<div className="row text-center">
													<div className="col-12">Iniciar sesión</div>
												</div>
												<div className="row">
												<div className="col">
													<button className="btn btn-outline-primary w-100 my-1">
													<div className="row align-items-center">
													        <div className="col-2">
													          <img src={facebook} style={{width:"28px"}}/>
															</div>  
													        <div className="col-10 text-center">
														          Facebook
													        </div>
													</div>
													</button>
												</div>
												<div className="col">
												<button className="btn btn-outline-danger w-100 my-1">
													<div className="row align-items-center">
													        <div className="col-2">
													          <img src={google} style={{width:"28px"}}/>
															</div>  
													        <div className="col-10 text-center">
														          Google
													        </div>
													</div>
													</button>
												</div>
												</div>
											</div>
										</form>
									</div>	

								</div>
							</div>
						    </div>
						</div>
					</div>
					<Link to="/demo">
						<button className="buttonNavbar">Registrarse</button>
				    </Link>
					

				</div>
			</div>
		</nav>
	);
};
