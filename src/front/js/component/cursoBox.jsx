import React from "react";
import {
  Box,
  Input,
  Text,
  Image,
  Stack,
  Center,
  color,
} from "@chakra-ui/react";

export default function CursoBox(props) {
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
      }}
    >
      <Center>
        <Text>{props.title}</Text>
      </Center>
    </Box>
  );
}
