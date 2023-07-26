const getState = ({ getStore, getActions, setStore }) => {
  const API_URL =
    "https://valentinfrar-potential-engine-v4vqw666vxrfprjp-3001.preview.app.github.dev";
  return {
    store: {
      user: {},
      business_user: [],
      trip: [],
      reviews: [],
      offers: [],
    },
    actions: {
      // Use getActions to call a function within a function
      signupUser: async (data) => {
        try {
          // Utiliser la clé "myToken" au lieu de "token"
          const response = await fetch(API_URL + "/api/signup/user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });

          if (response.ok) {
            console.log(data);
            console.log(response);
            console.log("Todo perfecto");
            return response;
          } else response.status === 401;
          // Gérer l'erreur de connexion non autorisée
          return false;
        } catch (err) {
          console.log(err);
          return false; // Gérer les autres erreurs, renvoyer false par défaut
        }
      },
      signupBusiness: async (businessEmail, businessPassword) => {
        try {
          const response = await fetch(API_URL + "/api/signup/business_user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: businessEmail,
              password: businessPassword,
            }),
          });

          if (response.ok) {
            console.log(response);
            console.log("Todo perfecto");
            return response;
          } else {
            return false;
          }
        } catch (err) {
          console.log(err);
          return false;
        }
      },

      login: async (userEmail, userPassword) => {
        console.log(userEmail, userPassword);
        try {
          // let myToken = localStorage.getItem("myToken");
          const response = await fetch(API_URL + "/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: userEmail,
              password: userPassword,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            localStorage.setItem("myToken", data.access_token);
            setStore({ user: data.user });
            console.log(data);
            return data;
          } else response.status === 401;
          return false;
        } catch (err) {
          console.log(err);
          return false;
        }
      },
      isAuth: async () => {
        try {
          let token = localStorage.getItem("myToken");
          const settings = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer" + token,
            },
          };

          const request = await fetch(API_URL + "/private", settings);
          const json = await request.json();
          const data = json;
          setStore({ user: data.user });
        } catch (error) {
          console.log("No se pudo cargar: ", error);
        }
      },
      logout: () => {
        let token = localStorage.getItem("myToken");
        return token != null ? true : false;
      },
      getReviews: async () => {
        try {
          const response = await fetch(API_URL + "/api/review");
          if (response.ok) {
            const data = await response.json();
            setStore({ reviews: data });
            return true;
          } else {
            return false;
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      },
    },
  };
};

export default getState;
