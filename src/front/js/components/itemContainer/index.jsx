import React from "react";
import "./styles.css";

const ItemContainer = ({ title, ...rest }) => {
  return (
    <div className="item-container boxShadow" {...rest}>
      <span>{title}</span>
    </div>
  );
};

export default ItemContainer;
