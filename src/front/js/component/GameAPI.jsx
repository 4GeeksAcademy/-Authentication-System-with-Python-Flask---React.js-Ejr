import React, { useEffect, useState } from "react";

/*function API_Call() {
  const URL = `https://api.igdb.com/v4`;
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(URL);
      result.json().then((json) => {
        console.log(json);
      });
    };
    fetchData();
  }, []);
}

export { API_Call as GameAPI };
*/

function GameData() {
  useEffect(() => {
    const gameData = {
      method: "POST",
      ClientID: "l9z8jtrdbnyiypji85ggptiealo4em",
      Authorization: "Bearer wykdqroyqyev7cj3mx7in6zxwkhj4e ",
      Body: "fields name; limit 10",
      Header: "Access-Control-Allow-Origin:*",
    };
    fetch("http://localhost:8080/https://api.igdb.com/v4/games/", gameData)
      .then((response) => response.json())
      .then((data) => setPostId(data.id));
  }, []);
}
export default GameData;


/*{
  "access_token": "50ufriiai9th133z4mjy6uzrfpige2",
  "expires_in": 5071429,
  "token_type": "bearer"
}*/