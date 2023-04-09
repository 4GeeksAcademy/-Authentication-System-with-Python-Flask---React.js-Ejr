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
          rule: "A play of paper will win against who a play of rock but scissors cuts paper)",
        },
        {
          name: "Scissors",
          rule: "Play of scissors (scissors cuts paper), but are destroy by rock.",
        },
      ],
      playerValues: [],
    },
    actions: {
      // Use getActions to call a function within a fuction

      storePlayerValue: (playerElection) => {
        const store = getStore();
        var playerElect = store.playerValues;

        if (playerElect.length === 0) {
          playerElect[0] = playerElection;
          setStore({ playerValues: playerElect });
          return console.log(
            "tiene de largo " +
              playerElect.length +
              " y el valor es " +
              playerElect[0]
          );
        }
        if (playerElect.length === 1) {
          playerElect[1] = playerElection;
          let playersArray = playerElect;
          playerElect = [];
          setStore({ playerValues: [] });
          return console.log(
            "tiene de largo " +
              playersArray.length +
              " y el valor es " +
              playersArray[1]
          );
        }
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
