import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Image } from '@chakra-ui/react'
import Swal from "sweetalert2";
import { useAuth0 } from "@auth0/auth0-react";



export const Login= () => {

  // React States

  const {loginWithRedirect} = useAuth0()
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  const database = [
    {
      username: "benja@cryptoschool.cl",
      password: "benja"
    },
    {
      username: "leo@cryptoschool.cl",
      password: "leo"
    }
  ];

  const errors = {
    uname: "usuario invalido",
    pass: "usuario invalido"
  };

  const onRedirectCallback = (appState) => {
    history.push(appState?.returnTo || window.location.home);
  };
  const handleSubmit = (event) => {
    
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    
    const userData = database.find((user) => user.username === uname.value);

 
    if (userData) {
      if (userData.password !== pass.value) {
       
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Inicia sesion </Heading>
            <Image
              boxSize='250px'
              src='https://i.postimg.cc/bvRfWZr9/Logo-Definitivo-1-1.png'
              alt='LogoCrypto'
                />
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email: </FormLabel>
                <Input type="text" name='uname' required  />
                {renderErrorMessage("uname")}
              </FormControl>
              <FormControl id="password">
                <FormLabel>Contraseña:</FormLabel>
                <Input type="password"  name="pass" required />
                {renderErrorMessage("pass")}
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Recordar</Checkbox>
                  <Link color={'blue.400'}>¿Olvidaste la contraseña?</Link>
                </Stack>
                <Button
                type="submit"
                  bg={'rgb(140,82,255)'}
                  color={'white'}
                  _hover={{
                    bg: 'rgb(140,82,255)',
                  }}>
                  Sign in
                </Button>
                <Button
                onClick={() =>loginWithRedirect() }
                type="submit"
                  bg={'rgb(140,82,255)'}
                  color={'white'}
                  _hover={{
                    bg: 'rgb(140,82,255)',
                  }}>
                  Login con Auth0 o Google
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
      </form>
    </div>
  );
  
      
  return (
    <>
        
        {isSubmitted ? 
        Swal.fire(
          'Bien!',
          'Ingresaste sesion correctamente',
            'success'
           ) : renderForm}
      
     </>
  );
}

