import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import TableCoins from "../component/tableCoin.jsx";
import {
  Box,
  Input,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
} from "@chakra-ui/react";
import SidebarWithHeader from "../component/sideBar.jsx";

export default function WhatIf() {
  const [coins, setCoins] = useState([]);
  const [fecha, setFecha] = useState("");
  const [dolarActual, setDolarActual] = useState("");
  const [search, setSearch] = useState("");

  const getData = async () => {
    const res = await axios.get(
      "https://api.coingecko.com/api/v3/coins/bitcoin/history?date=30-12-2018"
    );
    // console.log(res.data);
    setCoins(res.data);
  };
  useEffect(() => {
    getData();
  }, [search]);

  

  return (
    <Box display="flex">
      <SidebarWithHeader />
      <Box>
        <FormControl>
          <FormLabel>Elige la cripto que quieras simular </FormLabel>
          <Select placeholder="Elige una cripto">
            <option>bitcoin</option>
            <option>ethereum</option>
            <option>solana</option>
            <option>bnb</option>
            <option>cardano</option>
            <option>polygon</option>
            <option>polkadot</option>
            <option>avalanche</option>
            <option>dogecoin</option>
            <option>uniswap</option>
          </Select>
          <FormLabel>Elige cuanto dinero te hubiera gustado invertir</FormLabel>
          <NumberInput min={100} max={1000000}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormLabel>Elige la fecha en este formato dia-mes-año</FormLabel>
          <Input placeholder="22-07-2016" />
          <Button mt={4} colorScheme="teal" type="submit">
            Submit
          </Button>
        </FormControl>
      </Box>
    </Box>
  );
}
