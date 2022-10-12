import React, { useState } from "react";
import { Center, Square, Circle, styled } from '@chakra-ui/react'
import { ExchangeRate } from "./ExchangeRate";
import "../../styles/CurrencyConverter.css";
import axios from "axios";
import { Box } from '@chakra-ui/react'
import { Container } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import  {Select}  from '@chakra-ui/react'
import btc from '../../img/imagenesConversor/btc.png'

import { Button, ButtonGroup } from '@chakra-ui/react'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import { Divider } from '@chakra-ui/react'


export const CurrrencyConverter = () => {
  const monedas = ["BTC", " ETH", "USD", "XRP", "LTC", " CLP","ADA","DOT","MATIC","BNB","SOL","ETC"];
  const [primeraMoneda, setPrimeraMoneda] = useState('BTC');
  const [segundaMoneda, setSegundaMoneda] = useState('CLP');
  const [monto, setMonto] = useState(1);
  const [cambioMoneda, setCambioMoneda] = useState(0)
  const [resultado, setResultado] = useState(0)
  console.log(monto);
  const convertir = () =>{
   

    const axios = require("axios");

    const options = {
      method: 'GET',
      url: 'https://alpha-vantage.p.rapidapi.com/query',
      params: {from_currency: primeraMoneda, function: 'CURRENCY_EXCHANGE_RATE', to_currency: segundaMoneda},
      headers: {
        'X-RapidAPI-Key': 'e21684da32msh8fe4f5004e7c02bp16dc24jsn5167f180637e',
        'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
        console.log(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
        setCambioMoneda(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
        setResultado(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'] * monto)
    }).catch(function (error) {
        console.error(error);
    });
  }
  console.log(cambioMoneda)
  return (
    
    <Container maxW='2xl'  centerContent> 
      <Text fontSize='5xl'>Conversor cripto</Text>
      <Divider orientation='vertical' />
      <TableContainer>
      
          <body>
            <tr>
              
              <td>💰 Desde divisa:</td>
              <td isNumeric>
                <Input variant='flushed'
                style={{textAlign: "center"}}
                  type="number"
                  name="currency-amount-1"
                  value={monto}
                  onChange={(e) => setMonto(e.target.value)}
                />
              </td>
              <td>
                <Select
                  value={primeraMoneda}
                  name="currency-option-1"
                  className="currency-options"
                  onChange={(e) => setPrimeraMoneda(e.target.value)}
                >
                  {monedas.map((monedas, _index) => (
                    <option key={_index}>{monedas}</option>
                  ))}
                </Select>
              </td>
            </tr>
            <tr>
              <td>💰 A la divisa:</td>
              <td isNumeric>
                <Input variant='flushed'
                  type="number"
                  name="currency-amount-2"
                  style={{textAlign: "center"}}
                  value={resultado}
                  disabled={true}
                />
              </td>
              <td>
                <Select
                  value={segundaMoneda}
                  name="currency-option-2"
                  className="currency-options"
                  onChange={(e) => setSegundaMoneda(e.target.value)}
                >
                  {monedas.map((monedas, _index) => (
                    <option key={_index}>{monedas}</option>
                  ))}
                </Select>
              </td>
            </tr>
          </body>
          </TableContainer>
          <Center height='50px'>
  <Divider orientation='vertical' />
</Center>
        <Button  colorScheme='purple' id="boton-convertir" onClick={convertir}>Convertir</Button>
               
        <Center height='50px'>
  <Divider orientation='vertical' />
</Center>
      <ExchangeRate
        cambioMoneda={new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          currencyDisplay: "narrowSymbol",
        }).format(cambioMoneda)}
        primeraMoneda={primeraMoneda}
        segundaMoneda={segundaMoneda}
         />
    </Container>
    
  );
};
