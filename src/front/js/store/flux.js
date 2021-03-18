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

			info_Cocktail: async idDrink => {
				//It gets base cocktails via filter
				const res = await fetch(`https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=${idDrink}`);
				const cocktail = await res.json();
				setStore({ basecocktail: cocktail.drinks });
			},

			info_rumCocktail: async () => {
				//It gets base cocktails via filter
				const res = await fetch("https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=Rum");
				const cocktail = await res.json();
				setStore({ rum_cocktail: cocktail.drinks });
			},

			info_vodkaCocktail: async () => {
				//It gets base cocktails via filter classification
				const res = await fetch("https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=Vodka");
				const cocktail = await res.json();
				setStore({ vodka_cocktail: cocktail.drinks });
			},

			info_tequilaCocktail: async () => {
				//It gets base cocktails via filter classification
				const res = await fetch("https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=Tequila");
				const cocktail = await res.json();
				setStore({ tequila_cocktail: cocktail.drinks });
			},
			info_whiskyCocktail: async () => {
				//It gets base cocktails via filter classification
				const res = await fetch("https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=Whisky");
				const cocktail = await res.json();
				setStore({ whisky_cocktail: cocktail.drinks });
			},
			info_ginCocktail: async () => {
				//It gets base cocktails via filter classification
				const res = await fetch("https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=Gin");
				const cocktail = await res.json();
				setStore({ gin_cocktail: cocktail.drinks });
			},
			info_non_alcoholicCocktail: async () => {
				//It gets base cocktails via filter classification
				const res = await fetch("https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?a=Non_Alcoholic");
				const cocktail = await res.json();
				setStore({ non_alcoholic: cocktail.drinks });
			},

			//Building Favorites f(x)s
			addFavorites: async (cocktail_id, cocktail_name, cocktail_img) => {
				const store = getStore();
			}
			/////////////////////END TESTING PURPOSES @JVM && @ANMORA///////////////////////
			// Use getActions to call a function within a fuction
		}
	};
};

export default getState;
