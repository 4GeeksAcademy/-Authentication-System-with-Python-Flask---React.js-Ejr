
function GameData() {
  let axios = require("axios");
  let data = "fields name;";

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://cors-anywhere.herokuapp.com/api.igdb.com/v4/games/",
    headers: {
      "Client-ID": "l9z8jtrdbnyiypji85ggptiealo4em",
      Authorization: "Bearer mthsa9u1qlrkjttq11x08x7usxps6y",
      "Content-Type": "application/json",
    },
    data: {
      data,
    },
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}
export default GameData;

