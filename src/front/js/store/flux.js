const be_url = "https://3001-apricot-tahr-nih1bqo0.ws-us03.gitpod.io/";

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
			////////////////////BEGIN TESTING PURPOSES @JVM && @ANMORA//////////////////////
			//f(x) built for testing reg form(experimental by now)
			signup: async (email, password) => {
				const res = await fetch("https://3001-apricot-tahr-nih1bqo0.ws-us03.gitpod.io/user", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.jsonify({
						email: email,
						password: password
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
						if (typeof jwtkn.msg != "undefined") {
						} else {
							setStore({ jwtoken: jwtkn.jtw, sessionUID: jwtkn.id, sessionUser: jwtkn.user.favorites }); //syntax {store:data}
						}
					});
			},
			/////////////////////END TESTING PURPOSES @JVM && @ANMORA///////////////////////
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
