import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import SidebarWithHeader from "../component/sideBar.jsx";
export const Home = () => {
  const { store, actions } = useContext(Context);

  return <div></div>;
};
