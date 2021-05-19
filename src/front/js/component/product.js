import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import CurrencyInput from "react-currency-input-field";
import Swal from "sweetalert2";

export const Product = () => {
	const { actions, store } = useContext(Context);
	const [price, setPrice] = useState(null);
	const [product, setProduct] = useState({
		productName: "",
		description: "",
		category: "",
		price: null,
		itemstatus: "",
		sellerId: null
	});
	const [prdImage, setPrdImage] = useState({
		image: null
	});

	const prdSuccess = () => {
		Swal.fire({
			icon: "success",
			title: "Producto Creado exitosamente",
			text: "Abrir catalogo para ver el producto ingresado recientemente",
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
		console.log(product);
		actions.createNewProduct(product);
		prdSuccess();
	};
	return (
		<div className="container">
			<section className="panel panel-default">
				<div className="panel-heading">
					<h3 className="panel-title">Nuevo Producto</h3>
				</div>
				<div className="panel-body">
					<form onSubmit={handleChange} className="form-horizontal" role="form">
						<div className="form-group">
							<label htmlFor="name" className="col-sm-5 control-label">
								Nombre del Producto
							</label>
							<div className="col-sm-9">
								<input
									type="text"
									className="form-control"
									name="productName"
									id="name"
									placeholder="Ingrese aquí"
									onChange={handleChange}
								/>
							</div>
						</div>
						<div className="form-group">
							<label htmlFor="tech" className="col-sm-3 control-label">
								Categoría
							</label>
							<div className="col-sm-5">
								<select className="form-control" name="category" onChange={handleChange}>
									<option>Categorias</option>
									<option>Hogar</option>
									<option>Salud</option>
									<option>Deportes</option>
								</select>
							</div>
						</div>
						<div className="form-group">
							<label htmlFor="about" className="col-sm-3 control-label">
								Descripción
							</label>
							<div className="col-sm-9">
								<textarea
									className="form-control"
									placeholder="Ingrese una breve descripción"
									name="description"
									onChange={handleChange}
								/>
							</div>
						</div>
						<div className="form-group">
							<label htmlFor="qty" className="col-sm-3 control-label">
								Precio
							</label>
							<div className="col-sm-3">
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
						</div>
						<div className="form-group">
							<label htmlFor="name" className="col-sm-9 control-label">
								Fotografía{" "}
								<small>
									<i style={{ color: "#e12626" }}>*</i> Recomendamos Formatos (.jpg y .png) y que se
									carguen en forma de url
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
							<label htmlFor="tech" className="col-sm-3 control-label">
								Estado del artículo
							</label>
							<div className="col-sm-5">
								<select className="form-control" name="itemstatus" onChange={handleChange}>
									<option>Estado del Articulo</option>
									<option>Nuevo</option>
									<option>Usado</option>
									<option>Como nuevo</option>
								</select>
							</div>
						</div>
						<hr />
						<div className="form-group">
							<div className="col-sm-offset-3 col-sm-9">
								<button type="submit" onClick={handleSubmit} className="btn btn-custom">
									Publicar
								</button>
							</div>
						</div>
					</form>
				</div>
			</section>
		</div>
	);
};
