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
							//console.log(data.drinks[0])
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

			checkFav: favID => {
				console.log("FAV: ", favID);
				const store = getStore();
				let existing = store.favorites.find(i => i.drink_name === item);
				console.log("DONE: ", found);
				if (existing != undefined) {
					return true;
				} else {
					return false;
				}
			},

			addFavorites: async cocktail_name => {
				const store = getStore();
				let checking = await getActions().checkFav(cocktail_name);
				console.log("Checking:", checking);

				setStore({ favorites: [...store.favorites, [myfav]] });
				if (!checking) {
					await fetch("https://3001-apricot-tahr-nih1bqo0.ws-us03.gitpod.io/favorites", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							authorization: `Bearer ${store.jwtoken}`
						},
						body: JSON.stringify({
							drink_name: drink_name
						})
					}).then(() => getActions().getUserFavorites(store.sessionUID));
				} else {
					getActions().deleteFavorite(drink_id);
				}
			},
			getUserFavorites: id => {
				fetch("https://3001-apricot-tahr-nih1bqo0.ws-us03.gitpod.io/user/${id}")
					.then(data => data.json())
					.then(response => {
						setStore({ favorites: response.favorites });
					});
			},
			//alternative Implementation for experimental testing
			counterFavorites: () => {
				const store = getStore();
				const length = store.favorites.length;
				return length;
			},

			deleteFavorite: async id => {
				const store = getStore();
				const drinkIndex = store.favorites.findIndex(i => i.drink_id == id);
				console.log("####$: ", drinkIndex);
				let favID = await store.favorites[drinkIndex].id;
				console.log("ID: ", favId);
				if (drinkIndex != -1) {
					fetch("https://3001-apricot-tahr-nih1bqo0.ws-us03.gitpod.io/favorites/${favID}", {
						method: "DELETE"
					}).then(() => getActions().getUserFavorites(store.sessionUID));
				}
			}
			/////////////////////END TESTING PURPOSES @JVM && @ANMORA///////////////////////
			// Use getActions to call a function within a fuction
		}
	};
};

export default getState;
