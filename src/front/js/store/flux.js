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
			rum_cocktail: []
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
				//It fetchs cocktails via random
				const res = await fetch("https://www.thecocktaildb.com/api/json/v2/9973533/randomselection.php");
				cocktail = await res.json();
				setStore({ randomcocktail: cocktail.drinks });
			},

			info_baseCocktail: async idDrink => {
				//It gets base cocktails via filter
				const res = await fetch(`https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=${idDrink}`);
				const cocktail = await res.json();
				setStore({ basecocktail: cocktail.drinks });
			},

			info_rumCocktail: async () => {
				//It gets base cocktails via filter
				const res = await fetch("https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=rum");
				const cocktail = await res.json();
				setStore({ rum_cocktail: cocktail.drinks });
			},

			//Building Favorites f(x)s
			addFavorites: async (drink_name, drink_img) => {
				const store = getStore();
			}
			/////////////////////END TESTING PURPOSES @JVM && @ANMORA///////////////////////
			// Use getActions to call a function within a fuction
		}
	};
};

export default getState;
