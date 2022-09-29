import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { CurrrencyConverter } from "./CurrencyConverter";
import "../../styles/home.css";
import { ExchangeRate } from "./ExchangeRate";
import Grafico from "./Grafico.jsx";
import ImageSlider from "./ImageSlider";
import { Text } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Perfil } from "./perfil";

export const Conversor = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="conversor">
        <Box>
            
        </Box>
      <Perfil />
      <CurrrencyConverter />
      <br />
      <br />
      <br />
      <br />
      <ImageSlider />
    </div>
  );
};
