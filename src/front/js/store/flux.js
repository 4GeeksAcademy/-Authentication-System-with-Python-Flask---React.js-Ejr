const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			signup: false,
			isloged: false,
			user_data: {
				name: null,
				last_name: null,
				email: null,
				password: null
			},
			login_user: {
				email: null,
				password: null
			}
		},
		actions: {
			isPropertyEmpty: (obj) => {
				for (const key in obj) {
					if (obj[key] === "" || obj[key] == null || obj[key] === undefined) {
						return true;
					}
				}
				return false;
			},
			signUpUser: async () => {
				const store = getStore()
				const actions = getActions()
				try {

					if (actions.isPropertyEmpty(store.user_data)) {
						alert("Le falta llenar algunos datos");
						return;
					}

					const response = await fetch(process.env.BACKEND_URL + "/signup", {
						method: 'POST',
						body: JSON.stringify(store.user_data),
						headers: {
							'Content-Type': 'application/json'
						}
					})

					const result = await response.json()
					if (response.status == 400) {
						setStore({ signup: false })
						alert(result.message)

					}


					if (response.ok) {
						setStore({ signup: true })
						alert("User add success")
					}


				} catch (error) {
					console.error(error + " Error loading message from backend");
					setStore({ signup: false })
				}
			},
			logInUser: async () => {
				const store = getStore()
				const actions = getActions()
				try {
					if (actions.isPropertyEmpty(store.login_user)) {
						alert("Le falta llenar algunos datos");
						return;
					}

					const response = await fetch(process.env.BACKEND_URL + "/login", {
						method: 'POST',
						body: JSON.stringify(store.login_user),
						headers: {
							'Content-Type': 'application/json'
						}
					})
					const result = await response.json()
					console.log(result);

					if (response.ok) {
						localStorage.setItem("jwt-token", result.access_token);
						alert("Login success");
						setStore({ isloged: true });
						return true;
					} else {
						setStore({ isloged: false })
						alert(result.message)
					}

				} catch (error) {
					console.log(error + " Error loading message from backend")
					setStore({ isloged: false })
				}

			},
			handleChange: (e, type) => {
				const store = getStore()
				if (type == "login") {
					const newUserData = { ...store.login_user }
					newUserData[e.target.name] = e.target.value
					setStore({ login_user: newUserData })
				} else if (type == "signup") {
					const newUserData = { ...store.user_data }
					newUserData[e.target.name] = e.target.value
					setStore({ user_data: newUserData })
				}
			}
		}
	};
};

export default getState;
