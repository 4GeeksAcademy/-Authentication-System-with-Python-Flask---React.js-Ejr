const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: ["Parece que funciona...  (?) valor anterior era null y no referenciaba al backend"],
			restaurantes: [
				{
					name: "wok",
					platos: ["ramen", "onigiri", "arroz", "sushi"],
					ubicaciones: "white"
				},
				{
					name: "McDonalds",
					platos: ["hamburguesa", "hamburguesa con queso", "Doble libra", "Big Mac"],
					ubicaciones: "white"
				},
				{
					name: "Pollo a la leña",
					platos: ["Pollo asado", "Medio pollo asado", "Cuarto de pollo asado", "Tortillas"],
					ubicaciones: "white"
				},
				{
					name: "La Bella Italia",
					platos: ["Pizza con hongos", "Pasta bolognesa", "Fetuccini Alfredo", "Gnocchi"],
					ubicaciones: "white"
				},
				{
					name: "La Bella Italia",
					platos: ["Pizza con hongos", "Pasta bolognesa", "Fetuccini Alfredo", "Gnocchi"],
					ubicaciones: "white"
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
			
			}
		}
	};
;

export default getState;
