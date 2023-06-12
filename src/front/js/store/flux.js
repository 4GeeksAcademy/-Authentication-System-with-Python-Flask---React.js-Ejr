const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: ["Parece que funciona...  (?) valor anterior era null y no referenciaba al backend"],
			restaurantes: [
				{
					name: "Wok",
					plates: [
						{
							plateName: "Ramen",
							price: "40000",
							description: "¡Descubre el sabor auténtico del Oriente en cada sorbo! Nuestro exquisito plato de ramen te transportará a las calles bulliciosas de Japón con su caldo rico y reconfortante. Sus fideos al dente se entrelazan con delicadeza en un mar de sabores, acompañados de trozos tiernos de cerdo desmenuzado, verduras frescas y un huevo suave y seductor.",
							image: "https://cdn.leonardo.ai/users/25acf724-d0fb-44e7-8da5-a5932af5eac9/generations/2e56975e-3d9a-4cd7-ba95-362ae2e81927/DreamShaper_v6_ramen_black_table_elegant_delicious_steam_chops_0.jpg",
							restaurantName: "Wok"
						},
						{
							plateName: "Onigiri",
							price: "20000",
							description: "¡Descubre el bocado perfecto de Japón en un solo bocado! Nuestros exquisitos Onigiri son pequeñas obras maestras de arroz rellenas de sabores irresistibles. Con una textura suave y pegajosa, cada onigiri es cuidadosamente moldeado a mano para garantizar una presentación impecable. ",
							image: "https://cdn.leonardo.ai/users/25acf724-d0fb-44e7-8da5-a5932af5eac9/generations/5935ad7f-cc73-44bd-9b0b-0d5f96d38395/DreamShaper_v6_onigiri_black_table_elegant_delicious_steam_cho_1.jpg",
							restaurantName: "Wok"
						},
						{
							plateName: "Arroz",
							price: "4000",
							description: "Nuestro arroz japonés es preparado con maestría por nuestros chefs expertos, quienes seleccionan cuidadosamente los ingredientes más frescos y auténticos para ofrecerte una experiencia culinaria única. Cada grano de arroz, perfectamente cocido y sazonado con una combinación de especias tradicionales, se transforma en una explosión de sabor en tu paladar.",
							image: "https://cdn.leonardo.ai/users/25acf724-d0fb-44e7-8da5-a5932af5eac9/generations/2d4d91ae-f36a-451a-9e9a-16f3fd7e95ae/DreamShaper_v6_japanese_rice_in_a_black_bowl_black_table_elega_0.jpg",
							restaurantName: "Wok"
						},
						{
							plateName: "Sushi",
							price: "20000",
							description: "¡Descubre nuestro exquisito plato de sushi, una explosión de sabores en cada bocado! Nuestro sushi fresco y artísticamente presentado combina la suavidad del arroz con la frescura del pescado crudo y una cuidadosa selección de ingredientes. Cada pieza es una obra maestra culinaria, elaborada con maestría por nuestros expertos sushi chefs. ",
							image: "https://cdn.leonardo.ai/users/25acf724-d0fb-44e7-8da5-a5932af5eac9/generations/366b9e90-63c9-429d-a771-e81025c2bce0/DreamShaper_v6_japanese_rice_with_sushi_black_table_elegant_de_0.jpg",
							restaurantName: "Wok"
						}
					],
					locations: [
						"Colombia",
						"Costa"
					],
					image: "https://cdn.leonardo.ai/users/25acf724-d0fb-44e7-8da5-a5932af5eac9/generations/65d1d1eb-9819-4610-9871-6d8e0ff7a206/DreamShaper_v6_wok_ramen_logo_on_top_right_elegant_marketing_0.jpg",
					subscription: [
						{
							SubscriptionName: "Italianisimo",
							description: "Tendras una fabulosa comida variada todos los días!, Lunes Pizza, martes Pasta, miercoles fettucinni, jueves, gnocci, variaremos las combinaciones e ingredientes a lo lagro de la semana, asume lo delicioso y asegura tus sorpresas!",
							price: "20000"
						}
					]
				},
				{
					name: "McDonalds",
					plates: [
						{
							plateName: "Hamburguesa",
							price: "15000",
							description: "x",
							image: "",
							restaurantName: "McDonalds"
						},
						{
							plateName: "Hamburguesa con queso",
							price: "19000",
							description: "x",
							image: "",
							restaurantName: "McDonalds"
						},
						{
							plateName: "Doble libra",
							price: "20000",
							description: "x",
							image: "",
							restaurantName: "McDonalds"
						},
						{
							plateName: "Big Mac",
							price: "25000",
							description: "x",
							image: "",
							restaurantName: "McDonalds"
						}
					],
					locations: ["Colombia", "Costa"],
					image: "https://cdn.leonardo.ai/users/25acf724-d0fb-44e7-8da5-a5932af5eac9/generations/f58af186-c80a-417f-af68-a5680f639561/DreamShaper_v6_McDonalds_food_hamburger_advertising_elegant_we_0.jpg",
					subscription: [
						{
							SubscriptionName: "Italianisimo",
							description: "Tendras una fabulosa comida variada todos los días!, Lunes Pizza, martes Pasta, miercoles fettucinni, jueves, gnocci, variaremos las combinaciones e ingredientes a lo lagro de la semana, asume lo delicioso y asegura tus sorpresas!",
							price: "20000"
						}
					]
				},
				{
					name: "Kukulkan",
					plates: [
						{
							plateName: "Pollo asado",
							price: "15000",
							description: "x",
							image: "",
							restaurantName: "Kukulkan"
						},
						{
							plateName: "Medio pollo asado",
							price: "8000",
							description: "x",
							image: "",
							restaurantName: "Kukulkan"
						},
						{
							plateName: "Cuarto de pollo asado",
							price: "6000",
							description: "x",
							image: "",
							restaurantName: "Kukulkan"
						},
						{
							plateName: "Tortillas",
							price: "4000",
							description: "x",
							image: "",
							restaurantName: "Kukulkan"
						}
					],
					locations: [
						"Colombia",
						"Costa"
					],
					image: "https://cdn.leonardo.ai/users/25acf724-d0fb-44e7-8da5-a5932af5eac9/generations/ea3c309b-a9b1-4e5a-aac4-35da60887158/DreamShaper_v6_chicken_roaster_smoked_advertising_elegant_webp_0.jpg",
					subscription: [
						{
							SubscriptionName: "Italianisimo",
							description: "Tendras una fabulosa comida variada todos los días!, Lunes Pizza, martes Pasta, miercoles fettucinni, jueves, gnocci, variaremos las combinaciones e ingredientes a lo lagro de la semana, asume lo delicioso y asegura tus sorpresas!",
							price: "20000"
						}
					]
				},
				{
					name: "La Bella Italia",
					plates: [{ plateName: "Pizza con hongos", price: "5000", description: "x", image: "", restaurantName: "La Bella Italia" }, { plateName: "Pasta bolognesa", price: "14000", description: "x", image: "", restaurantName: "La Bella Italia" }, { plateName: "Fetuccini Alfredo", price: "13000", description: "x", image: "", restaurantName: "La Bella Italia" }, { plateName: "Gnocchi", price: "20000", description: "x", image: "", restaurantName: "La Bella Italia" }],
					locations: ["Colombia", "Costa"],
					image: "https://cdn.leonardo.ai/users/25acf724-d0fb-44e7-8da5-a5932af5eac9/generations/6d29df4b-801b-4bb5-9b3d-32c71d153902/DreamShaper_v6_italian_food_sphaguetti_pizza_lasagna_advertisi_0.jpg",
					subscription: [{ SubscriptionName: "Italianisimo", description: "Tendras una fabulosa comida variada todos los días!, Lunes Pizza, martes Pasta, miercoles fettucinni, jueves, gnocci, variaremos las combinaciones e ingredientes a lo lagro de la semana, asume lo delicioso y asegura tus sorpresas!", price: "20000" }]
				},
				{
					name: "Don Pacino",
					plates: [
						{
							plateName: "Tarta de peces",
							price: "5000",
							description: "x",
							image: "",
							restaurantName: "Don Pacino"
						},
						{
							plateName: "Pasta destazada",
							price: "14000",
							description: "x",
							image: "",
							restaurantName: "Don Pacino"
						},
						{
							plateName: "Puñalini Alfredo",
							price: "13000",
							description: "x",
							image: "",
							restaurantName: "Don Pacino"
						},
						{
							plateName: "Pastel de arandanitos",
							price: "20000",
							description: "x",
							image: "",
							restaurantName: "Don Pacino"
						}
					],
					locations: [
						"Colombia",
						"Costa"
					],
					image: "https://cdn.leonardo.ai/users/25acf724-d0fb-44e7-8da5-a5932af5eac9/generations/7772b5c6-fc14-4b94-bcdc-8ee42ca9564f/DreamShaper_v6_Mafi_food_advertising_elegant_webpage_blue_gree_1.jpg",
					subscription: [
						{
							SubscriptionName: "Italianisimo",
							description: "Tendras una fabulosa comida variada todos los días!, Lunes Pizza, martes Pasta, miercoles fettucinni, jueves, gnocci, variaremos las combinaciones e ingredientes a lo lagro de la semana, asume lo delicioso y asegura tus sorpresas!",
							price: "20000"
						}
					]
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

