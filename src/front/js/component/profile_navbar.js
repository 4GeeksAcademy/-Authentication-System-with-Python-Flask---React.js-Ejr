import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export const Profile_navbar = () => {
    return (
        <div className="container">
            <h2>Tu perfil</h2>
            <h6 className="profile_navbar_text">Aquí podrás revisar todos los datos de tu cuenta de usuario</h6>
            <div className="row">
                <NavLink exact to="/profile/configuration" className="navbar_profile col-1" activeClassName="active">Perfil</NavLink>
                <NavLink to="/profile/sales" className="navbar_profile col-1" activeClassName="active">Ventas</NavLink>
                <NavLink to="/profile/buys" className="navbar_profile col-1" activeClassName="active">Compras</NavLink>
                <NavLink to="/profile/reviews" className="navbar_profile col-1" activeClassName="active">Valoraciones</NavLink>
                <NavLink to="/profile/onsale" className="navbar_profile col-1" activeClassName="active">En venta</NavLink>
                <NavLink to="/profile/favorites" className="navbar_profile col-1" activeClassName="active">Favoritos</NavLink>
                <NavLink to="/profile/garage" className="navbar_profile col-1" activeClassName="active">Perfil Taller</NavLink>
            </div>
        </div>
    )
}