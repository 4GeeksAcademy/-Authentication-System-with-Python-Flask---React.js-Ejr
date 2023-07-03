const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			users: [],
			canchas: [],
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
					const resp = await fetch('https://ss-api-render-2.onrender.com/user', options)
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
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						"email": email,
						"password": pass
					})
				}
				try {
					const resp = await fetch('http://127.0.0.1:3001/api/token', options)
					if (resp.status != 200) {
						alert("error en fetch token")
						return false
					}

					const data = await resp.json()
					sessionStorage.setItem("token", data.access_token)
					setStore({ token: data.access_token })
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
						"Access-Control-Allow-Origin": "*",
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
