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
				await fetch("https://3001-apricot-tahr-nih1bqo0.ws-us03.gitpod.io/signin", {
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
			}
			/////////////////////END TESTING PURPOSES @JVM && @ANMORA///////////////////////
			// Use getActions to call a function within a fuction
		}
	};
};

export default getState;
