const be_url = "https://3001-apricot-tahr-nih1bqo0.ws-us03.gitpod.io/";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			favorites: [],
			classification: [],
			jwtoken: null,
			sessionUID: null,
			sessionUser: null,
			base: []
		},
		actions: {
			////////////////////BEGIN TESTING PURPOSES @JVM && @ANMORA//////////////////////
			//f(x) built for testing reg form(experimental by now)
			signup: async (first_name, last_name, email, password, birthday) => {
				const res = await fetch("https://3001-apricot-tahr-nih1bqo0.ws-us03.gitpod.io/user", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						first_name: first_name,
						last_name: last_name,
						email: email,
						password: password,
						birthday: birthday
					})
				});
				if (res.ok) {
					return true;
				} else {
					return false;
				}
			},

			login: async (email, password) => {
				await fetch("https://3001-apricot-tahr-nih1bqo0.ws-us03.gitpod.io/login", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email: email, password: password })
				})
					.then(response => response.json())
					.then(jwtoken => {
						if (typeof jwtoken.msg != "undefined") {
							Notify.error(jtwtoken.msg);
						} else {
							console.log(jwtoken);

							setStore({
								jwtoken: jwtoken.jwt,
								sessionUID: jwtoken.id,
								favorites: jwtoken.user.favorites
							}); //syntax {store:jwtoken.attr}
							console.log(getStore());
						}
					});
			},

			signout: () => {
				setStore({ jwtoken: null, sessionUID: null, sessionUser: null });
			},

			//Building Favorites f(x)s
			addFavorites: async (drink_name, drink_img) => {
				const store = getStore();
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
