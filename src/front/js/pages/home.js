import React, { useContext } from "react";
import { Context } from "../store/appContext";
import CryptoTile from "./CryptoTile.jsx"
import "../../styles/home.css";
import btc from '../../img/imagenesConversor/btc.png'
import eth from '../../img/imagenesConversor/eth.png'
import SidebarWithHeader from "../component/sideBar.jsx";
export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container" id="divGrande">
      <div className="row">
        <div className="col-6">
          <CryptoTile title="BTC"/>
          <CryptoTile title="ETH"/>
          <CryptoTile />
        </div>
        <div className="col-6">
          col2
        </div>
      </div>

    </div>
    
  )
};
