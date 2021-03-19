const be_url = "https://3001-apricot-tahr-nih1bqo0.ws-us03.gitpod.io/";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			favorites: [],
			basecocktail: [],
			jwtoken: null,
			sessionUID: null,
			sessionUser: null,
			randomcocktail: [],
			ingredient: [],
			modifier: [],
			rum_cocktail: [],
			gin_cocktail: [],
			vodka_cocktail: [],
			tequila_cocktail: [],
			whisky_cocktail: [],
			non_alcoholic: []
		},
		actions: {
			////////////////////BEGIN TESTING PURPOSES @JVM && @ANMORA//////////////////////
			//f(x) built for testing reg form(experimental by now)
			signup: async (first_name, last_name, email, password, birthday) => {
				const res = await fetch("https://3001-apricot-tahr-nih1bqo0.ws-us03.gitpod.io/user", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						first_name: first_name,
						last_name: last_name,
						email: email,
						password: password,
						birthday: birthday
					})
				});
				if (res.ok) {
					return true;
				} else {
					return false;
				}
			},

			login: async (email, password) => {
				await fetch("https://3001-apricot-tahr-nih1bqo0.ws-us03.gitpod.io/login", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email: email, password: password })
				})
					.then(response => response.json())
					.then(jwtoken => {
						if (typeof jwtoken.msg != "undefined") {
							Notify.error(jtwtoken.msg);
						} else {
							console.log(jwtoken);

							setStore({
								jwtoken: jwtoken.jwt,
								sessionUID: jwtoken.id,
								favorites: jwtoken.user.favorites
							}); //syntax {store:jwtoken.attr}
							console.log(getStore());
						}
					});
			},

			signout: () => {
				setStore({ jwtoken: null, sessionUID: null, sessionUser: null });
			},

			randCocktail: async () => {
				//It fetchs 10 cocktails via random
				const res = await fetch("https://www.thecocktaildb.com/api/json/v2/9973533/randomselection.php");
				cocktail = await res.json();
				setStore({ randomcocktail: cocktail.drinks });
			},

			info_non_alcoholicCocktail: async () => {
				//It gets base cocktails via filter classification
				const res = await fetch("https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?a=Non_Alcoholic");
				let cocktailList = [];
				const cocktail = await res.json();
				cocktail.drinks.forEach(item => {
					fetch(`https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=${item.idDrink}`)
						.then(res2 => res2.json())
						.then(data => {
							// console.log(data.drinks[0]);
							cocktailList.push(data.drinks[0]);
						});
				});
				setStore({ non_alcoholic: cocktailList });
			},

			info_rumCocktail: async () => {
				//It gets base cocktails via filter classification
				const res = await fetch("https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=Rum");
				let cocktailList = [];
				const cocktail = await res.json();
				cocktail.drinks.forEach(item => {
					fetch(`https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=${item.idDrink}`)
						.then(res2 => res2.json())
						.then(data => {
							// console.log(data.drinks[0]);
							cocktailList.push(data.drinks[0]);
						});
				});
				setStore({ rum_cocktail: cocktailList });
			},

			info_vodkaCocktail: async () => {
				//It gets base cocktails via filter classification
				const res = await fetch("https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=Vodka");
				const cocktail = await res.json();
				let cocktailList = [];
				cocktail.drinks.forEach(item => {
					fetch(`https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=${item.idDrink}`)
						.then(res2 => res2.json())
						.then(data => {
							// console.log(data.drinks[0]);
							cocktailList.push(data.drinks[0]);
						});
				});
				setStore({ vodka_cocktail: cocktailList });
			},

			info_tequilaCocktail: async () => {
				//It gets base cocktails via filter classification
				const res = await fetch("https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=Tequila");
				const cocktail = await res.json();
				let cocktailList = [];
				cocktail.drinks.forEach(item => {
					fetch(`https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=${item.idDrink}`)
						.then(res2 => res2.json())
						.then(data => {
							cocktailList.push(data.drinks[0]);
						});
				});
				setStore({ tequila_cocktail: cocktailList });
			},

			info_whiskyCocktail: async () => {
				//It gets base cocktails via filter classification
				const res = await fetch("https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=Brandy");
				const cocktail = await res.json();
				let cocktailList = [];
				cocktail.drinks.forEach(item => {
					fetch(`https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=${item.idDrink}`)
						.then(res2 => res2.json())
						.then(data => {
							cocktailList.push(data.drinks[0]);
						});
				});
				setStore({ whisky_cocktail: cocktailList });
			},

			info_ginCocktail: async () => {
				//It gets base cocktails via filter classification
				const res = await fetch("https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=Gin");
				const cocktail = await res.json();
				let cocktailList = [];
				cocktail.drinks.forEach(item => {
					fetch(`https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=${item.idDrink}`)
						.then(res2 => res2.json())
						.then(data => {
							cocktailList.push(data.drinks[0]);
						});
				});
				setStore({ gin_cocktail: cocktailList });
			},

			//Building Favorites f(x)s
			//It checks by exiting favs
			faverify: fav => {
				console.table("fav", fav);
				const favStore = getStore();
				let matching = store.favorites.find(f => f.cocktail_name === fav); //if fav has been found
				console.table("Done", matching);
				if (matching != undefined) {
					return true;
				} else {
					return false;
				}
			},
			//It is getting favorites by User ID
			favorite_by_user: async id => {
				const res = await fetch(`https://3001-apricot-tahr-nih1bqo0.ws-us03.gitpod.io/user/${id}`);
				usr_fav = res.json();
				setStore({ favorites: usr_fav.favorites });
			},
			//Function managed to delete favorites by ID
			delFavorite: async id => {
				const favStore = getStore();
				const cocktail_ID = store.favorites(f => f.cocktail_id == id);
				console.table("DELETE:", cocktail_ID);
				const favID = await store.favorites[cocktail_ID].id;
				console.table("ID", favID);
				if (cocktail_ID != -1) {
					fetch(`https://3001-apricot-tahr-nih1bqo0.ws-us03.gitpod.io\favorite\${id}`, {
						method: "DELETE"
					}).then(() => getActions().favorite_by_user(store.sessionUID));
				}
			},
			//Function managed to add favorites to verified user
			addFavorites: async (cocktail_id, cocktail_name, cocktail_img) => {
				const store = getStore();
				const faverify = await getActions.faverify(cocktail_name);
				if (!faverify) {
					await fetch("https://3001-apricot-tahr-nih1bqo0.ws-us03.gitpod.io/favorite", {
						method: "POST",
						headers: { "Content-Type": "application/json", authorization: `Bearer ${store.jwtoken}` },
						body: JSON.stringify({ cocktail_id: drink_id, cocktail_name: cocktail_name, cocktail })
					}).then(() => getActions().favorite_by_user(store.sessionUID));
				} else {
					getActions().delFavorite(cocktail_ID);
				}
			}
			/////////////////////END TESTING PURPOSES @JVM && @ANMORA///////////////////////
			// Use getActions to call a function within a fuction
		}
	};
};

export default getState;
