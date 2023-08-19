import React from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import { Toolbar } from "primereact/toolbar";
import logoNavar from "../../img/logoNavar.jpeg";
export const Navbar = () => {
  const isAuthenticated = false; // Simulación de autenticación
  const userRole = "superadmin"; // Simulación de rol de usuario

  const items = [
    { label: "Home", icon: "pi pi-fw pi-home", to: "/" },
    { label: "About", icon: "pi pi-fw pi-home", to: "/about" },
    { label: "Contact", icon: "pi pi-fw pi-home", to: "/contact" },
    {
      label: "User Page",
      icon: "pi pi-fw pi-cog",
      to: "userpage",
      permissions: ["user", "superadmin"],
    },
    {
      label: "Admin Page",
      icon: "pi pi-fw pi-cog",
      to: "adminpage",
      permissions: ["admin", "superadmin"],
    },
    {
      label: "SuperAdmin Page",
      icon: "pi pi-fw pi-cog",
      to: "superadminpage",
      permissions: ["superadmin"],
    },
  ];

  const filteredItems = items.filter(
    (item) =>
      !item.permissions ||
      (isAuthenticated && item.permissions.includes(userRole))
  );

  const menuModel = filteredItems.map((item) => {
    if (item.to) {
      return {
        label: (
          <Link to={item.to} className="p-menuitem-link">
            <i className={item.icon}></i>
            <span>{item.label}</span>
          </Link>
        ),
      };
    }
    return null;
  });

  const end = (
    <React.Fragment>
      {!isAuthenticated && (
        <>
          <Button
            label="Login"
            icon="pi pi-user"
            className="p-button-success p-mr-2"
          />
          <Button
            label="Register"
            icon="pi pi-user-plus"
            className="p-button-secondary"
          />
        </>
      )}
      {isAuthenticated && (
        <Button
          label="logout"
          icon="pi pi-user"
          className="p-button-danger p-mr-2"
        />
      )}
    </React.Fragment>
  );
  const startContent = (
    <Link to="/">
      <img alt="logo" src={logoNavar} height="40" className="mr-2"></img>
    </Link>
  );

  const endContent = (
    <React.Fragment>
      <Menubar model={menuModel} end={end} />
    </React.Fragment>
  );
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <div className=" w-100">
          <Toolbar start={startContent} end={endContent} />
        </div>
      </div>
    </nav>
  );
};
