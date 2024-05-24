const getState = ({ getStore, getActions, setStore }) => {
  const localStorageOrder = JSON.parse(localStorage.getItem('order')) || {
    total: 0,
    items: []
  };

  const localStorageUser = JSON.parse(localStorage.getItem('user')) || {
    isSignedIn: false,
    username: "",
    user_id: null,
    token: null
  };

  return {
    store: {
      transactions: [],
      order: localStorageOrder,
      user: localStorageUser
    },
    actions: {
      fetchCoffee: async () => {
        try {
          const response = await fetch('https://fake-coffee-api.vercel.app/api');
          if (!response.ok) {
            throw new Error("Network response was not okay");
          }
          const data = await response.json();
          const coffeePerCategory = data.reduce((acc, curr) => {
            if (!acc[curr.region]) {
              acc[curr.region] = [];
            }
            acc[curr.region].push(curr);
            return acc;
          }, {});
          setStore(coffeePerCategory);
        } catch (error) {
          console.error(error);
        }
      },
      addCoffeeToOrder: ({ name, price }) => {
        const store = getStore();
        const updatedOrder = {
          ...store.order,
          total: store.order.total + price,
          items: [...store.order.items, { name, price }]
        };
        setStore({ order: updatedOrder });
        localStorage.setItem('order', JSON.stringify(updatedOrder));
      },
      removeCoffeeFromOrder: ({ name, price }) => {
        const store = getStore();
        const index = store.order.items.findIndex(item => item.name === name && item.price === price);
        if (index !== -1) {
          const updatedItems = store.order.items.filter((_, i) => i !== index);
          const updatedOrder = {
            ...store.order,
            total: store.order.total - price,
            items: updatedItems
          };
          setStore({ order: updatedOrder });
          localStorage.setItem('order', JSON.stringify(updatedOrder));
        }
      },
      clearOrder: () => {
        const defaultOrder = {
          total: 0,
          items: []
        };
        setStore({ order: defaultOrder });
        localStorage.setItem('order', JSON.stringify(defaultOrder));
      },
      login: async (username, password) => {
        try {
          const response = await fetch(`${process.env.BACKEND_URL}api/token`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
          });
          if (!response.ok) {
            if (response.status === 401) {
              throw new Error("Invalid credentials");
            } else if (response.status === 400) {
              throw new Error("Invalid email or password format");
            }
            throw new Error("There was a problem in the login request");
          }
          const data = await response.json();
          localStorage.setItem("jwt-token", data.token);
          const updatedUser = {
            isSignedIn: true,
            username: data.username,
            user_id: data.user_id,
            token: data.token
          };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          setStore({ user: updatedUser });
          return data;
        } catch (error) {
          console.error(error);
        }
      },
      signOut: () => {
        const defaultUser = {
          isSignedIn: false,
          username: "",
          user_id: null
        };
        setStore({ user: defaultUser });
        localStorage.setItem('user', JSON.stringify(defaultUser));
        localStorage.removeItem('jwt-token');
      },
      signUp: async (username, firstName, lastName, password) => {
        try {
          const response = await fetch(`${process.env.BACKEND_URL}api/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, first_name: firstName, last_name: lastName, password })
          });
          if (!response.ok) {
            throw new Error("There was a problem in the signup request");
          }
          const data = await response.json();
          const loginResp = await getActions().login(username, password);
          return loginResp;
        } catch (error) {
          console.error(error);
        }
      },
      createTransaction: async (total_price, products, is_cash) => {
        const store = getStore();
        const { user } = store;
        if (!user || !user.token) {
          throw new Error("User is not authenticated");
        }
        const created = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
        try {
          const response = await fetch(`${process.env.BACKEND_URL}api/transactions`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify({
              user_id: user.user_id,
              total_price: total_price,
              products: JSON.stringify(products),
              is_cash: is_cash,
              created: created
            })
          });
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.msg || "Error creating transaction");
          }
          const data = await response.json();
          return data;
        } catch (error) {
          console.error(error);
        }
      },
      fetchUserTransactions: async () => {
        const store = getStore();
        const { user } = store;
        if (!user || !user.token) {
          throw new Error("User is not authenticated");
        }
        try {
          const response = await fetch(`${process.env.BACKEND_URL}api/transactions`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${user.token}`
            }
          });
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.msg || "Error fetching transactions");
          }
          const data = await response.json();
          console.log("Fetched transactions:", data);
          setStore({ transactions: data });
          return data;
        } catch (error) {
          console.error(error);
        }
      },
      refundTransaction: async (transactionId) => {
        const store = getStore();
        const { user } = store;
        if (!user || !user.token) {
          throw new Error("User is not authenticated");
        }
        try {
          const response = await fetch(`${process.env.BACKEND_URL}api/transactions/${transactionId}/refund`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${user.token}`
            }
          });
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.msg || "Error refunding transaction");
          }
          const data = await response.json();
          // Optionally, update the local store with the refunded transaction
          const updatedTransactions = store.transactions.map(transaction =>
            transaction.id === transactionId ? { ...transaction, is_refunded: true } : transaction
          );
          setStore({ transactions: updatedTransactions });
          return data;
        } catch (error) {
          console.error(error);
        }
      }
    }
  };
};

export default getState;
