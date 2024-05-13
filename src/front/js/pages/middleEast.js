import CoffeeCard from "../component/coffeeCard.js";
import { Typography } from "@mui/material";
import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const MiddleEast = () => {
  const { store, actions } = useContext(Context);

  const handleClick = (name, price) => {
    actions.addCoffeeToOrder({ name, price });
};

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <Typography variant="h1">Orders:</Typography>
        <ul>
          {store.order.items.map((coffee, index) => (
            <li key={index}>{coffee.name} - ${coffee.price}</li>
          ))}
        </ul>
        <Typography variant="h3">Total: ${store.order.total.toFixed(2)}</Typography>
      </div>
      <div style={{ flex: 1 }}>
        <Typography variant="h1">Coffee:</Typography>
        {store["Middle East"] && store["Middle East"].map((current) => (
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
