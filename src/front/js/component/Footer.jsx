import React, { useContext } from "react";
import { Context } from '../store/appContext';

export const Footer = () => {
	const { store, actions } = useContext(Context);


	return (
		<div>
			<footer>
				<section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
					<div className="mx-auto d-flex justify-content-center grid gap-5 align-items-center">
						{/* Social Media Links */}
						{['instagram', 'facebook', 'whatsapp', 'linkedin'].map((social, index) => (
							<div type="button" className="btn btn-link" key={index}>
								<a href={`https://www.${social}.com`}>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`bi bi-${social}`} viewBox="0 0 16 16">
										{/* SVG path for each social icon */}
									</svg>
								</a>
							</div>
						))}
					</div>
				</section>

				<section>
					<div className="container text-center text-md-start mt-4">
						<div className="row mt-3">
							<div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4">
								<h6 className="text-uppercase fw-bold mb-4"></h6>
								<p>Aquí colocar imagen du curso o logo</p>
							</div>

							<div className="col-md-4 col-lg-4 col-xl-4 mx-auto mb-4">
								<h5 className="text-uppercase fw-bold mb-4">Category</h5>
								{store?.category?.length === 0 ? (
									"No hay Category Cargada"
								) : (
									store?.category?.map((item, index) => (
										<div className="row" key={index}>
											<div className="col"><strong>{item.titleCategory}</strong></div>
											<div className="col">{item.subCategory}</div>
										</div>
									))
								)}
							</div>
						</div>
					</div>
				</section>

				<div className="text-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
					© Copyright: Atlas E-learning , 2024
				</div>
			</footer>
		</div>
	);
};
