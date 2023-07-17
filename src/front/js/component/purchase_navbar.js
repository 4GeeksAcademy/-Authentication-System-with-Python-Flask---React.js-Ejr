import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export const Purchase_navbar = ({ blockedCount, soldCount }) => {
    return (
        <div className="container sales_navbar">
            <NavLink exact to="/profile/buys" className="sales_navbar_buttons" activeClassName="active">En proceso {blockedCount}</NavLink>
            <NavLink to="/profile/buys-done" className="sales_navbar_buttons" activeClassName="active">Comprados {soldCount}</NavLink>
        </div>
    )
}