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
} from "@chakra-ui/react";
import CoinRow from "../component/coinRow.jsx";

const TableCoins = ({ coins, search }) => {
  const filterCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) |
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <TableContainer>
      <Table variant="simple" size="md">
        <Thead>
          <Tr>
            <Th>#</Th>

            <Th>Name</Th>
            <Th>Price</Th>
            <Th>Price change 24h</Th>
            <Th>Market cap</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filterCoins.map((coin, index) => (
            <CoinRow coin={coin} key={index} index={index} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TableCoins;
