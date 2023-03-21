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

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
}
export default GameData;
