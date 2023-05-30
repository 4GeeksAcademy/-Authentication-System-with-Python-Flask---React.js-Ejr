import React from "react";
import styles from "./itemContainer.module.css";

const ItemContainer = ({ title, ...rest }) => {
  return (
    <div className={`${styles._itemContainer} _boxShadow`} {...rest}>
      <span>{title}</span>
    </div>
  );
};

export default ItemContainer;
