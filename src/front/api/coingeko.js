import axios from "axios";

const getValueInThePast = async (token, date) => {
  const res = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${token}/history?date=${date}`
  );
  console.log(res.data);
  //   setCoins(res.data);
  return res.data;
};


export default getValueInThePast;

