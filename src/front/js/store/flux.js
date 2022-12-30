
const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,

      gameRules: [
        {
          id: 1,
          name: "Rock",
          rule: "A player who decides to play rock will beat another player who has chosen scissors ( rock crushes scissors or breaks scissors or sometimes blunts scissors), but will lose to one who has played paper (paper covers rock)",
        },
        {
          name: "Paper",
          rule: "A play of paper will lose to a play of scissors (scissors cuts paper)",
        },
        {
          name: "Scissors",
          rule: "Play of scissors (scissors cuts paper)",
        },
      ],
    },
    actions: {
      // Use getActions to call a function within a fuction

      storePlayerValue: () => {
        const hand = document.getElementById("hand");
        let cont = 0;
        hand.onclick = function () {
          suma();
          jugadores();
        };
        function suma(cont) {
          cont++;
          return cont;
        };
        let sumaContador = suma();
        function jugadores(sumaContador) {
          if (sumaContador === 1) {
            return console.log("jugador1");
          }
          if (sumaContador === 2) {
            return console.log("jugador2");
          }
        };
        return jugadores();
      },

      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
