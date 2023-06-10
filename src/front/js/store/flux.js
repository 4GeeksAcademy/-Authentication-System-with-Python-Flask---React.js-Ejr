const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: ["Parece que funciona...  (?) valor anterior era null y no referenciaba al backend"],
			restaurantes: [
				{
					name: "wok",
					plates: [{ plateName: "Ramen", price: "40000", price: "5000", description: "x", image: "" }, { plateName: "Onigiri", price: "20000", price: "5000", description: "x", image: "" }, { plateName: "Arroz", price: "4000", price: "5000", description: "x", image: "" }, { plateName: "Sushi", price: "20000", price: "5000", description: "x", image: "" }],
					locations: ["Colombia", "Costa"],
					image: "https://cdn.leonardo.ai/users/25acf724-d0fb-44e7-8da5-a5932af5eac9/generations/65d1d1eb-9819-4610-9871-6d8e0ff7a206/DreamShaper_v6_wok_ramen_logo_on_top_right_elegant_marketing_0.jpg",
					subscription: [{ SubscriptionName: "Italianisimo", description: "Tendras una fabulosa comida variada todos los días!, Lunes Pizza, martes Pasta, miercoles fettucinni, jueves, gnocci, variaremos las combinaciones e ingredientes a lo lagro de la semana, asume lo delicioso y asegura tus sorpresas!", price: "20000" }]
				},
				{
					name: "McDonalds",
					plates: [{ plateName: "Hamburguesa", price: "15000", price: "5000", description: "x", image: "" }, { plateName: "Hamburguesa con queso", price: "19000", price: "5000", description: "x", image: "" }, { plateName: "Doble libra", price: "20000", price: "5000", description: "x", image: "" }, { plateName: "Big Mac", price: "25000", price: "5000", description: "x", image: "" }],
					locations: ["Colombia", "Costa"],
					image: "https://cdn.leonardo.ai/users/25acf724-d0fb-44e7-8da5-a5932af5eac9/generations/f58af186-c80a-417f-af68-a5680f639561/DreamShaper_v6_McDonalds_food_hamburger_advertising_elegant_we_0.jpg",
					subscription: [{ SubscriptionName: "Italianisimo", description: "Tendras una fabulosa comida variada todos los días!, Lunes Pizza, martes Pasta, miercoles fettucinni, jueves, gnocci, variaremos las combinaciones e ingredientes a lo lagro de la semana, asume lo delicioso y asegura tus sorpresas!", price: "20000" }]
				},
				{
					name: "Pollo a la leña",
					plates: [{ plateName: "Pollo asado", price: "15000", price: "5000", description: "x", image: "" }, { plateName: "Medio pollo asado", price: "8000", price: "5000", description: "x", image: "" }, { plateName: "Cuarto de pollo asado", price: "6000", price: "5000", description: "x", image: "" }, { plateName: "Tortillas", price: "4000", price: "5000", description: "x", image: "" }],
					locations: ["Colombia", "Costa"],
					image: "https://cdn.leonardo.ai/users/25acf724-d0fb-44e7-8da5-a5932af5eac9/generations/ea3c309b-a9b1-4e5a-aac4-35da60887158/DreamShaper_v6_chicken_roaster_smoked_advertising_elegant_webp_0.jpg",
					subscription: [{ SubscriptionName: "Italianisimo", description: "Tendras una fabulosa comida variada todos los días!, Lunes Pizza, martes Pasta, miercoles fettucinni, jueves, gnocci, variaremos las combinaciones e ingredientes a lo lagro de la semana, asume lo delicioso y asegura tus sorpresas!", price: "20000" }]
				},
				{
					name: "La Bella Italia",
					plates: [{ Platename: "Pizza con hongos", price: "5000", description: "x", image: "" }, { plateName: "Pasta bolognesa", price: "14000", price: "5000", description: "x", image: "" }, { plateName: "Fetuccini Alfredo", price: "13000", price: "5000", description: "x", image: "" }, { plateName: "Gnocchi", price: "20000", price: "5000", description: "x", image: "" }],
					locations: ["Colombia", "Costa"],
					image: "https://cdn.leonardo.ai/users/25acf724-d0fb-44e7-8da5-a5932af5eac9/generations/6d29df4b-801b-4bb5-9b3d-32c71d153902/DreamShaper_v6_italian_food_sphaguetti_pizza_lasagna_advertisi_0.jpg",
					subscription: [{ SubscriptionName: "Italianisimo", description: "Tendras una fabulosa comida variada todos los días!, Lunes Pizza, martes Pasta, miercoles fettucinni, jueves, gnocci, variaremos las combinaciones e ingredientes a lo lagro de la semana, asume lo delicioso y asegura tus sorpresas!", price: "20000" }]
				},
				{
					name: "Don Pacino",
					plates: [{ plateName: "Tarta de peces", price: "5000", price: "5000", description: "x", image: "" }, { plateName: "Pasta destazada", price: "14000", price: "5000", description: "x", image: "" }, { plateName: "Puñalini Alfredo", price: "13000", price: "5000", description: "x", image: "" }, { plateName: "Pastel de arandanitos", price: "20000", price: "5000", description: "x", image: "" }],
					locations: ["Colombia", "Costa"],
					image: "https://cdn.leonardo.ai/users/25acf724-d0fb-44e7-8da5-a5932af5eac9/generations/7772b5c6-fc14-4b94-bcdc-8ee42ca9564f/DreamShaper_v6_Mafi_food_advertising_elegant_webpage_blue_gree_1.jpg",
					subscription: [{ SubscriptionName: "Italianisimo", description: "Tendras una fabulosa comida variada todos los días!, Lunes Pizza, martes Pasta, miercoles fettucinni, jueves, gnocci, variaremos las combinaciones e ingredientes a lo lagro de la semana, asume lo delicioso y asegura tus sorpresas!", price: "20000" }]
				}
			],
			user: [
				{
					firstName: "Alejandra",
					secondName: "Martinez",
					birthDay: "12",
					birthMonth: "6",
					birthYear: "2014",
					Gender: "femenino",
					email: "askingalessa@gfake.com",
					phone: "3005562343",

				}
			]
		},
		actions: {
			fetchUserData: async (email) => {
				const baseUrl = `${process.env.BACKEND_URL}/${email}`;

				try {
					let response = await fetch(baseUrl)
					if (!response.ok) return response.status
					setStore(email)
				}
				catch (error) {
					console.error(error)
				}
			},
			user_create: async (user) => {
				try {
					const response = await getActions().apiFetch("register", "POST", user);
					const { code, data } = response;

					if (code === 200 && data) {
						return data;
					} else {
						console.error("Error:", response);
					}
				} catch (error) {
					console.error("Error:", error);
				}
			},

			user_login: async (email, password) => {
				const resp = await getActions().apiFetch("/login", "POST", { email, password })
				if (resp.code >= 400) {
					return resp
				}
				setStore({ accessToken: resp.data.accessToken })
				localStorage.setItem("accessToken", resp.data.accessToken)
				return resp
			},
			user_logout: async () => {
				const resp = await getActions().apiFetchProtected("/logout", "POST")
				if (resp.code >= 400) {
					return resp
				}
				setStore({ accessToken: null })
				localStorage.removeItem("accessToken")
				return resp
			},
			loadToken() {
				let token = localStorage.getItem("accessToken")
				setStore({ accessToken: token })
			},
			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await getActions().apiFetch("/hello")
					setStore({ message: resp.data.message })
					// don't forget to return something, that is how the async resolves
					//return data.message:
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			requestPasswordRecovery: async (email) => {
				const resp = await getActions().apiFetch("/recoverypassword", "POST", { email })
				return resp
			},
			changePasswordRecovery: async (passwordToken, password) => {
				let resp = await fetch(apiUrl + endpoint, method == "GET" ? undefined : {
					method,
					body: JSON.stringify(password),
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${passwordToken}`
					}
				})
				if (!resp.ok) {
					console.error(`${resp.status}: ${resp.statusText}`)
					return { code: resp.status, error: `${resp.status}: ${resp.statusText}` }
				}
				let data = await resp.json()
				return { code: resp.status, data }
			},
			apiFetch: async (endpoint, method = "GET", body = {}) => {
				let resp = await fetch(apiUrl + endpoint, method == "GET" ? undefined : {
					method,
					body: JSON.stringify(body),
					headers: {
						"Content-Type": "application/json"
					}
				})
				if (!resp.ok) {
					console.error(`${resp.status}: ${resp.statusText}`)
					return { code: resp.status, error: `${resp.status}: ${resp.statusText}` }
				}
				let data = await resp.json()
				return { code: resp.status, data }
			},
			apiFetchProtected: async (endpoint, method = "GET", body = {}) => {
				let resp = await fetch(apiUrl + endpoint, method == "GET" ? undefined : {
					method,
					body: JSON.stringify(body),
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer  ${getStore().accessToken}`
					}
				})
				if (!resp.ok) {
					console.error(`${resp.status}: ${resp.statusText}`)
					return { code: resp.status, error: `${resp.status}: ${resp.statusText}` }
				}
				let data = await resp.json()
				return { code: resp.status, data }
			}

		}
	}
};
;

export default getState;

