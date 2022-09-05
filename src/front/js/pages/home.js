import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import CryptoTile from "./CryptoTile.jsx"
import "../../styles/home.css";
import btc from '../../img/imagenesConversor/btc.png'
import eth from '../../img/imagenesConversor/eth.png'
import litee from '../../img/imagenesConversor/litee.png'
import xem from '../../img/imagenesConversor/xem.png'
import SidebarWithHeader from "../component/sideBar.jsx";
import BuyForm from "./BuyForm.jsx";

export const Home = () => {
  const { store, actions } = useContext(Context);

  const tiles = [
    {id: 1, icon: btc, name: 'BTC', rate: 33834},
    {id: 2, icon: eth, name: 'ETG', rate: 1394},
    {id: 3, icon: xem, name: 'XEM', rate: 0.2708},
  ]
  const [tituloSelect, selectEstado] = useState(tiles[0]);
  const handleSelect = (data) => {
    selectEstado(data);
  }

  console.log('Datos de tile', tituloSelect)
  return (
    <div className="container" id="divGrande">
      <div className="row">
        <div className="col-6">
          <div className="d-flex">
            {tiles.map((coin) => (
              <CryptoTile  
              key={coin.id} 
              data={coin}  
              onClick={handleSelect}
              selected={coin.id === tituloSelect.id} />
            ))}
          </div>
          <BuyForm />
        </div>
        <div className="col-6">
          col2
        </div>
      </div>

    </div>
    
  )
}
  

