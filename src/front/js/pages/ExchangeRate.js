import React from "react";
import "../../styles/ExchangeRate.css";
import { Text } from '@chakra-ui/react'

export const ExchangeRate = ({cambioMoneda, primeraMoneda, segundaMoneda}) => {
    
  
    return (
      <div >
      <Text fontSize='3xl'>Cambio Monto:</Text>
          
      <Text fontSize='4xl'>{cambioMoneda}</Text>
          
      <Text fontSize='xl' as='i'>{primeraMoneda} <Text as='b'>Hacia</Text> {segundaMoneda}</Text>
        </div>
  

      
    )
  };
  