import React from "react";
import SidebarWithHeader from "../component/sideBar.jsx";
import { Box, Input, Text, Image, Stack } from "@chakra-ui/react";
import CursoBox from "../component/cursoBox.jsx";

export default function RutaAprendizaje() {
  return (
    <Box display="flex">
      <SidebarWithHeader />
      <Box display="grid" pl="20" pt="10">
        <Box>
          <Box>
            <Stack direction="row">
              <Image
                boxSize="50px"
                src="https://static.platzi.com/media/learningpath/badges/7a2ccf8b-e35a-48c1-a1d5-42595d5f68db.jpg"
              />
              <Text fontWeight={700} fontSize="3xl">
                Introduccion a la Blockchain
              </Text>
            </Stack>
          </Box>
          <Box pt={10}>
            <Stack spacing={1} direction="row">
              <Box width={500}>
                <Text fontWeight={700} fontSize="2xl">
                  Ruta de aprendizaje
                </Text>
                <Box pt={4} maxH="xl" overflowX="scroll">
                  <CursoBox title="Web 1.0 vs Web 2.0 vs Web 3" />
                  <CursoBox title="¿Que es blockchain?" />
                  <CursoBox title="Bitcoin vs Ethereum" />
                  <CursoBox title="Creando mi primera Wallet" />
                  <CursoBox title="Comprando cripto - Binance" />
                  <CursoBox title="Comprando cripto - Buda" />
                  <CursoBox title="Wallet parte 2" />
                  <CursoBox title="Proyectos en la web 3" />
                  <CursoBox title="Interactuando con un smart contract" />
                  <CursoBox title="Interactuando con un smart contract - parte 2" />
                  <CursoBox title="Interactuando con un smart contract - parte 3" />
                  <CursoBox title="Final del curso" />
                </Box>
              </Box>
              <Box width={500}>
                <Text fontWeight={700} fontSize="3xl">
                  Inicia tu camino hacia la web3
                </Text>
                <Text pt={4}>
                  ¿Criptomonedas? ¿Blockchain? ¿Ethereum? Seguramente alguna vez
                  en tu vida oíste hablar de estos términos y pensabas que
                  hablaban en Chino, bueno, no eres el único, todos partimos
                  ahí. Por eso en Cripto School, creamos una forma fácil y
                  didáctica de cómo aprender todos estos términos.
                </Text>
                <Text pt="4">
                  Con este primer empujón en el mundo cripto queremos que puedas
                  aprender fácilmente a comprar criptos, crearte una Wallet y
                  mucho más.
                </Text>
                <Text pt="4">
                  Ademas al momento de finalizar nuestra introducción a la
                  blockchain te regalaremos tu primer NFT, certificando que no
                  eres un novato en este mundo.
                </Text>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
