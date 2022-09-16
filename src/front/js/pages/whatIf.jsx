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
  Spinner,
  Flex,
} from "@chakra-ui/react";
import SidebarWithHeader from "../component/sideBar.jsx";
import { format } from "util";

export default function WhatIf() {
  const [coins, setCoins] = useState([]);
  const [fecha, setFecha] = useState("");
  const [precioActual, setPrecioActual] = useState(0);
  const [search, setSearch] = useState("");
  const [token, setToken] = useState("");
  const [amount, setAmount] = useState("0");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [precioAntiguo, setPrecioAntiguo] = useState(0);
  const [numeroFinal, setNumeroFinal] = useState(0);

  const getData = async () => {
    const res = await axios.get(
      "https://api.coingecko.com/api/v3/coins/bitcoin/history?date=30-12-2018"
    );
    // console.log(res.data);
    setCoins(res.data);
  };

  const getValueInThePast = async (token, date) => {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${token}/history?date=${date}`
    );
    const current = await res.data.market_data.current_price.usd;
    //   setCoins(res.data);
    setPrecioAntiguo(current);

    return current;
  };

  const getActualValue = async (token) => {
    const now = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${token}`
    );
    const current = await now.data.market_data.current_price.usd;
    setPrecioActual(current);
    return current;
  };

  useEffect(() => {
    getData();
  }, [search]);

  const changeToken = (event) => {
    console.log(event.target.value);

    setToken(event.target.value);
  };
  const handleSubmit = async () => {
    setLoading(true);
    const tokenValue = await getValueInThePast(token, date);
    const tokenValueNow = await getActualValue(token);
    const x = (amount / tokenValue) * tokenValueNow - amount;
    setNumeroFinal(x);

    console.log(x);
    // console.log(tokenValueNow);
    setLoading(false);
    return x;
  };

  const handleChange = (e) => {
    setDate(e.target.value);
  };

  return (
    <Box display="flex">
      <SidebarWithHeader />
      <Flex p={10}>
        <Box p={10}>
          <Text></Text>
          <FormControl>
            <FormLabel>Elige la cripto que quieras simular </FormLabel>
            <Select
              placeholder="Elige una cripto"
              value={token}
              onChange={changeToken}
            >
              <option value="bitcoin">bitcoin</option>
              <option value="ethereum">ethereum</option>
              <option value="solana">solana</option>
              <option value="bnb">bnb</option>
              <option value="cardano">cardano</option>
              <option value="polygon">polygon</option>
              <option value="polkadot">polkadot</option>
              <option value="avalanche">avalanche</option>
              <option value="dogecoin">dogecoin</option>
              <option value="uniswap">uniswap</option>
            </Select>
            <FormLabel>
              Elige cuanto dinero te hubiera gustado invertir
            </FormLabel>
            <NumberInput
              min={100}
              max={1000000}
              value={amount}
              onChange={(valueString) => setAmount(valueString)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <FormLabel>Elige la fecha en este formato dia-mes-año</FormLabel>
            <Input
              placeholder="22-07-2016"
              value={date}
              onChange={handleChange}
            />
            <Button
              mt={4}
              colorScheme="teal"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </Button>

            {loading && <Spinner />}
          </FormControl>
        </Box>
        <Box p={20} px={200}>
          <Text fontSize="5xl">${Math.floor(numeroFinal)}</Text>
        </Box>
      </Flex>
    </Box>
  );
}
