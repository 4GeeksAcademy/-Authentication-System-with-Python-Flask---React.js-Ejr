import React from "react";
import SidebarWithHeader from "../component/sideBar.jsx";
import { Box, Input, Text, Image, Stack, Center } from "@chakra-ui/react";
import CursoBox from "../component/cursoBox.jsx";
import { Context } from "../store/appContext";
import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function RutaAprendizaje() {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

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
                  {store.clases.map((e, i) => {
                    const navigateNextVideo = () => {
                      navigate(`./${e.id}`);
                    };
                    return (
                      <Box
                        borderRadius="sm"
                        borderWidth="2px"
                        h={20}
                        width={350}
                        pt={6}
                        mt={4}
                        rounded={50}
                        _hover={{
                          background: "#8C52FF",
                          color: "white",
                          cursor: "pointer",
                        }}
                        key={e.id}
                        onClick={navigateNextVideo}
                      >
                        <Center>
                          <Text>{e.titulo}</Text>
                        </Center>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
              <Box width={500}>
                <Text fontWeight={700} fontSize="3xl">
                  Inicia tu camino hacia la Web3
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
                  Ademas, al momento de finalizar nuestra introducción a la
                  blockchain, te regalaremos tu primer NFT, certificando que no
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
