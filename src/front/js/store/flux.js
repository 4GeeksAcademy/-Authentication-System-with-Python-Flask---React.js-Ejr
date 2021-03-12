const be_url = "https://3001-apricot-tahr-nih1bqo0.ws-us03.gitpod.io";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
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
			],
			favorites: [],
			classification: [],
			jwtoken: null,
			sessionUID: null,
			sessionUser: null
		},
		actions: {
			//f(x) built for testing reg form(experimental by now)
			signup: async (first_name, last_name, email, password, is_older) => {
				const res = await fetch(`${be_url}user`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.jsonify({
						first_name: first_name,
						last_name: last_name,
						email: email,
						password: password,
						is_older: is_older
					})
				});
				const data = await res.json();
				console.table(data.msg);
			},
			login: async (email, password) => {
				await fetch(`${BE_Url}login`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: { email: email, password: password }
				})
					.then(response => response.json())
					.then(jwtkn => {
						if (typeof jwtoken.msg != "undefined") {
						} else {
							setStore({ jwtoken: jwtkn.jtw, sessionUID: jwtkn.id, sessionUser: jwtkn.user.favorites });
						}
					});
			},
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: () => {
				// fetching data from the backend
				fetch(process.env.BACKEND_URL + "/api/hello")
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
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
			}
		}
	};
};

export default getState;
