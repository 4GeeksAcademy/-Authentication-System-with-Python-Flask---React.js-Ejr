import React, { useContext, useEffect } from "react";
import Navbar from "../component/Navbar.jsx";
import { Context } from '../store/appContext.js';
import ShoesCard from "../component/ShoesCard.jsx";

const FootWear = () => {
  const { actions, store } = useContext(Context);

  useEffect(() => {
    actions.getShoes();
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Shoes</h1>
      {store.shoes && store.shoes.length > 0 ? ( 
        store.shoes.map((shoe) => (
          <div className="d-flex" key={shoe.id}>
            <ShoesCard
              index={shoe.id}
              shoe={shoe}
            />
          </div>
        ))
      ) : (
        <h1>Cargando!!!</h1> 
      )}
    </div>
  );
}

export default FootWear;

  