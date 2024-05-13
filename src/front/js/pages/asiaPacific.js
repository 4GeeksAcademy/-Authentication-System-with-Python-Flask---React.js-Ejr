import CoffeeCard from "../component/coffeeCard.js";
import { Typography } from "@mui/material";
import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";


export const AsiaPacific = () => {
  const { store, actions } = useContext(Context);
  const [selectedCoffees, setSelectedCoffees] = useState([]);

  const handleClick = (name, price) => {
    setSelectedCoffees([...selectedCoffees, { name, price }]);
  };

  const total = selectedCoffees.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <Typography variant="h1">Orders:</Typography>
        <ul>
          {selectedCoffees.map((coffee, index) => (
            <li key={index}>{coffee.name} - ${coffee.price}</li>
          ))}
        </ul>
        <Typography variant="h3">Total: ${total.toFixed(2)}</Typography>
      </div>
      <div style={{ flex: 1 }}>
        <Typography variant="h1">Coffee:</Typography>
        {store["Asia Pacific"] && store["Asia Pacific"].map((current) => (
          <CoffeeCard
            name={current.name}
            price={current.price}
            key={current.id}
            handleClick={handleClick}
          />
        ))}
      </div>
    </div>
  );
};
