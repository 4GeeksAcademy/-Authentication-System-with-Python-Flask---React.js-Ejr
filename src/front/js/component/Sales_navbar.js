import React from "react";
import { NavLink, useLocation } from "react-router-dom";


export const Sales_navbar = ({onsaleCount, blockedCount, soldCount}) => {
  const location = useLocation();

  const isOnSaleActive = () => {
    const pathname = location.pathname;
    return pathname === "/profile/onsale" || pathname === "/profile/block";
  };

  return (
    <div className="container sales_navbar my-3 me-4 ">
      <NavLink exact to="/profile/onsale" className="sales_navbar_buttons px-2" activeClassName="active" isActive={isOnSaleActive}>
        A la venta {onsaleCount}
      </NavLink>
      <NavLink to="/profile/block" className="sales_navbar_buttons" activeClassName="active" isActive={isOnSaleActive}>
        Reservadas {blockedCount} 
      </NavLink>
      <NavLink to="/profile/sales" className="sales_navbar_buttons" activeClassName="active" isActive={isOnSaleActive}>
            Vendidos {soldCount}
      </NavLink>
    </div>
  );
};

