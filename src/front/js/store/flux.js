const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			sellerId: null,
			isSeller: null,
			isClient: null,
			isLoggedIn: false,
			emailServiceID: "service_69zpagb",
			emailUserID: "user_z7x4Z98eeKRtg2hNKJyJC",
			emailTemplate: {
				recoverEmail: "template_8ynr9ye",
				changedEmail: "template_2piuwtk"
			},
			endPoint: "https://3001-coffee-haddock-7k62zdl7.ws-us04.gitpod.io" + "/api/", //process.env.BACKEND_URL
			uriOrigin: window.location.origin,
			appAuth: [],
			dataMart: []
		},
		actions: {
			// identify seller or client logging
			isSellerOrClient: whoIs => {
				const store = getStore();
				setStore({ isSeller: whoIs });
				console.log(store.isSeller);
			},

			// identify seller or client register
			whosIsRegistering: whoIs => {
				setStore({ isClient: whoIs });
			},
			// get login/registration information
			responseGoogle: response => {
				return response;
			},

			responseFacebook: response => {
				return response;
			},

			// function to fetch data from the api fake store
			loadImageProduct: async () => {
				let response = await fetch("https://fakestoreapi.com/products");
				let data = await response.json();
				setStore({ dataMart: [...data] });
			},

			// function for user registration
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

				try {
					const resp = await fetch(apiEndPoint, requestOptions);
					const data = await resp.json();
					if (data.token && data.userid) {
						sessionStorage.setItem("userToken", data.token);
						sessionStorage.setItem("sellerId", data.userid);
						setStore({ token: data.token });
						setStore({ sellerId: data.userid });
					} else if (data.token) {
						sessionStorage.setItem("userToken", data.token);
						setStore({ token: data.token });
					}
				} catch (error) {
					console.log(error);
				}
			},
			syncTokenOnRefresh: () => {
				setStore({ token: sessionStorage.getItem("userToken") });
			},

			syncSellerIdOnRefresh: () => {
				setStore({ sellerId: sessionStorage.getItem("sellerId") });
			},

			// function to log user out and clear token and log state
			logUserOut: () => {
				setStore({ isLoggedIn: false });
				setStore({ token: null });
				sessionStorage.clear();
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
									from_name: "Pura Vida Mart",
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
									from_name: "Pura Vida Mart",
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
			},
			createNewProduct: () => {},
			uploadProductImage: () => {},
			updateProduct: prdId => {},
			deleteProduct: prdId => {}
		}
	};
};

export default getState;
