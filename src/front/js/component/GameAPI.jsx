function GameData() {
  const axios = require("axios");

  const options = {
    method: "GET",
    url: "https://steam-store-data.p.rapidapi.com/api/featured/",
    headers: {
      "X-RapidAPI-Key": "43a16cc10emsh7ff0e79b253cf89p197848jsnd06fbc992b41",
      "X-RapidAPI-Host": "steam-store-data.p.rapidapi.com",
    },
  };

  return new Promise((resolve, reject) => {
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        const games = new Map();
        response.data.featured_win.forEach((game) =>
          games.set(game.id, {
            id: game.id,
            title: game.name,
            imageUrl: game.header_image,
          })
        );
        response.data.featured_linux.forEach((game) => {
          if (!games.has(game.id)) {
            games.set(game.id, {
              id: game.id,
              title: game.name,
              imageUrl: game.header_image,
            });
          }
        });
        response.data.featured_mac.forEach((game) => {
          if (!games.has(game.id)) {
            games.set(game.id, {
              id: game.id,
              title: game.name,
              imageUrl: game.header_image,
            });
          }
        });
        resolve(Array.from(games.values()));
      })
      .catch(function (error) {
        reject(error);
      });
  });
}

export default GameData;
