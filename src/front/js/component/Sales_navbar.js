import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export const Sales_navbar = () => {
    return (
        <div className="container sales_navbar my-3">
            <NavLink exact to="/profile/onsale" className="sales_navbar_buttons px-2" activeClassName="active">A la venta</NavLink>
            <NavLink to="/profile/block" className="sales_navbar_buttons" activeClassName="active">Reservadas</NavLink>
        </div>
    )
}