const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      users: [],
      user: [],
      followed: [],
      followers: [],
      movies: [],
      movie: [],
      actors: [],
      actor: [],
      reviews: [],
    },

    actions: {
      // User
      getAllUsers: async () => {
        try {
          // Fetch data from the backend to get all users
          const resp = await fetch(process.env.BACKEND_URL + "/users", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const data = await resp.json();

          if (resp.ok) {
            setStore({ users: data.results });
            return true;
          } else {
            throw new Error(data.msg || "Failed to get users");
          }
        } catch (error) {
          console.log("Error getting all users:", error);
          return false;
        }
      },

      getUserById: async (userId) => {
        try {
          // Fetch data from the backend to get a specific user by ID
          const resp = await fetch(
            process.env.BACKEND_URL + `/user/${userId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
            }
          );

          const data = await resp.json();

          if (resp.ok) {
            setStore({ users: [data.results] });
            return true;
          } else {
            throw new Error(data.msg || "Failed to get the user");
          }
        } catch (error) {
          console.log("Error getting a specific user:", error);
          return false;
        }
      },

      signup: async (email, username, name, age, password) => {
        try {
          // Check if age is between 18 and 100
          if (age < 18 || age > 100) {
            throw new Error("Age must be between 18 and 100");
          }

          let datos = {
            email: email,
            username: username,
            name: name,
            age: age,
            password: password,
          };

          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
          });
          const data = await resp.json();
          setStore({ message: data.msg }); // Assuming the server responds with a 'msg' field
          // don't forget to return something, that is how the async resolves
          return true;
        } catch (error) {
          console.log("Error signing up:", error);
          return false;
        }
      },

      login: async (email, password) => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          });
          const data = await resp.json();

          if (!data.token) throw new Error("No token received from server");
          localStorage.setItem("authToken", data.token);
          //store.userLoggedIn(true);

          setStore({ message: data.msg }); // Assuming the server responds with a 'msg' field
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error logging in:", error);
        }
      },

      profile: async (authToken) => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/private", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          });
          const data = await resp.json();

          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error getting into the profile:", error);
        }
      },

      logout: async () => {
        try {
          // Clear the auth token from local storage
          localStorage.removeItem("authToken");

          // Additional cleanup or actions if needed
          // Example: setStore({ userLoggedIn: false });

          return { msg: "Logout successful" };
        } catch (error) {
          console.log("Error logging out:", error);
        }
      },

      setNewPassword: async (password, authToken) => {
        try {
          // Make sure the user is logged in with a valid authToken
          if (!authToken) {
            throw new Error("User not authenticated");
          }

          // Fetch data from the backend to update the password
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/passwordreset",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
              },
              body: JSON.stringify({
                password: password,
              }),
            }
          );

          const data = await resp.json();

          if (resp.ok) {
            setStore({ message: data.message }); // Assuming the server responds with a 'message' field
            return true;
          } else {
            throw new Error(data.error);
          }
        } catch (error) {
          console.log("Error updating password:", error);
          return false;
        }
      },

      updateUser: async (name, username, profilePicture) => {
        try {
          // Fetch the auth token from local storage
          const authToken = localStorage.getItem("authToken");

          if (!authToken) {
            throw new Error("User not authenticated");
          }

          // Fetch data from the backend to update user information
          const resp = await fetch(process.env.BACKEND_URL + "/edituser", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({
              name: name,
              username: username,
              profile_picture: profilePicture,
            }),
          });

          const data = await resp.json();

          if (resp.ok) {
            setStore({ message: data.msg });
            return true;
          } else {
            throw new Error(data.msg);
          }
        } catch (error) {
          console.log("Error updating user:", error);
          return false;
        }
      },

      deleteUser: async (userId) => {
        try {
          // Fetch data from the backend to delete the user
          const resp = await fetch(
            process.env.BACKEND_URL + `/deleteuser/${userId}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const data = await resp.json();

          if (resp.ok) {
            setStore({ message: data.msg });
            return true;
          } else {
            throw new Error(data.msg || data.error);
          }
        } catch (error) {
          console.log("Error deleting user:", error);
          return false;
        }
      },

      // Support
      createIssue: async (issue) => {
        try {
          // Fetch the auth token from local storage
          const authToken = localStorage.getItem("authToken");

          if (!authToken) {
            throw new Error("User not authenticated");
          }

          // Fetch data from the backend to create the issue
          const resp = await fetch(process.env.BACKEND_URL + "/support", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({
              issue: issue,
            }),
          });

          const data = await resp.json();

          if (resp.ok) {
            // Assuming the server responds with a 'msg' field
            setStore({ message: data.msg });
            return true;
          } else {
            throw new Error(data.error);
          }
        } catch (error) {
          console.log("Error creating issue:", error);
          return false;
        }
      },

      deleteIssue: async (email, issue) => {
        try {
          // Fetch the auth token from local storage
          const authToken = localStorage.getItem("authToken");

          if (!authToken) {
            throw new Error("User not authenticated");
          }

          // Fetch data from the backend to delete the issue
          const resp = await fetch(process.env.BACKEND_URL + "/support", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({
              email: email,
              issue: issue,
            }),
          });

          const data = await resp.json();

          if (resp.ok) {
            // Assuming the server responds with a 'msg' field
            setStore({ message: data.msg });
            return true;
          } else {
            throw new Error(data.error);
          }
        } catch (error) {
          console.log("Error deleting issue:", error);
          return false;
        }
      },

      // Follow / Unfollow
      getFollowedList: async () => {
        try {
          // Fetch the auth token from local storage
          const authToken = localStorage.getItem("authToken");

          if (!authToken) {
            throw new Error("User not authenticated");
          }

          // Fetch data from the backend to get the list of followed users
          const resp = await fetch(process.env.BACKEND_URL + "/followed", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          });

          const data = await resp.json();

          if (resp.ok) {
            // Assuming the server responds with a 'results' field containing an array of followed users
            setStore({ followed: data.results });
            return true;
          } else {
            throw new Error(data.msg || "Failed to get the followed users");
          }
        } catch (error) {
          console.log("Error getting followed users:", error);
          return false;
        }
      },

      getFollowersList: async () => {
        try {
          // Fetch the auth token from local storage
          const authToken = localStorage.getItem("authToken");

          if (!authToken) {
            throw new Error("User not authenticated");
          }

          // Fetch data from the backend to get the list of followers
          const resp = await fetch(process.env.BACKEND_URL + "/followers", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          });

          const data = await resp.json();

          if (resp.ok) {
            // Assuming the server responds with a 'results' field containing an array of followers
            setStore({ followers: data.results });
            return true;
          } else {
            throw new Error(data.msg || "Failed to get the followers");
          }
        } catch (error) {
          console.log("Error getting followers:", error);
          return false;
        }
      },

      followUser: async (userId) => {
        try {
          // Fetch the auth token from local storage
          const authToken = localStorage.getItem("authToken");

          if (!authToken) {
            throw new Error("User not authenticated");
          }

          // Fetch data from the backend to follow the user
          const resp = await fetch(
            process.env.BACKEND_URL + `/followuser/${userId}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
              },
            }
          );

          const data = await resp.json();

          if (resp.ok) {
            // Assuming the server responds with a 'msg' field
            setStore({ message: data.msg });
            return true;
          } else {
            throw new Error(data.msg || "Failed to follow the user");
          }
        } catch (error) {
          console.log("Error following user:", error);
          return false;
        }
      },

      unfollowUser: async (userId) => {
        try {
          // Fetch the auth token from local storage
          const authToken = localStorage.getItem("authToken");

          if (!authToken) {
            throw new Error("User not authenticated");
          }

          // Fetch data from the backend to unfollow the user
          const resp = await fetch(
            process.env.BACKEND_URL + `/unfollowuser/${userId}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
              },
            }
          );

          const data = await resp.json();

          if (resp.ok) {
            // Assuming the server responds with a 'msg' field
            setStore({ message: data.msg });
            return true;
          } else {
            throw new Error(data.msg || "Failed to unfollow the user");
          }
        } catch (error) {
          console.log("Error unfollowing user:", error);
          return false;
        }
      },

      // Movies
      getAllMovies: async () => {
        try {
          // Fetch data from the backend to get all movies
          const resp = await fetch(process.env.BACKEND_URL + "/movies", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const data = await resp.json();

          if (resp.ok) {
            // Assuming the server responds with a 'movies' field
            setStore({ movies: data.results });
            return true;
          } else {
            throw new Error(data.error);
          }
        } catch (error) {
          console.log("Error getting all movies:", error);
          return false;
        }
      },

      getMovieById: async (id) => {
        try {
          // Fetch data from the backend, which in turn fetches from the external API
          const resp = await fetch(
            process.env.BACKEND_URL + `/movie/id/${id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const data = await resp.json();

          if (resp.ok) {
            setStore({ movie: [data.result] });
            return true;
          } else {
            throw new Error(data.msg || "Failed to get movie details");
          }
        } catch (error) {
          console.log("Error getting movie details:", error);
          return false;
        }
      },

      getMovieByTitle: async (title) => {
        try {
          // Fetch data from the backend, which in turn fetches from the external API
          const resp = await fetch(
            process.env.BACKEND_URL + `/movie/title/${title}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const data = await resp.json();

          if (resp.ok) {
            setStore({ movie: data.result });
            return true;
          } else {
            throw new Error(data.msg || "Failed to get movie details");
          }
        } catch (error) {
          console.log("Error getting movie details:", error);
          return false;
        }
      },

      getRandomMovie: async () => {
        try {
          // Fetch data from the backend, which in turn fetches from the external API
          const resp = await fetch(process.env.BACKEND_URL + "/randommovie", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const data = await resp.json();

          if (resp.ok) {
            setStore({ movie: data.result });
            return true;
          } else {
            throw new Error(data.msg || "Failed to get random movie");
          }
        } catch (error) {
          console.log("Error getting random movie:", error);
          return false;
        }
      },

      getMovieDetails: async (id) => {
        try {
          // Fetch data from the backend, which in turn fetches from the external API
          const resp = await fetch(
            process.env.BACKEND_URL + `/moviedetails/${id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const data = await resp.json();

          if (resp.ok) {
            setStore({ movie: data.result });
            return true;
          } else {
            throw new Error(data.msg || "Failed to get movie details");
          }
        } catch (error) {
          console.log("Error getting movie details:", error);
          return false;
        }
      },

      // Actors
      getActors: async () => {
        try {
          // Fetch data from the backend, which in turn fetches from the external API
          const resp = await fetch(process.env.BACKEND_URL + "/actors", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const data = await resp.json();

          if (resp.ok) {
            setStore({ actors: data.results });
            return true;
          } else {
            throw new Error(data.msg || "Failed to get popular actors");
          }
        } catch (error) {
          console.log("Error getting popular actors:", error);
          return false;
        }
      },

      getActorByName: async (name) => {
        try {
          // Fetch data from the backend, which in turn fetches from the external API
          const resp = await fetch(
            process.env.BACKEND_URL + `/actors/${name}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const data = await resp.json();

          if (resp.ok) {
            setStore({ actor: [data.result] });
            return true;
          } else {
            throw new Error(data.msg || "Failed to get actor details");
          }
        } catch (error) {
          console.log("Error getting actor details:", error);
          return false;
        }
      },

      getActorById: async (id) => {
        try {
          // Fetch data from the backend, which in turn fetches from the external API
          const resp = await fetch(process.env.BACKEND_URL + `/actors/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const data = await resp.json();

          if (resp.ok) {
            setStore({ actor: [data.result] });
            return true;
          } else {
            throw new Error(data.msg || "Failed to get actor details");
          }
        } catch (error) {
          console.log("Error getting actor details:", error);
          return false;
        }
      },

      getRandomActor: async () => {
        try {
          // Fetch data from the backend, which in turn fetches from the external API
          const resp = await fetch(process.env.BACKEND_URL + "/randomactor", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const data = await resp.json();

          if (resp.ok) {
            setStore({ actor: [data.result] });
            return true;
          } else {
            throw new Error(data.msg || "Failed to get random actor");
          }
        } catch (error) {
          console.log("Error getting random actor:", error);
          return false;
        }
      },
      // Reviews

      // Multi search
    },
  };
};

export default getState;
