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
  Center,
} from "@chakra-ui/react";
import SidebarWithHeader from "../component/sideBar.jsx";
import CountUp from "react-countup";

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
  const [counterOn, setCounterOn] = useState(false);

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
      <Flex p={10} background={"black"}>
        <Box pt={20}>
          <Center>
            <Text fontSize="5xl" color={"white"} fontWeight={800}>
              Maquina del tiempo{" "}
            </Text>
          </Center>
          <Center>
            <Text as="i" fontSize="5xl" color={"white"} fontWeight={600}>
              cripto
            </Text>
          </Center>
          <Text fontSize="lg" color={"white"} py={10} px={14}>
            {" "}
            Que seria de tu dinero si hubieras invertido en cripto un par de
            años antes, gracias a CriptoSchool lo podras saber.
          </Text>
          <Center pt={10}>
            <Text fontSize="5xl" color={"white"} fontWeight={800}>
              Dinero total ganado{" "}
            </Text>
          </Center>
          <Center>
            <Text
              fontSize="5xl"
              fontWeight={800}
              style={{
                color: numeroFinal > 0 ? "#13C783" : "#ff0000",
              }}
            >
              $
              <CountUp start={0} end={numeroFinal} />
            </Text>
          </Center>
        </Box>
        <Box w={700} h={500} borderRadius="lg" background={"#361A60"}>
          <Box px={10} py={10}>
            <Center pb={5}>
              <Text color={"white"} fontSize={"3xl"} fontWeight={800}>
                Calculadora
              </Text>
            </Center>
            <FormControl>
              <FormLabel color={"white"}>
                Elige la cripto que quieras simular{" "}
              </FormLabel>
              <Select
                pb={5}
                placeholder="Elige una cripto"
                value={token}
                onChange={changeToken}
                color={"white"}
              >
                <option value="bitcoin">bitcoin</option>
                <option value="ethereum">ethereum</option>
                <option value="solana">solana</option>
                <option value="bnb">bnb</option>
                <option value="cardano">cardano</option>
                <option value="matic-network">polygon</option>
                <option value="polkadot">polkadot</option>
                <option value="avalanche">avalanche</option>
                <option value="dogecoin">dogecoin</option>
                <option value="uniswap">uniswap</option>
              </Select>
              <FormLabel color={"white"}>
                Digita cuanto dinero te hubiera gustado invertir
              </FormLabel>
              <NumberInput
                min={100}
                max={1000000}
                value={amount}
                onChange={(valueString) => setAmount(valueString)}
                color={"white"}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FormLabel color={"white"} pt={5}>
                Elige la fecha en este formato dia-mes-año
              </FormLabel>
              <Input
                placeholder="22-07-2016"
                value={date}
                onChange={handleChange}
                color={"white"}
              />
              <Center>
                <Button
                  mt={6}
                  colorScheme="purple"
                  type="submit"
                  onClick={handleSubmit}
                  borderRadius={50}
                >
                  Al pasado!
                </Button>
              </Center>
              {loading && <Spinner />}
            </FormControl>
          </Box>
        </Box>
        <Box p={20} px={200}></Box>
      </Flex>
    </Box>
  );
}
