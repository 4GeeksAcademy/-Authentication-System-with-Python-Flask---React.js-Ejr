import Swal from "sweetalert2";
import emailjs from "emailjs-com";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			isLoggedIn: false,
			emailServiceID: "service_69zpagb",
			emailUserID: "user_z7x4Z98eeKRtg2hNKJyJC",
			emailTemplate: {
				recoverEmail: "template_8ynr9ye",
				changedEmail: "template_2piuwtk"
			},
			endPoint: process.env.BACKEND_URL + "api/",
			uriOrigin: window.location.origin,
			appAuth: [],
			dataMart: []
		},
		actions: {
			// get login/registration information
			responseGoogle: response => {
				return response;
			},

			responseFacebook: response => {
				return response;
			},

			userRegistration: newuser => {
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
					.then(result => console.log(result))
					.catch(error => console.log("error", error));
			},
			// function to allow user log in user
			userLogIn: newuser => {
				const store = getStore();
				const apiEndPoint = store.endPoint + "userlogin";
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
					.then(result => console.log(result))
					.catch(error => console.log("error", error));
			},

			// function to request a password change through the api
			recoverPassword: email => {
				const store = getStore();
				const apiEndPoint = store.endPoint + "forgotPassword";
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

				fetch(apiEndPoint, requestOptions)
					.then(res => res.json())
					.then(res => {
						if (res.msg != "Your email is not register in our records.") {
							emailjs.send(
								store.emailServiceID,
								store.emailTemplate.recoverEmail,
								{
									from_name: "Pura_Vida_Mart",
									message: resetURL,
									temp_password: res,
									to_email: email
								},
								store.emailUserID
							);
						}
					})
					.catch(error => console.log("error", error));
			},

			// function to change the password after email confirmation
			resetPassword: resetDetails => {
				const store = getStore();
				const apiEndPoint = store.endPoint + "reset";
				let myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");
				let raw = JSON.stringify(resetDetails);

				const requestOptions = {
					method: "POST",
					headers: myHeaders,
					body: raw,
					redirect: "follow"
				};

				fetch(apiEndPoint, requestOptions)
					.then(res => res.json())
					.then(res => {
						if ((res.msg = "Password has been successfully changed.")) {
							emailjs.send(
								store.emailServiceID,
								store.emailTemplate.changedEmail,
								{
									from_name: "Pura_Vida_Mart",
									to_email: resetDetails.email
								},
								store.emailUserID
							);
						}
					})
					.catch(error => console.log("error", error));
			},

			//push login/registration information
			getUserIn: () => {
				//get the store
				const store = getStore();

				//push data to store
				store.appAuth.push(getActions().responseGoogle());
				store.appAuth.push(getActions().responseFacebook());
			}
			// fillStore: () => {
			// 	fetch("https://fakestoreapi.com/products")
			// 		.then(res => res.json())
			// 		.then(json => setStore({ dataMart: json }));
			// },
			// fillDataBase: () => {
			// 	let myHeaders = new Headers();
			// 	myHeaders.append("Content-Type", "application/json");
			// 	let raw = JSON.stringify(newuser);

			// 	const requestOptions = {
			// 		method: "POST",
			// 		headers: myHeaders,
			// 		body: raw,
			// 		redirect: "follow"
			// 	};

			// 	const apiEndPoint = "https://3001-chocolate-ox-jjqxr0q2.ws-us03.gitpod.io/api/userregistration";

			// 	fetch(apiEndPoint, requestOptions)
			// 		.then(response => response.json())
			// 		.then(result => console.log(result))
			// 		.catch(error => console.log("error", error));
			// }
		}
	};
};

export default getState;
