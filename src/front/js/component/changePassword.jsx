import React, { useState, useContext } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { Context } from "../store/appContext";
import { useNavigate, useParams } from "react-router-dom";

export const ChangePassword = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const { token } = useParams(); // Capturamos el token desde la URL

	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const formik = useFormik({
		initialValues: {
			clave: '',
			confirmar_clave: ''
		},
		validationSchema: Yup.object({
			clave: Yup.string().min(6, 'Debe tener al menos 6 caracteres').required('Clave requerida'),
			confirmar_clave: Yup.string()
				.oneOf([Yup.ref('clave'), null], 'Las contraseñas no coinciden')
				.required('Confirmación de clave requerida'),
		}),

		onSubmit: async (values) => {
			const result = await actions.restablecerClave(token, values.clave);
			if (result.success) {
				Swal.fire({
					title: 'Excelente!',
					text: result.message,
					icon: 'success',
					timer: 4000
				});
				navigate("/vista-login");
			} else {
				Swal.fire({
					title: 'Lo sentimos!',
					text: result.message,
					icon: 'error',
					timer: 4000
				});
			}
		},
	});

	return (
		<div className="form-container2 text-center mb-3 border border-3 rounded">
			<form action="#" id="login-form" onSubmit={formik.handleSubmit}>
				<h2 className="title fw-semibold text-secondary">Ingresa tu nueva contraseña</h2>

				<div className="d-flex justify-content-center flex-column align-items-center">
					<div className="input-group mb-3">
						<input
							type={showPassword ? "text" : "password"}
							className="form-control"
							name="clave"
							placeholder="Password:"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.clave}
						/>
						<span className="input-group-text cursor-pointer" onClick={togglePasswordVisibility}>
							<i className={`fas fa-eye${showPassword ? '-slash' : ''}`}></i>
						</span>
					</div>
					{formik.touched.clave && formik.errors.clave ? (
						<div className="text-danger">{formik.errors.clave}</div>
					) : null}
				</div>

				<div className="d-flex justify-content-center flex-column align-items-center">
					<div className="input-group mb-3">
						<input
							type={showPassword ? "text" : "password"}
							className="form-control"
							name="confirmar_clave"
							placeholder="Confirme su contraseña:"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.confirmar_clave}
						/>
						<span className="input-group-text cursor-pointer" onClick={togglePasswordVisibility}>
							<i className={`fas fa-eye${showPassword ? '-slash' : ''}`}></i>
						</span>
					</div>
					{formik.touched.confirmar_clave && formik.errors.confirmar_clave ? (
						<div className="text-danger">{formik.errors.confirmar_clave}</div>
					) : null}
				</div>

				<div>
					<button type="submit" className="btn btn-login-registro btn-primary mt-2">
						Guardar
					</button>
				</div>
			</form>
		</div>
	);
};