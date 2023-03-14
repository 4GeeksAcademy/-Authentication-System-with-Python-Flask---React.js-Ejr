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
  var myHeaders = new Headers();
  myHeaders.append("Client-ID", "l9z8jtrdbnyiypji85ggptiealo4em");
  myHeaders.append("Authorization", "Bearer 50ufriiai9th133z4mjy6uzrfpige2");
  myHeaders.append(
    "Access-Control-Allow-Methods",
    "POST, GET, OPTIONS, DELETE"
  );
  myHeaders.append("Access-Control-Allow-Origin", "*");
  myHeaders.append("Access-Control-Max-Age", "86400");
  myHeaders.append(
    "Cookie",

    "__cf_bm=tZluSBYqhOri4tZoOzzsCQ2XhJiNqMBHBaobhq26hjU-1678751433-0-AVSt95uh0jaSKCsFQZunH/yJ+e7kF7Au9GbS/BMsQ8KJ8RpvVnJp59kskqRVNbmgLKS92oMw0n2ZYFDTtz+46zc="


  );

  var requestOptions = {
    method: "POST",
    headers: myHeaders,

    body: raw,


    redirect: "follow",
  };

  fetch("http://localhost:8080/api.igdb.com/v4/games/", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}
export default GameData;

/*{
  "access_token": "50ufriiai9th133z4mjy6uzrfpige2",
  "expires_in": 5071429,
  "token_type": "bearer"
}*/

/* API GatewayDNS : https://7kui6kopu9.execute-api.us-west-2.amazonaws.com/production
API GatewayID: 7kui6kopu9*/
