import React, { useEffect, useState, useContext } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";
import { Context } from "../store/appContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Modal, Button, Form } from 'react-bootstrap';

export const Login = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [email, setEmail] = useState('');
	const { token } = useParams();

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const clientID = "715425283913-rjqjvf4uv4d78qc39hip0pdctti1mcja.apps.googleusercontent.com";

	useEffect(() => {
		const start = () => {
			gapi.auth2.init({
				clientId: clientID
			});
		};
		gapi.load("client:auth2", start);

		const verificarToken = async () => {
			if (token) {
				const { success, message } = await actions.verifyToken(token);
				if (success) {
					Swal.fire({
						title: 'Verificación exitosa',
						text: message,
						icon: 'success',
						timer: 4000
					});
					
				} else {
					Swal.fire({
						title: 'Error en la verificación',
						text: message,
						icon: 'error',
						timer: 4000
					});
					
				}
			}
		};
	
		verificarToken();
	}, [token]);

	const onSuccess = async (response) => {
		const dataUser = response.profileObj;
		const isLogged = await actions.iniciarSesion(dataUser.email, dataUser.googleId);
		if (isLogged) {
			Swal.fire({
				title: 'Bienvenido!',
				text: 'Ingresaste satisfactoriamente!',
				icon: 'success',
				timer: 4000
			});
			navigate("/perfil/"+store.dataUser.id);
		} else {
			Swal.fire({
				title: 'Lo sentimos!',
				text: 'Correo o contraseña incorrectos, intente nuevamente!',
				icon: 'error',
				timer: 4000
			});
			navigate("/vista-login");
		}
	};

	const onFailure = () => {
		console.log('Algo salió mal');
	};

	const formik = useFormik({
		initialValues: {
			correo: '',
			clave: ''
		},
		validationSchema: Yup.object({
			correo: Yup.string().email("Debes introducir un email válido").required('Email requerido'),
			clave: Yup.string().min(6, '6 caracteres como mínimo').required('Contraseña requerida'),
		}),
		onSubmit: async (values) => {
			const isLogged = await actions.iniciarSesion(values.correo, values.clave);
			if (isLogged) {
				Swal.fire({
					title: 'Bienvenido!',
					text: 'Ingresaste satisfactoriamente!',
					icon: 'success',
					timer: 4000
				});
				navigate("/perfil/"+store.dataUser.id);
			} else {
				Swal.fire({
					title: 'Lo sentimos!',
					text: 'Correo o contraseña incorrectos, o puede tener pendiente su verificación de correo. Intente nuevamente!',
					icon: 'error',
					timer: 4000
				});
				navigate("/vista-login");
			}
		},
	});

	const handleShowModal = () => setShowModal(true);
	const handleCloseModal = () => setShowModal(false);

	// Función para manejar el envío del correo de recuperación
	const handleSendRecoveryEmail = async () => {
		if (!email) {
			Swal.fire({
				title: 'Error',
				text: 'Por favor, ingresa tu correo electrónico antes de solicitar la recuperación.',
				icon: 'error',
				confirmButtonText: 'Aceptar'
			});
			return;
		}

		const { success, message } = await actions.solicitarRecuperacion(email);

		if (success) {
			Swal.fire({
				title: 'Correo enviado',
				text: message,
				icon: 'success',
				confirmButtonText: 'Aceptar'
			});
			handleCloseModal();
		} else {
			Swal.fire({
				title: 'Error, verifique su correo',
				text: message,
				icon: 'error',
				confirmButtonText: 'Aceptar'
			});
		}
	};

	return (
		<div className="form-container2 text-center mb-3 border border-3 rounded">
			<form action="#" id="login-form" onSubmit={formik.handleSubmit}>
				<h2 className="title fw-semibold text-secondary">Iniciar sesión</h2>

				<div className="left">
					<div className="d-flex justify-content-center flex-column align-items-center">
						<div className="input-group mb-3">
							<input type="email" className="form-control" name="correo" placeholder="Email:"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.correo} />
						</div>
						{formik.touched.correo && formik.errors.correo ? (
							<div className="text-danger">{formik.errors.correo}</div>
						) : null}
					</div>

					<div className="d-flex justify-content-center flex-column align-items-center">
						<div className="input-group mb-3">
							<input type={showPassword ? "text" : "password"} className="form-control" name="clave" placeholder="Password:"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.clave} />
							<span className="input-group-text cursor-pointer" onClick={togglePasswordVisibility}>
								<i className={`fas fa-eye${showPassword ? '-slash' : ''}`}></i>
							</span>
						</div>
						{formik.touched.clave && formik.errors.clave ? (
							<div className="text-danger">{formik.errors.clave}</div>
						) : null}
					</div>
					<div>
						<button type="submit" className="btn btn-login-registro btn-primary mt-2">Iniciar sesión</button>
					</div>
				</div>
				<div className="right">
					<div className="buttons-container mt-2 d-flex justify-content-center">
						<GoogleLogin className="btn-login-registro d-flex justify-content-center" clientId={clientID} onSuccess={onSuccess} onFailure={onFailure} cookiePolicy="single_host_policy" />
					</div>
					<div className="p-2">
						<Link to="#" onClick={handleShowModal} className="login__forgot m-3">Olvidé mi contraseña</Link>
					</div>
					<div className="linea-divisoria">
						<span className="linea"></span>
						<span className="circulo"></span>
						<span className="linea"></span>
					</div>
					<div className="p-2">
						<p className="sign-up-label">
							¿No tienes una cuenta? <Link to="/vista-register" className="login__forgot m-3">Regístrate</Link>
						</p>
					</div>
				</div>
			</form>

			{/* Modal de recuperación de contraseña */}
			<Modal show={showModal} onHide={handleCloseModal}>
				<Modal.Header closeButton>
					<Modal.Title className="w-100 text-center text-secondary">Recuperar Contraseña</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form className="justify-content-center">
						<Form.Group controlId="formBasicEmail">
							<Form.Label>Ingrese su dirección de correo electrónico</Form.Label>
							<Form.Control
								type="email"
								placeholder="nombre@ejemplo.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer className="d-flex justify-content-center">
					<Button variant="secondary" onClick={handleCloseModal}>
						Cancelar
					</Button>
					<Button variant="primary" onClick={handleSendRecoveryEmail}>
						Enviar Correo de Recuperación
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};
