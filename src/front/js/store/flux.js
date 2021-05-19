import emailjs from "emailjs-com";

const getState = ({ getStore, getActions, setStore }) => {
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
			endPoint: process.env.BACKEND_URL + "/api/", //
			uriOrigin: window.location.origin,
			appAuth: [],
			dataMart: [],
			storeProducts: []
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

			// identify seller or client register
			getClientData: async () => {
				const store = getStore();
				const apiEndPoint = store.endPoint + "user/" + store.userId;

				let response = await fetch(apiEndPoint);
				let data = await response.json();
				setStore({ appAuth: [...data.results] });
				console.log(store.appAuth);
			},

			getSellerData: async () => {
				const store = getStore();
				const apiEndPoint = store.endPoint + "user/" + store.sellerId;

				let response = await fetch(apiEndPoint);
				let data = await response.json();
				setStore({ appAuth: [...data.results] });
				console.log(store.appAuth);
			},

			currentProduct: obj => {
				const store = getStore();
				let extracted = store.dataMart.filter((item, index) => index == obj);
				setStore({ updateProduct: extracted });
			},
			// get login/registration information
			// responseGoogle: response => {
			// 	console.log(response);
			// 	return response;
			// },

			// responseFacebook: response => {
			// 	store = getStore();
			// 	setStore(appAuth.push(response));
			// 	console.log(store.appAuth);
			// 	return response;
			//},

			// function to fetch data from the api fake store
			loadImageProduct: async () => {
				let response = await fetch("https://fakestoreapi.com/products");
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
					if (data.token && data.sellerid) {
						sessionStorage.setItem("isLoggedin", true);
						sessionStorage.setItem("userToken", data.token);
						sessionStorage.setItem("sellerId", data.sellerid);
						setStore({ token: data.token });
						setStore({ sellerId: data.sellerid });
						setStore({ isLoggedIn: true });
					} else if (data.token && data.userid) {
						sessionStorage.setItem("userToken", data.token);
						sessionStorage.setItem("isLoggedin", true);
						sessionStorage.setItem("userId", data.userid);
						setStore({ token: data.token });
						setStore({ userId: data.userid });
						setStore({ isLoggedIn: true });
					} else {
						sessionStorage.setItem("isLoggedin", false);
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

			syncUserIdOnRefresh: () => {
				setStore({ userId: sessionStorage.getItem("userId") });
			},

			syncLoggedInOnReresh: () => {
				setStore({ isLoggedIn: sessionStorage.getItem("isLoggedin") });
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
									useremail: email.email
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
			createNewProduct: prd => {
				const store = getStore();
				const token = sessionStorage.getItem("userToken");
				const apiEndPoint = store.endPoint + "createproduct";
				let myHeaders = new Headers();
				myHeaders.append("Authorization", "Bearer " + token);

				var formdata = new FormData();
				formdata.append("productname", prd.productName);
				formdata.append("description", prd.description);
				formdata.append("category", prd.category);
				formdata.append("price", prd.price);
				formdata.append("itemstatus", prd.itemstatus);
				formdata.append("sellerid", prd.sellerId);

				const requestOptions = {
					method: "POST",
					headers: myHeaders,
					body: formdata,
					redirect: "follow"
				};

				fetch(apiEndPoint, requestOptions)
					.then(response => response.json())
					.then(result => console.log(result))
					.catch(error => console.log("error", error));
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
					.then(result => console.log(result))
					.catch(error => console.log("error", error));
			},
			deleteProduct: prdId => {
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

			uploadProductImage: () => {}
		}
	};
};

export default getState;
