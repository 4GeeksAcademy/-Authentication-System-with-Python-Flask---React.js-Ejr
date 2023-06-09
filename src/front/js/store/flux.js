const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: ["Parece que funciona...  (?) valor anterior era null y no referenciaba al backend"],
			restaurantes: [
				{
					name: "wok",
					platos: [{name: "Ramen", precio: "40000"}, {name: "Onigiri", precio: "20000"}, {name: "Arroz", precio: "4000"}, {name: "Sushi", precio: "20000"}],
					ubicaciones: "white",
					url: "https://cdn.leonardo.ai/users/25acf724-d0fb-44e7-8da5-a5932af5eac9/generations/65d1d1eb-9819-4610-9871-6d8e0ff7a206/DreamShaper_v6_wok_ramen_logo_on_top_right_elegant_marketing_0.jpg",
					id: "0"
				},
				{
					name: "McDonalds",
					platos: [{name: "Hamburguesa", precio: "15000"}, {name: "Hamburguesa con queso", precio: "19000"}, {name: "Doble libra", precio: "20000"}, {name: "Big Mac", precio: "25000"}],
					ubicaciones: "white",
					url: "https://cdn.leonardo.ai/users/25acf724-d0fb-44e7-8da5-a5932af5eac9/generations/f58af186-c80a-417f-af68-a5680f639561/DreamShaper_v6_McDonalds_food_hamburger_advertising_elegant_we_0.jpg",
					id: "0"
				},
				{
					name: "Pollo a la leña",
					platos: [{name: "Pollo asado", precio: "15000"}, {name: "Medio pollo asado", precio: "8000"}, {name: "Cuarto de pollo asado", precio: "6000"}, {name: "Tortillas", precio: "4000"}],
					ubicaciones: "white",
					url: "https://cdn.leonardo.ai/users/25acf724-d0fb-44e7-8da5-a5932af5eac9/generations/ea3c309b-a9b1-4e5a-aac4-35da60887158/DreamShaper_v6_chicken_roaster_smoked_advertising_elegant_webp_0.jpg",
					id: "0"
				},
				{
					name: "La Bella Italia",
					platos: [{name: "Pizza con hongos", precio: "5000"}, {name: "Pasta bolognesa", precio: "14000"}, {name: "Fetuccini Alfredo", precio: "13000"}, {name: "Gnocchi", precio: "20000"}],
					ubicaciones: "white",
					url: "https://cdn.leonardo.ai/users/25acf724-d0fb-44e7-8da5-a5932af5eac9/generations/6d29df4b-801b-4bb5-9b3d-32c71d153902/DreamShaper_v6_italian_food_sphaguetti_pizza_lasagna_advertisi_0.jpg",
					id: "0"
				},
				{
					name: "Don Pacino",
					platos: [{name: "Tarta de peces", precio: "5000"}, {name: "Pasta destazada", precio: "14000"}, {name: "puñalini Alfredo", precio: "13000"}, {name: "Pastel de arandanitos", precio: "20000"}],
					ubicaciones: "white",
					url: "https://cdn.leonardo.ai/users/25acf724-d0fb-44e7-8da5-a5932af5eac9/generations/7772b5c6-fc14-4b94-bcdc-8ee42ca9564f/DreamShaper_v6_Mafi_food_advertising_elegant_webpage_blue_gree_1.jpg",
					id: "0"
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
			fetchUserData: async(email) =>{
				const baseUrl = `${process.env.BACKEND_URL}/${email}`;

				try{
					let response = await fetch(baseUrl)
					if(!response.ok) return response.status
					setStore(email)
				}
				catch (error){
					console.error(error)
				}
			}
			}
		}
	};
;

export default getState;

