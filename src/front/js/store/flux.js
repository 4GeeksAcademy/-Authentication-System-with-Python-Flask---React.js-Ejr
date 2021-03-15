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
					body: JSON.jsonify({
						first_name: first_name,
						last_name: last_name,
						email: email,
						password: password,
						birthday: birthday
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
			}
			/////////////////////END TESTING PURPOSES @JVM && @ANMORA///////////////////////
			// Use getActions to call a function within a fuction
		}
	};
};

export default getState;
