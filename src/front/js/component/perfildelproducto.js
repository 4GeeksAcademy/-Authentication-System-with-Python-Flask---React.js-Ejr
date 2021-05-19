import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import CurrencyInput from "react-currency-input-field";

export const Perfildelproducto = () => {
	const { actions, store } = useContext(Context);
	const [price, setPrice] = useState(null);
	const [product, setProduct] = useState({
		productName: "",
		description: "",
		category: "",
		price: null,
		itemstatus: "",
		image: "",
		sellerId: null
	});

	const prdSuccess = () => {
		Swal.fire({
			icon: "success",
			title: "Producto actualizado exitosamente",
			text: "Abrir catalogo para ver el cambio ingresado recientemente",
			showConfirmButton: false,
			timer: 1500
		});
	};

	const handleChange = e => {
		setProduct({
			...product,
			// Trimming any whitespace
			[e.target.name]: e.target.value.trim()
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		// ... submit to API or something
		product.sellerId = store.sellerId;
		product.price = price;
		actions.updateProduct(product);
		prdSuccess();
	};
	return (
		<div className="container">
			<div className="card mb-3">
				<div className="row no-gutters">
					<div className="col-md-4">
						<img src={store.updateProduct[0].image} className="card-img-top my-5" alt="..." />
					</div>
					<div className="col-md-8">
						<div className="card-body">
							<h5 className="card-title">{store.updateProduct[0].title}</h5>
							<p className="card-text">{store.updateProduct[0].description}</p>
							<p className="card-text">
								<strong>{store.updateProduct[0].price}</strong>
							</p>
							<button
								className="btn btn-card mr-2"
								data-toggle="modal"
								data-target="#exampleModal"
								data-whatever="@mdo">
								Actualizar Producto
							</button>
							<button
								className="btn btn-card-red ml-2"
								onClick={() => actions.deleteProduct(store.updateProduct[0].id)}>
								Eliminar Producto
							</button>
						</div>
					</div>
				</div>
			</div>
			<div
				className="modal fade"
				id="exampleModal"
				tabIndex="-1"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">
								Actualizacion de Producto
							</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<form>
								<div className="form-group">
									<label htmlFor="recipient-name" className="col-form-label">
										Nombre del producto
									</label>
									<input type="text" className="form-control" id="recipient-name" />
								</div>
								<div className="form-group">
									<label htmlFor="message-text" className="col-form-label">
										Categoria
									</label>
									<select className="form-control" name="category" onChange={handleChange}>
										<option>Categorias</option>
										<option>Hogar</option>
										<option>Salud</option>
										<option>Deportes</option>
									</select>
								</div>
								<div className="form-group">
									<label htmlFor="message-text" className="col-form-label">
										Descripcion
									</label>
									<textarea className="form-control" id="message-text" />
								</div>
								<div className="form-group">
									<label htmlFor="message-text" className="col-form-label">
										Precio del Producto
									</label>
									<CurrencyInput
										className="form-control"
										name="price"
										placeholder="Precio del Producto"
										prefix="₡ "
										defaultValue={0}
										decimalsLimit={2}
										onValueChange={value => setPrice(value)}
									/>
								</div>
								<div className="form-group">
									<label htmlFor="name" className="col-sm-9 control-label">
										Fotografía{" "}
										<small>
											<i style={{ color: "#e12626" }}>*</i> Recomendamos Formatos (.jpg y .png) y
											que se carguen en forma de url
										</small>
									</label>
									<div className="col-sm-9">
										<textarea
											className="form-control"
											placeholder="URL de la imagen del articulo"
											name="image"
											onChange={handleChange}
										/>
									</div>
								</div>
								<div className="form-group">
									<label htmlFor="message-text" className="col-form-label">
										Estado del Producto
									</label>
									<select className="form-control" name="itemstatus" onChange={handleChange}>
										<option>Estado del Articulo</option>
										<option>Nuevo</option>
										<option>Usado</option>
										<option>Como nuevo</option>
									</select>
								</div>
							</form>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn  btn-card" data-dismiss="modal">
								Confirmar actualizacion
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
