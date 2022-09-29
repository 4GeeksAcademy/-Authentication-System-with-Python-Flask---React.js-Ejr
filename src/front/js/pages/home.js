import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import TableCoins from "../component/tableCoin.jsx";
import { Box, Input, Text } from "@chakra-ui/react";
import SidebarWithHeader from "../component/sideBar.jsx";

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(async () => {
    const getData = async () => {
      const res = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );
      // console.log(res.data);
      setCoins(res.data);
    };

    await getData();
    console.log(coins);
  }, []);
  return (
    <Box display="flex">
      <SidebarWithHeader />
      <Box display="grid" pl="20" pt="10">
        <Box>
          <Text fontSize="3xl" fontWeight={700}>
            Principales 100 Criptomonedas por capitalización de mercado
          </Text>

          <Text fontSize="md" fontWeight={300}>
            {" "}
            La capitalización del mercado global de criptomonedas es $974.59B,
            un aumento de 2.59% durante el último día.{" "}
          </Text>
        </Box>
        <Box>
          <Box mx={20}>
            <Input
              placeholder="Busca tu criptomoneda favorita"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box>
          <Box maxH="xl" overflowX="scroll" mt={21}>
            <TableCoins coins={coins} search={search} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
