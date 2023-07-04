const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			users: [],
			canchas: [],
			imgProfile: [],
			imgCancha: [],
			user: [],
			id: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getid: () => {
				const store = getStore();
				return store.id
			},

			signup: async (email, pass, name, lastname) => {
				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						"email": email,
						"password": pass,
						"name": name,
						"lastname": lastname
					})
				}
				try {

					const resp = await fetch('https://ss-api-render-2.onrender.com/signup', options)

					if (resp.status != 200) {
						alert("error en fetch user")
						return false
					}

					const data = await resp.json()
					return true

				}
				catch (error) {
					console.error("error en signUp")
				}
			},

			login: async (email, pass) => {
				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						"email": email,
						"password": pass
					})
				}
				try {
					const resp = await fetch('https://ss-api-render-2.onrender.com/login', options)
					if (resp.status != 200) {
						alert("error en fetch token")
						return false
					}

					const data = await resp.json()
					sessionStorage.setItem("auth_token", data.auth_token)
					sessionStorage.setItem("id", data.id)
					sessionStorage.setItem("isLoggedIn", true)
					return true

				}
				catch (error) {
					console.error("error en login")
				}
			},


			fetchCanchas: async () => {
				const options = {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "http://127.0.0.1:3000",
					},
				};

				try {
					const resp = await fetch("https://ss-api-render-2.onrender.com/canchas", options);
					if (resp.status !== 200) {
						alert("Error fetching canchas");
						return [];
					}
					const data = await resp.json();
					return data;
				} catch (error) {
					console.error("Error in getCanchas:", error);
					return [];
				}
			},


			logout: () => {
				sessionStorage.removeItem("auth_token")
				sessionStorage.removeItem("isLoggedIn")

			},

			getUser: async (user_id) => {
				const options = {
					method: "GET",
					headers: { Authorization: "Bearer " + sessionStorage.getItem("auth_token") }
				}
				try {
					const resp = await fetch('https://ss-api-render-2.onrender.com/user/' + user_id, options)
					if (resp.status != 200) {
						alert("error en fetch user")
						return false
					}

					const data = await resp.json()
					console.log(data)
					setStore({ user: data })
					return true

				}
				catch (error) {
					console.error("error en getUser")
				}
			},


			saveImgProfile: async (img, user_id) => {
				const options = {
					method: "POST",
					headers: {
						"Authorization": "Bearer " + sessionStorage.getItem("auth_token"),
						"Content-Type": "application/json" // Add Content-Type header
					},
					body: JSON.stringify({ img }) // Send the img data in the request body
				};

				try {
					const url = `https://ss-api-render-2.onrender.com/user/${user_id}`;
					const resp = await fetch(url, options);

					if (resp.status !== 200) {
						alert("error en fetch token");
						return false;
					}

					const data = await resp.json();
					sessionStorage.setItem("imgProfile", JSON.stringify(data));

					return true;
				} catch (error) {
					console.error("An error occurred:", error);
					return false;
				}
			},


			updateImgProfile: async (img, user_id) => {
				const options = {
					method: "PUT",
					headers: { Authorization: "Bearer " + sessionStorage.getItem("auth_token") },
					body: JSON.stringify(img)
				};

				try {
					const resp = await fetch(`https://ss-api-render-2.onrender.com/user/${user_id}`, options);

					if (resp.status !== 200) {
						alert("error en fetch token");
						return false;
					}

					const data = await resp.json();

					sessionStorage.setItem("imgProfile", data);

					return true;
				} catch (error) {
					console.error("error en login");
				}
			},


			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},

		}
	};
};

export default getState;
