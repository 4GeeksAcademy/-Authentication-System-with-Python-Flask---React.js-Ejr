import React from "react";
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const CartDropdown = ({ cartItems, onClearCart }) => {
  console.log("cart items: " + cartItems.length);
  return (
    <NavDropdown
      key={cartItems.length}
      title={`Cart (${cartItems.length})`}
      id="basic-nav-dropdown"
    >
      {cartItems.length > 0 ? (
        cartItems.map((item, index) => (
          <NavDropdown.Item key={index}>
            {item.title} - ${item.price}
          </NavDropdown.Item>
        ))
      ) : (
        <NavDropdown.Item>No items in cart</NavDropdown.Item>
      )}
      {cartItems.length > 0 && <NavDropdown.Divider />}
      {/* {cartItems.length > 0 && ( */}
      <NavDropdown.Item onClick={onClearCart}>Clear Cart</NavDropdown.Item>
      {/* )} */}
      <NavDropdown.Item as={Link} to="/checkout">
        Checkout
      </NavDropdown.Item>
    </NavDropdown>
  );
};

export default CartDropdown;
