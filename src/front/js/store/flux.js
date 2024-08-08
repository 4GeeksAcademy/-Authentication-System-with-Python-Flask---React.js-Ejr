const apiUrl = process.env.BACKEND_URL + "/api";
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			token: null,
			userId: null,
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
			loadSession: async () =>{
				let storageToken = localStorage.getItem("token");
				if(!storageToken) return;
				setStore({ token: storageToken });
				let resp = await fetch(apiUrl + "/pinguser", {
					headers: {
						Authorization: "Bearer " + storageToken,
					},
				});
				if(!resp.ok) {
					setStore(({ token: null }));
					return false;
				}
				let data = await resp.json();
				setStore({ userId: data })
				return true;
			},
			login: async (email, password) => {
				let resp = await fetch(apiUrl + "/login", {
					method: "POST",
					body: JSON.stringify({email, password }),
					headers: {
						"Content-Type" : "application/json",
					},
				});
					if(!resp.ok) {
						setStore({ token: null});
						return false;
					};
					let data = await resp.json();
					setStore({ token: data.access_token });
					localStorage.setItem("token", data.access_token);
					return true;
			},
			signup: async (email, password, name, phone_number) => {
				let resp = await fetch(apiUrl + "/signupuser", {
					method: "POST",
					body: JSON.stringify({email, password, name, phone_number}),
					headers: {
						"Content-Type": "application/json",
					},
				});
				if(!resp.ok) {
					const errorData = await resp.json();
					return false;
				}
				let data = await resp.json();
					return true;
			},
			logout: async () => {
				let { token } = getStore();
				let resp = await fetch(apiUrl + "/logout", {
					method: "POST",
					headers: {
						Authorization: "Bearer " + token,
					},
				});
				if (!resp.ok) return false;
				setStore({ token: null, userId: null });
				localStorage.removeItem("token");
				return true;
			},
		},
	};
};

export default getState;
