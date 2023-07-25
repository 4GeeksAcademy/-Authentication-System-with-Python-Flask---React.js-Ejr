const getState = ({ getStore, getActions, setStore }) => {


  const API_URL =
    "https://valentinfrar-super-pancake-66g4w999v69frgjq-3001.preview.app.github.dev";
  return {
    store: {
      user: [],
      business_user: [],
      trip: [],
      post: [],
      offers: [],
    },
    actions: {
      // Use getActions to call a function within a function
      signup: async (userEmail, userPassword) => {
        try {
          // Utiliser la clé "myToken" au lieu de "token"
          const response = await fetch(API_URL + "/api/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Utiliser le préfixe "Bearer" pour l'autorisation
            },
            body: JSON.stringify({
              email: userEmail,
              password: userPassword,
            }),
          });


          if (response.ok) {
            console.log(response);
            console.log("Todo perfecto");
            return response;
          } else if (response.status === 401) {
            // Gérer l'erreur de connexion non autorisée
            return false;
          }
        } catch (err) {
          console.log(err);
          return false; // Gérer les autres erreurs, renvoyer false par défaut
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
          } else if (response.status === 401) {
            // Gérer l'erreur de connexion non autorisée
            return false;
          }
        } catch (err) {
          console.log(err);
          return false; // Gérer les autres erreurs, renvoyer false par défaut
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
    },
  };
};

export default getState;
