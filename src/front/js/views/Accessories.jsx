import React, { useContext, useEffect } from "react";
import Navbar from "../component/Navbar.jsx";
import { Context } from '../store/appContext.js';
import AccesoriesCard from "../component/AccesoriesCard.jsx";

const Accessories = () => {
  const { actions, store } = useContext(Context);

  useEffect(() => {
    actions.getAccessories();
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Accessories</h1>
      <div className="d-flex justify-content-center row ">
      {store.accessories && store.accessories.length > 0 ? ( 
        store.accessories.map((accessorie) => (
          <div className="col mx-auto mb-4 w-26" key={accessorie.id}>
            <AccesoriesCard
              index={accessorie.id}
              accessorie={accessorie}
            />
          </div>
          
        ))
      ) : (
        <h1>Cargando!!!</h1> 
      )}
      </div>
    </div>
  );
}

export default Accessories;
