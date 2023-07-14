import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export const Sales_navbar = ({ onsaleCount, blockedCount, soldCount }) => {
    return (
        <div className="container sales_navbar">
            <NavLink exact to="/profile/onsale" className="sales_navbar_buttons" activeClassName="active">A la venta {onsaleCount}</NavLink>
            <NavLink to="/profile/block" className="sales_navbar_buttons" activeClassName="active">Reservados {blockedCount} </NavLink>
            <NavLink to="/profile/sales" className="sales_navbar_buttons" activeClassName="active">Vendidos {soldCount}</NavLink>
        </div>
    )
}