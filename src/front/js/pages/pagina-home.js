import React, { useContext } from "react";
import { Context } from "../store/appContext";
import guinazu from "../../img/guinazu.png";
import coinc from "../../img/coinc.png";
import "../../styles/pagina-home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div>
    
      <div id="cartaCasa" class="card">
        <div>
        <img
          className="logo"
          class="card-img-top"
          id="fotocartacasa"
          src={coinc}
        />
        <br></br>
        </div>
        <div>
        <div
      dangerouslySetInnerHTML={{__html: store.moreexchange}}
    />
    <a onclick="window.location = 'gracias.html'" target="_new" href="https://www.moreexchange.cl/">Ir a Moreexchange</a>
        </div>
      </div>
      <div id="cartaCasa2" class="card">
        <div>
        <img className="logo"
         id="fotocartacasa"
         src={guinazu}
          />
        </div>
        <div>
        <div
      dangerouslySetInnerHTML={{__html: store.cambiossuiza}}
    />
    <br></br>
    <a onclick="window.location = 'gracias.html'" target="_new" href="https://www.guinazu.cl/">Ir a Guiñazu</a>
        </div>
        </div>
      </div>
  );
};
