const getState = ({ getStore, getActions, setStore }) => {
	const url = process.env.BACKEND_URL; // Declarar la variable url

	return {
		store: {
			message: ["Parece que funciona... (?) valor anterior era null y no referenciaba al backend"],
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
			loadRestaurants: () => {
				fetch(url)
					.then(response => response.json())
					.then(data => {
						setStore({
							restaurants: data
						});
					})
					.catch(error => {
						console.error(error);
					});
			},
			loginRequest: (email, password) => {
				fetch(url, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ email, password })
				})
					.then(response => response.json())
					.then(data => {
						console.log(data);
						// Actualizar el estado de inicio de sesión según corresponda
						if (data.success) {
							setStore({ loggedIn: true });
						} else {
							setStore({ loggedIn: false });
						}
					})
					.catch(error => {
						console.error(error);
					});
			},
			registerUser: async (user) => {
				try {
					const response = await fetch(`${url}/signup`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(user),
					});

					if (!response.ok) {
						throw new Error("Error al registrar usuario");
					}

					// Realizar acciones adicionales después del registro exitoso si es necesario

				} catch (error) {
					console.error(error);
					// Manejar errores de registro
				}
			},
		},
	};
};

export default getState;