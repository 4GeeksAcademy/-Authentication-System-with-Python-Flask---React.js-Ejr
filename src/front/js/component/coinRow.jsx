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
} from "@chakra-ui/react";
import { FiStar } from "react-icons/fi";
import NumberFormat from "react-number-format";

const CoinRow = ({ coin, index }) => {
  // console.log(coin, index);
  return (
    <Tr key={coin.name}>
      <Td>{coin.market_cap_rank}</Td>
      <Td>
        <Stack spacing={2} direction="row">
          <Box boxSize="30px">
            <Image src={coin.image} alt={coin.name} />
          </Box>
          <Stack direction="row" pt={1}>
            <Link
              href={"https://coinmarketcap.com/es/currencies/" + coin.name}
              target="_blank"
            >
              {coin.name}
            </Link>
            <Text color="gray">{coin.symbol}</Text>
          </Stack>
        </Stack>
      </Td>

      <Td>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          currencyDisplay: "narrowSymbol",
        }).format(coin.current_price)}
      </Td>
      <Td
        fontWeight={500}
        style={{
          color: coin.price_change_24h > 0 ? "#13C783" : "#ff0000",
        }}
      >
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          currencyDisplay: "narrowSymbol",
        }).format(coin.price_change_24h)}
      </Td>
      <Td>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          currencyDisplay: "narrowSymbol",
        }).format(coin.market_cap)}
      </Td>
      
    </Tr>
  );
};

export default CoinRow;
