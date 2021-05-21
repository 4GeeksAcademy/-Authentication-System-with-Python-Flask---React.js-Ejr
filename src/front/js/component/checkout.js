import React from "react";
import logo from "../../img/newAppLogo.jpeg";

export const Checkout = () => {
	return (
		<div className="container">
			<div className="py-5 text-center">
				<img className="d-block mx-auto mb-4" src={logo} alt="" width="150" height="125" />
				<h2>Formulario de Pago</h2>
			</div>

			<div className="row">
				<div className="col-md-4 order-md-2 mb-4">
					<h4 className="d-flex justify-content-between align-items-center mb-3">
						<span className="text-muted">Carrito de Compras</span>
						<span className="badge badge-secondary badge-pill">3</span>
					</h4>
					<ul className="list-group mb-3">
						{/*iterate products to check out*/}
						<li className="list-group-item d-flex justify-content-between lh-condensed">
							<div>
								<h6 className="my-0">Nombre del producto</h6>
								<small className="text-muted">Descripcion</small>
							</div>
							<span className="text-muted">$12</span>
						</li>
						<li className="list-group-item d-flex justify-content-between bg-light">
							<div className="text-success">
								<h6 className="my-0">Descuento</h6>
								<small>PVMART</small>
							</div>
							<span className="text-success">-$5</span>
						</li>
						<li className="list-group-item d-flex justify-content-between">
							<span>Total (CRC)</span>
							<strong>$20</strong>
						</li>
					</ul>

					<form className="card p-2">
						<div className="input-group">
							<input type="text" className="form-control" placeholder="Codigo de Promocion" />
							<div className="input-group-append">
								<button type="submit" className="btn btn-secondary">
									Canjear
								</button>
							</div>
						</div>
					</form>
				</div>
				<div className="col-md-8 order-md-1">
					<h4 className="mb-3">Informacion de Pago</h4>
					<form className="needs-validation" noValidate>
						<div className="row">
							<div className="col-md-12 mb-3">
								<label htmlFor="firstName">Nombre Completo</label>
								<input
									type="text"
									className="form-control"
									id="fullname"
									placeholder=""
									value=""
									required
								/>
							</div>
						</div>

						<div className="mb-3">
							<label htmlFor="email">Correo Electronico</label>
							<input type="email" className="form-control" id="email" placeholder="tu@email.com" />
						</div>

						<h4 className="mb-3">Pago</h4>

						<div className="d-block my-3">
							<div className="custom-control custom-radio">
								<input
									id="credit"
									name="paymentMethod"
									type="radio"
									className="custom-control-input"
									checked
									required
								/>
								<label className="custom-control-label" htmlFor="credit">
									Tarjeta de Credito
								</label>
							</div>
							<div className="custom-control custom-radio">
								<input
									id="debit"
									name="paymentMethod"
									type="radio"
									className="custom-control-input"
									required
								/>
								<label className="custom-control-label" htmlFor="debit">
									Tarjeta de Debito
								</label>
							</div>
							<div className="custom-control custom-radio">
								<input
									id="paypal"
									name="paymentMethod"
									type="radio"
									className="custom-control-input"
									required
								/>
								<label className="custom-control-label" htmlFor="paypal">
									PayPal
								</label>
							</div>
						</div>
						<div className="row">
							<div className="col-md-6 mb-3">
								<label htmlFor="cc-name">Nombre en la Tarjeta</label>
								<input type="text" className="form-control" id="cc-name" placeholder="" required />
							</div>
							<div className="col-md-6 mb-3">
								<label htmlFor="cc-number">Numero de Tarjeta</label>
								<input type="text" className="form-control" id="cc-number" placeholder="" required />
							</div>
						</div>
						<div className="row">
							<div className="col-md-3 mb-3">
								<label htmlFor="cc-Fecha de Expiracion">Fecha de Expiracion</label>
								<input
									type="text"
									className="form-control"
									id="cc-Fecha de Expiracion"
									placeholder=""
									required
								/>
							</div>
							<div className="col-md-3 mb-3">
								<label htmlFor="cc-cvv">CVV</label>
								<input type="text" className="form-control" id="cc-cvv" placeholder="" required />
							</div>
						</div>
						<hr className="mb-4" />
						<button className="btn btn-card btn-lg btn-block" type="submit">
							Pagar
						</button>
					</form>
				</div>
			</div>

			<footer className="my-5 pt-5 text-muted text-center text-small">
				<p className="mb-1"> Company Name</p>
				<ul className="list-inline">
					<li className="list-inline-item">
						<a href="#">Privacy</a>
					</li>
					<li className="list-inline-item">
						<a href="#">Terms</a>
					</li>
					<li className="list-inline-item">
						<a href="#">Support</a>
					</li>
				</ul>
			</footer>
		</div>
	);
};
