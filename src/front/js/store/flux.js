import emailjs from "emailjs-com";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

const getState = ({ getStore, getActions, setStore }) => {
	const history = useHistory();
	return {
		store: {
			token: null,
			sellerId: null,
			userId: null,
			isSeller: 0,
			isClient: 0,
			isLoggedIn: null,
			updateProduct: [],
			emailServiceID: "service_69zpagb",
			emailUserID: "user_z7x4Z98eeKRtg2hNKJyJC",
			emailTemplate: {
				recoverEmail: "template_8ynr9ye",
				changedEmail: "template_2piuwtk"
			},
			endPoint: process.env.BACKEND_URL + "/api/",
			storeEndPoint: "https://fakestoreapi.com/",
			uriOrigin: window.location.origin,
			appAuth: [],
			dataMart: [],
			storeProducts: []
		},
		actions: {
			// identify seller or client logging
			isSellerOrClient: whoIs => {
				setStore({ isSeller: whoIs });
			},

			// identify seller or client register
			whosIsRegistering: whoIs => {
				setStore({ isClient: whoIs });
			},

			// identify seller or client register
			getClientData: async () => {
				const store = getStore();
				const apiEndPoint = store.endPoint + "user/" + store.userId;

				let response = await fetch(apiEndPoint);
				let data = await response.json();
				setStore({ appAuth: [...data.results] });
			},

			getSellerData: async () => {
				const store = getStore();
				const apiEndPoint = store.endPoint + "user/" + store.sellerId;

				let response = await fetch(apiEndPoint);
				let data = await response.json();
				setStore({ appAuth: [...data.results] });
			},

			currentProduct: obj => {
				const store = getStore();
				let extracted = store.dataMart.filter((item, index) => index == obj);
				setStore({ updateProduct: extracted });
			},

			// function to fetch data from the api fake store
			loadImageProduct: async () => {
				const store = getStore();
				let response = await fetch(store.storeEndPoint + "products");
				let data = await response.json();
				setStore({ dataMart: [...data] });
			},

			getStoreProducts: async () => {
				const token = sessionStorage.getItem("userToken");
				let myHeaders = new Headers();
				myHeaders.append("Authorization", "Bearer " + token);
				const store = getStore();

				const requestOptions = {
					method: "GET",
					headers: myHeaders,
					body: raw,
					redirect: "follow"
				};

				const apiEndPoint = store.endPoint + "getproducts";
				let response = await fetch(apiEndPoint, requestOptions);
				let data = await response.json();
				setStore({ storeProducts: [...data.results] });
			},

			// function for user registration
			userRegistration: async newuser => {
				const store = getStore();
				const apiEndPoint = store.endPoint + "userregistration";
				let myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");
				let raw = JSON.stringify(newuser);

				const requestOptions = {
					method: "POST",
					headers: myHeaders,
					body: raw,
					redirect: "follow"
				};

				try {
					let response = await fetch(apiEndPoint, requestOptions);
					let data = await response.json();

					if (data.msg === "Client account was successfully created.") {
						setStore({ isSeller: 0 });
						sessionStorage.setItem("whoIsLoggedIn", "0");
						Swal.fire({
							icon: "success",
							title: "Registro exitoso",
							text: "Redirigiendo a pagina de ingreso",
							showConfirmButton: false,
							timer: 2500
						}).then(function() {
							window.location = "/logUserIn";
						});
					} else if (data.msg === "Seller account was successfully created.") {
						setStore({ isSeller: 1 });
						sessionStorage.setItem("whoIsLoggedIn", "1");
						Swal.fire({
							icon: "success",
							title: "Registro exitoso",
							text: "Redirigiendo a pagina de ingreso",
							showConfirmButton: false,
							timer: 2500
						}).then(function() {
							window.location = "/logUserIn";
						});
					} else if (data.msg === "Seller already exists." || data.msg === "Client already exists.") {
						Swal.fire({
							icon: "error",
							title: "Error de Registro",
							text: "El usuario ya existe en nuestros registros.",
							showConfirmButton: false,
							timer: 2500
						});
					} else {
						Swal.fire({
							icon: "error",
							title: "Error en el  registro",
							text: "Favor completar el formulario para un registro exitoso.",
							showConfirmButton: false,
							timer: 2500
						});
					}
				} catch (error) {
					//console.log(error);
				}

				//.catch(error => console.log("error", error));
			},

			// fucnction to allow user log in user
			userLogIn: async user => {
				const store = getStore();
				const apiEndPoint = store.endPoint + "userlogin";
				let myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");
				let raw = JSON.stringify(user);

				const requestOptions = {
					method: "POST",
					headers: myHeaders,
					body: raw,
					redirect: "follow"
				};

				const logInSuccess = () => {
					Swal.fire({
						icon: "success",
						title: "Ingreso exitoso",
						text: "Cargando Catalogo",
						showConfirmButton: false,
						timer: 1500
					}).then(function() {
						store.isSeller === 1 ? (window.location = "/newProduct") : (window.location = "/logueado");
					});
				};

				const logInFailed = () => {
					Swal.fire({
						icon: "error",
						title: "Error de Autenticacion",
						text: "Usuario o Contraseña incorrecto.",
						showConfirmButton: false,
						timer: 1500
					});
				};

				try {
					const resp = await fetch(apiEndPoint, requestOptions);
					const data = await resp.json();
					if (data.token && data.sellerid) {
						sessionStorage.setItem("isLoggedin", true);
						sessionStorage.setItem("userToken", data.token);
						sessionStorage.setItem("sellerId", data.sellerid);
						sessionStorage.setItem("whoIsLoggedIn", "1");
						setStore({ token: data.token });
						setStore({ sellerId: data.sellerid });
						setStore({ isLoggedIn: true });
						logInSuccess();
					} else if (data.token && data.userid) {
						sessionStorage.setItem("userToken", data.token);
						sessionStorage.setItem("isLoggedin", true);
						sessionStorage.setItem("userId", data.userid);
						sessionStorage.setItem("whoIsLoggedIn", "0");
						setStore({ token: data.token });
						setStore({ userId: data.userid });
						setStore({ isLoggedIn: true });

						logInSuccess();
					} else {
						sessionStorage.setItem("isLoggedin", false);
						logInFailed();
					}
				} catch (error) {
					//console.log(error);
				}
			},

			// function to request a password change through the api
			recoverPassword: async email => {
				const store = getStore();
				const apiEndPoint = store.endPoint + "forgotpassword";
				const resetURL = store.uriOrigin + "/resetPassword";

				let myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");
				let raw = JSON.stringify(email);

				const requestOptions = {
					method: "POST",
					headers: myHeaders,
					body: raw,
					redirect: "follow"
				};

				const resetAlert = () =>
					Swal.fire({
						icon: "success",
						title: "Recuperacion de Contraseña",
						text:
							"Si el email existe en nuestra base de datos, recibira un correo con el link para re-establecer su contaseña.",
						showConfirmButton: true
					}).then(function() {
						window.location = "https://" + email.email;
					});

				try {
					const resp = await fetch(apiEndPoint, requestOptions);
					const data = await resp.json();
					if (data.msg != "Your email is not register in our records.") {
						emailjs.send(
							store.emailServiceID,
							store.emailTemplate.recoverEmail,
							{
								from_name: "Pura Vida Mart",
								message: resetURL,
								temp_password: data,
								useremail: email.email
							},
							store.emailUserID
						);

						resetAlert();
					}
				} catch (error) {
					//console.log(error);
				}
			},

			// function to change the password after email confirmation
			resetPassword: async resetDetails => {
				const store = getStore();
				const apiEndPoint = store.endPoint + "resetpassword";
				let myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");
				let raw = JSON.stringify(resetDetails);

				const requestOptions = {
					method: "POST",
					headers: myHeaders,
					body: raw,
					redirect: "follow"
				};

				const resetSuccess = async () => {
					Swal.fire({
						icon: "success",
						title: "Cambio de contraseña",
						text: "Su contraseña ha sido modificada con existo",
						showConfirmButton: false,
						timer: 2500
					}).then(function() {
						window.location = "/logUserIn";
					});
				};

				const resetFailed = () => {
					Swal.fire({
						icon: "error",
						title: "Error al cambiar de contraseña.",
						text:
							"Favor intentar nuevamente con el correo registrado, contraseña temporal y nueva contraseña.",
						showConfirmButton: false,
						timer: 2500
					});
				};

				try {
					const resp = await fetch(apiEndPoint, requestOptions);
					const data = await resp.json();
					if (data.msg == "Password has been successfully changed.") {
						emailjs.send(
							store.emailServiceID,
							store.emailTemplate.changedEmail,
							{
								from_name: "Pura Vida Mart",
								to_email: resetDetails.email
							},
							store.emailUserID
						);
						resetSuccess();
					} else {
						resetFailed();
					}
				} catch (error) {
					//console.log(error);
				}
				//.catch(error => console.log("error", error));
			},

			// function to log user out and clear token and log state
			logUserOut: () => {
				setStore({ isLoggedIn: false });
				setStore({ token: null });
				sessionStorage.clear();
			},
			syncTokenOnRefresh: () => {
				setStore({ token: sessionStorage.getItem("userToken") });
			},

			syncSellerIdOnRefresh: () => {
				setStore({ sellerId: sessionStorage.getItem("sellerId") });
			},

			syncUserIdOnRefresh: () => {
				setStore({ userId: sessionStorage.getItem("userId") });
			},

			syncWhoIsLoggingOnRefresh: () => {
				setStore({ isSeller: sessionStorage.getItem("whoIsLoggedIn") });
			},

			createNewProduct: async prd => {
				const store = getStore();
				const token = sessionStorage.getItem("userToken");
				const apiEndPoint = store.endPoint + "createproduct";
				let myHeaders = new Headers();
				myHeaders.append("Authorization", "Bearer " + token);
				myHeaders.append("Content-Type", "application/json");

				let raw = JSON.stringify(prd);

				const requestOptions = {
					method: "POST",
					headers: myHeaders,
					body: raw,
					redirect: "follow"
				};

				try {
					const resp = await fetch(apiEndPoint, requestOptions);
					const data = await resp.json();
					console.log(data.msg);
					if (data.msg === "The product has being successfully registered.") {
						Swal.fire({
							icon: "success",
							title: "Nuevo producto agregado",
							text: "El nuevo producto fue agregado a su catalogo de productos.",
							showConfirmButton: false,
							timer: 2500
						});
					} else {
						Swal.fire({
							icon: "error",
							title: "Error al ingresar el producto.",
							text: "Favor validar que todos los campos del formulario fueron completados.",
							showConfirmButton: false,
							timer: 2500
						});
					}
				} catch (error) {}
			},
			updateProduct: prdId => {
				const store = getStore();
				const apiEndPoint = store.endPoint + "userregistration";
				let myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");
				let raw = JSON.stringify(newuser);

				const requestOptions = {
					method: "POST",
					headers: myHeaders,
					body: raw,
					redirect: "follow"
				};

				fetch(apiEndPoint, requestOptions)
					.then(response => response.json())
					.then(result => console.log(result));
				//.catch(error => console.log("error", error));
			},
			deleteProduct: prdId => {
				const store = getStore();
				const apiEndPoint = store.endPoint + "userregistration";
				let myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");
				let raw = JSON.stringify(newuser);

				fetch("https://fakestoreapi.com/products/6", {
					method: "DELETE"
				})
					.then(res => res.json())
					.then(json => console.log(json));
			}
		}
	};
};

export default getState;
