const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial:  
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			login: async (email, password) => {
			  const actions = getActions()
			  const data = await api.login(email, password)
			  setStore({ user: data.user, token: data.token })
			  actions.getFavorites()
			  if (!data.user.is_admin) localStorage.setItem('myToken', data.token)
			  return data
			},
			signup: async (
			  email,
			  password,
			  first_name,
			  last_name,
			  phone,
			  location
			) => {
			  const response = await api.signup(
				email,
				password,
				first_name,
				last_name,
				phone,
				location
			  )
			  return response
			},
	},
};

export default getState;
}