import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Context } from "../store/appContext";

export const Profile_navbar = () => {
  const { store, actions } = useContext(Context);

  useEffect(()=> {
    actions.getUser()

  }, [])


    return (
        <div className="container">
            <h2 className="navbar_tittle_h2">Tu perfil</h2>
            <h6 className="profile_navbar_text">Aquí podrás revisar todos los datos de tu cuenta de usuario</h6>
            <div className="row">
                <NavLink exact to="/profile/configuration" className="navbar_profile col-1" activeClassName="active">Perfil</NavLink>
                <NavLink exact to="/profile/onsale" className="navbar_profile col-1" activeClassName="active">En venta</NavLink>
                <NavLink to="/profile/buys" className="navbar_profile col-1" activeClassName="active">Compras</NavLink>
                <NavLink to="/profile/reviews" className="navbar_profile col-1" activeClassName="active">Valoraciones</NavLink>
                <NavLink to="/profile/favorites" className="navbar_profile col-1" activeClassName="active">Favoritos</NavLink>
                {store.user.role==='garage' ? <NavLink to="/profile/garage" className="navbar_profile col-1" activeClassName="active">Perfil Taller</NavLink> : ""}    
            </div>
        </div>
    )
}