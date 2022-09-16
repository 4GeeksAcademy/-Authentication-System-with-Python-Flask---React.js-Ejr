import { Box, Stack, Text, Image } from "@chakra-ui/react";
import SidebarWithHeader from "../component/sideBar.jsx";
import React from "react";
import { useEffect, useState } from "react";
import TarjetaNoticia from "../component/tarjetaNoticias.jsx";
const axios = require("axios");

export default function Educacion() {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    const getNews = async () => {
      const res = await axios.get(
        "https://last-crypto-news.p.rapidapi.com/cryptonews",
        {
          headers: {
            "X-RapidAPI-Key":
              "f3731778d7msh52ea94902079bdap1af748jsn3e8c8c0373e5",
            "X-RapidAPI-Host": "last-crypto-news.p.rapidapi.com",
          },
        }
      );
      setNoticias(res.data);
    };

    getNews();
  }, []);

  return (
    <Box display="flex">
      <SidebarWithHeader />
      <Box display="grid" pl="20" pt="10">
        <Text fontSize="2xl" fontWeight={700}>
          {" "}
          Lee las principales noticias del mundo cripto
        </Text>
        <Stack>
          <TarjetaNoticia
            image={noticias}
            sourcenews={noticias}
            title={noticias}
            linknews={noticias}
          />
        </Stack>
      </Box>
    </Box>
  );
}
