import React from "react";
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
  Image,
  Box,
  color,
  Stack,
  Text,
  Link,
  IconButton,
  background,
  Badge,
} from "@chakra-ui/react";
import { FiStar } from "react-icons/fi";
const TarjetaNoticia = ({ image, sourcenews, title, linknews }) => {
  console.log(image);

  return (
    <Link href={linknews[0]?.linknews} target="_blank">
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        style={{ textDecoration: "none" }}
      >
        {<Image src={image[0]?.image} />}
        <Box p="6">
          <Box display="flex" alignItems="baseline">
            <Badge borderRadius="full" px="2" colorScheme="teal">
              Nueva
            </Badge>
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            >
              {sourcenews[0]?.sourcenews}
            </Box>
          </Box>
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            noOfLines={3}
          >
            {title[0]?.title}
          </Box>
        </Box>
      </Box>
    </Link>
  );
};
export default TarjetaNoticia;
