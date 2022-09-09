import React from "react";
import "../../styles/ExchangeRate.css";
import { Text } from '@chakra-ui/react'
import { Center, Square, Circle } from '@chakra-ui/react'

export const ExchangeRate = ({cambioMoneda, primeraMoneda, segundaMoneda}) => {
    
  
    return (
      <div >
      <Text fontSize='3xl'>Cambio Monto:</Text>
          
      <Center><Text fontSize='4xl'>{cambioMoneda}</Text></Center>
          
      <Center><Text as='i' fontSize='4xl'>{primeraMoneda} <Text as='b' fontSize='xl'>Hacia</Text> {segundaMoneda}</Text></Center>
      
        </div>
  

      
    )
  };
  