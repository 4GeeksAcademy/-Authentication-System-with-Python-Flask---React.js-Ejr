import React from 'react';
import { Link } from 'react-router-dom';


const Footer = () => {
	return (

		<div className="container-footer mt-5">
			<footer className="py-5">
				<div className="row">
					<div className="col-2">
						<h5>Viajes</h5>
						<ul className="nav flex-column">
							<li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted" >Home</Link></li>
							<li className="nav-item mb-2"><Link to="/trip" className="nav-link p-0 text-muted" >Planea tu siguiente trip</Link></li>
							<li className="nav-item mb-2"><Link to="/reviews" className="nav-link p-0 text-muted" >Reseñas</Link></li>
							<li className="nav-item mb-2"><Link to="/offers" className="nav-link p-0 text-muted" >Ofertas</Link></li>
							<li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-muted">Ayuda</Link></li>
						</ul>
					</div>

					<div className="col-2">
						<h5>Empresa</h5>
						<ul className="nav flex-column">
						<li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-muted" >Política de cookies</Link></li>
							<li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-muted" >Política de privacidad</Link></li>
							<li className="nav-item mb-2"><Link to="/terms" className="nav-link p-0 text-muted" >Términos de servicio</Link></li>
							<li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-muted" >Información de la empresa</Link></li>
							<li className="nav-item mb-2"><Link to="/contact" className="nav-link p-0 text-muted">Contacto</Link></li>
						</ul>
					</div>

					{/* <div className="col-2">
						<h5>Mi Cuenta</h5>
						<ul className="nav flex-column">
						<li className="nav-item mb-2"><Link to="=login" className="nav-link p-0 text-muted" >Mis ofertas</Link></li>
							<li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-muted" >Mi perfil</Link></li>
							<li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-muted" >Pricing</Link></li>
							<li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-muted" >FAQs</Link></li>
							<li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-muted">About</Link></li>
						</ul>
					</div> */}

					<div className="col-6 offset-1">
						<form>
							<h5>Suscríbete a nuestro Newsletter</h5>
							<p>Recibe ofertas y promociones exclusivas.</p>
							<div className="d-flex w-100 gap-2">
								<label htmlFor="newsletter1" className="visually-hidden">Correo electrónico</label>
								<input id="newsletter1" type="text" className="form-control" placeholder="Email address" />
								<button className="btn btn-primary" type="button">Subscribe</button>
							</div>
						</form>
					</div>
				</div>

				<div className="d-flex justify-content-between py-4 my-4 border-top">
					<p><strong>© 2023 TRIP NEXUS, S,L.</strong>Todos los derechos reservados.</p>
					<ul className="list-unstyled d-flex">
						{/* <li className="ms-3"><Link className="link-dark" to="#"><svg className="bi" width="24" height="24"><use xlinkHref="#twitter"></use></svg></Link></li>
						<li className="ms-3"><Link className="link-dark" to="#"><svg className="bi" width="24" height="24"><use xlinkHref="#instagram"></use></svg></Link></li>
						<li className="ms-3"><Link className="link-dark" to="#"><svg className="bi" width="24" height="24"><use xlinkHref="#facebook"></use></svg></Link></li> */}
					</ul>
				</div>
			</footer>
		</div>
	);

};

export default Footer;
