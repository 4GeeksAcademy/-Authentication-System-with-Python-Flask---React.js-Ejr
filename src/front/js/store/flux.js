const apiUrl = process.env.BACKEND_URL;
const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      token: null,
      user: null,
      favorites: [],
    },
    actions: {
      addFavorites: async (fav) => {
        let response = await fetch(process.env.BACKEND_URL + "/favorites", {
          method: "Post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            recipe_name: fav,
          }),
        });
        let data = response.json();
        console.log(data);
        setStore({ favorites: [...getStore().favorites, fav] });
      },
      removeFavorites: async (fav) => {
        let response = await fetch(process.env.BACKEND_URL + "/favorites", {
          method: "DELTE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            recipe_name: fav,
          }),
        });
        let data = response.json();
        console.log(data);
        setStore({
          favorites: [...getStore().favorites.filter((item) => item !== fav)],
        });
      },
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },
      signUp: async (form, navigate) => {
        const url = apiUrl + "/api/signup";
        await fetch(url, {
          method: "Post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
          }),
        })
          .then(async (resp) => {
            console.log(resp.ok); // will be true if the response is successfull
            console.log(resp.status); // the status code = 200 or code = 400 etc.
            if (!resp.ok) {
              alert("user already exists");
              return false;
            }
            await resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
            navigate("/login");
          })
          .catch((error) => {
            //error handling
            console.log(error);
          });
      },

      login: (form, navigate) => {
        const store = getStore();
        const url = apiUrl + "/api/token";
        fetch(url, {
          method: "Post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
          }),
        })
          .then(async (resp) => {
            console.log(resp.ok); // will be true if the response is successfull
            console.log(resp.status); // the status code = 200 or code = 400 etc.
            if (!resp.ok) {
              alert("Wrong email or password");
              return false;
            }
            //console.log(resp.text()); // will try return the exact result as string
            const data = await resp.json();
            sessionStorage.setItem("token", data.token);
            setStore({ token: data.token });

            console.log(store.token);
            navigate("/profile");
          })
          .catch((error) => {
            //error handling
            console.log(error);
          });
      },

      logout: (navigate) => {
        setStore({ user: null });
        sessionStorage.removeItem("token");
        setStore({ token: null });
        navigate("/");
      },

      authenticateUser: (navigate) => {
        const store = getStore();
        console.log(store.token);
        const url = apiUrl + "/api/private";
        fetch(url, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + store.token,
          },
        })
          .then((resp) => {
            console.log(resp.ok); // will be true if the response is successfull
            console.log(resp.status); // the status code = 200 or code = 400 etc.
            if (!resp.ok) {
              navigate("/login");
              alert("Please login to continue");
            }

            //console.log(resp.text()); // will try return the exact result as string
            return resp.json();
          })
          .then((data) => {
            setStore({ user: data });
            console.log(data);
          })
          .catch((error) => {
            //error handling
            console.log(error);
          });
      },

      tokenFromStore: () => {
        let store = getStore();
        const token = sessionStorage.getItem("token");
        if (token && token != null && token != undefined)
          setStore({ token: token });
      },
    },
  };
};

export default getState;
