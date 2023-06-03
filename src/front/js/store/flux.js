const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: ["Parece que funciona...  (?) valor anterior era null y no referenciaba al backend"],
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
			loadRestaurants:() => {
				setStore()[
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
					}]
			}
			}
		}
	};
;

export default getState;
