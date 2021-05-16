import React from "react";

export const Perfildelproducto = () => {
	return (
		<div className="container">
			<div className="card mb-3">
				<div className="row no-gutters">
					<div className="col-md-4">
						<img
							src="https://i.pinimg.com/originals/c8/43/cc/c843cc2ac7deb559a092b3c3b9b147ad.jpg"
							alt="..."
						/>
					</div>
					<div className="col-md-8">
						<div className="card-body">
							<h5 className="card-title">Nombre del artículo</h5>
							<p className="card-text">Descripción</p>
							<p className="card-text">
								<strong>Precio</strong>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
