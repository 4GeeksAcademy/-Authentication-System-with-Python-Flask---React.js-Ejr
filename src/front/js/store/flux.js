const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			signup: false,
			user_data: {
				name: null,
				last_name: null,
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
			}
		}
	};
};

export default getState;
