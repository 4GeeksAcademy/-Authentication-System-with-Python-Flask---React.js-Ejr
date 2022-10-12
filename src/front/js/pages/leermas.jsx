
import React from "react";
import { AspectRatio } from '@chakra-ui/react'
import { ReactNode } from 'react';
import {
  Stack,
  Container,
  Box,
  Flex,
  Text,
  Button,
  Heading,
  SimpleGrid,
} from '@chakra-ui/react';
import { Center, Square, Circle } from '@chakra-ui/react'
import { Link } from "react-router-dom";


export default function StatsGridWithImage() {
  return (

    <Center>
      <Link to="/">
            <Button
              rounded={"full"}
              px={6}
              colorScheme={"purple"}
              bg={"rgb(140,82,255)"}
              _hover={{ bg: "rgb(140,82,255)" }}
            >
              Volver
            </Button>
          </Link>
          <Box position="fixed" w="100%" zIndex={2}>
          <Link to="/">
            <Button
              rounded={"full"}
              px={6}
              colorScheme={"purple"}
              bg={"rgb(140,82,255)"}
              _hover={{ bg: "rgb(140,82,255)" }}
            >
              Volver
            </Button>
          </Link>
        </Box>
    <Box  position={'relative'}>
      <Flex
        flex={1}
        zIndex={0}
        display={{ base: 'none', lg: 'flex' }}
        backgroundSize={'cover'}
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        position={'absolute'}
        width={'50%'}
        insetY={0}
        right={0}>
        <Flex
          bgGradient={'linear(to-r, transparent)'}
          w={'full'}
          h={'full'}
        />
      </Flex>
      <Container maxW={'7xl'} zIndex={10} position={'relative'}>
        <Stack direction={{ base: 'column', lg: 'row' }}>
          <Stack
            flex={1}
            color={'gray.400'}
            justify={{ lg: 'center' }}
            py={{ base: 4, md: 20, xl: 60 }}>
            <Box mb={{ base: 8, md: 20 }}>
              <Text
                fontFamily={'heading'}
                fontWeight={700}
                textTransform={'uppercase'}
                mb={3}
                fontSize={'xl'}
                color={'gray.500'}>
                Blockchain
              </Text>
              <Heading
                color={'rgb(140,82,255)'}
                mb={5}
                fontSize={{ base: '3xl', md: '5xl' }}>
                Razones para aprender Criptomonedas.
              </Heading>
              <Text fontSize={'xl'} color={'gray.400'}>
              ¡La tecnología avanza rápido! Si todavía está cimentado en su cubo editando códigos Java o simplemente jugando con PowerBuilder, probablemente esté viviendo en el pasado donde solo hay unos pocos empleadores.
Las cosas han cambiado ahora. Debe dar un paso adelante y caminar con las tecnologías revolucionarias donde Blockchain es uno de los líderes.
¿Está buscando las mejores razones para invertir tiempo en aprender Blockchain con miras a convertirse en usuario, inversor o desarrollador? Aquí están las razones principales.
              </Text>
            </Box>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              {stats.map((stat) => (
                <Box key={stat.title}>
                  <Text
                    fontFamily={'heading'}
                    fontSize={'3xl'}
                    color={'white'}
                    mb={3}>
                    {stat.title}
                  </Text>
                  <Text fontSize={'xl'} color={'gray.400'}>
                    {stat.content}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Stack>
          <Flex flex={1} />
        </Stack>
      </Container>
     
    </Box>
    <Box>
   Video explicativo sobre las Criptomonedas explicado por BBC.
<AspectRatio maxW='560px' ratio={1}>
<iframe width="560" height="315" src="https://www.youtube.com/embed/C-3aYnhF6Io" title="Cripto BBC" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</AspectRatio>
              </Box>
    </Center>
      
  );
}


const StatsText = ({ children  }) => (
  
  <Text as={'span'} fontWeight={700} color={'rgb(140,82,255)'}>
    {children}
  </Text>
  
  
);

const stats = [
  {
    title: '10+',
    content: (
    
      <>
      
        <StatsText>Altas perspectivas laborales y buena paga.</StatsText> Desde nuevas empresas criptográficas hasta empresas establecidas, el mercado laboral se ve bien para los entusiastas de blockchain y se espera que crezca exponencialmente en los próximos años.
        
      </>
      
    ),
  },
  
  {
    title: '24/7',
    content: (
      <>
        <StatsText>Alta demanda de Blockchain</StatsText> Blockchain es un sector en auge, hay amplias oportunidades esperándote en el mercado.

Si crees que tienes las habilidades adecuadas para trabajar en el dominio Blockchain y desea adaptarse a esta ola de tendencia, podrá nadar en el mar de trabajos y disfrutar del poder de esta plataforma revolucionaria.
      </>
    ),
  },
  {
    title: '13%',
    content: (
      <>
        <StatsText>Tecnología de punta
        </StatsText> Según el censo, se encuentra que solo el 0,5% de la población mundial usa blockchain hoy; pero el 50% o 3,77 mil millones de personas usan Internet, por lo que existe la oportunidad de caminar por delante del mundo y aprender Blockchain.


      </>
    ),
  },
  {
    title: '250M+',
    content: (
      <>
        <StatsText>Integración con la tecnología de la nueva era</StatsText> Ha habido algunos conceptos únicos producidos a partir de una fusión de blockchain con sistemas de votación, comercio de productos básicos e incluso bienes raíces, pero el candidato con más probabilidades de impulsar la adopción masiva de blockchain es el Internet de las cosas (IoT) .

Esta capacidad de construir una infraestructura segura para la colaboración autónoma facilita la creatividad sin preocuparse por la veracidad de sus datos.
      </>
    ),
  },
]

