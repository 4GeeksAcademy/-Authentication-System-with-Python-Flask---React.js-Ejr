import React, { useContext, useEffect } from "react";
import Navbar from "../component/Navbar.jsx";
import { Context } from '../store/appContext.js';
import ClothesCard from "../component/ClothesCard.jsx";

const Clothes = () => {
  const { actions, store } = useContext(Context);

  useEffect(() => {
    actions.getClothes();
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Clothes</h1>
      {store.clothes && store.clothes.length > 0 ? ( 
        store.clothes.map((clothe) => (
          <div className="d-flex" key={clothe.id}>
            <ClothesCard
              index={clothe.id}
              clothe={clothe}
            />
          </div>
        ))
      ) : (
        <h1>Cargando!!!</h1> 
      )}
    </div>
  );
}

export default Clothes;
