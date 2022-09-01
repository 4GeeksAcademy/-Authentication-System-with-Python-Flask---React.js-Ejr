import React, { useContext } from "react";
import { Context } from "../store/appContext";
import CardOwner from "../component/cardOwner";
import { Link } from "react-router-dom";

const CarouselOwner = () => {
  const { store, actions } = useContext(Context);

  let style1 = {
    overflowX: "scroll",
    overflowY: "white",
    alignItems: "center",
    backgroundColor: "rgba(224, 224, 224, 0.3)",
    height: "25rem",
    paddingLeft: "20px",
    paddingRight: "5px",
    borderRadius: "5px",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  };

  return (
    <div className="container-fluid">
      <div className="d-flex flex-row rounded" style={style1}>
        {store.dogs.map((item, index) => {
          return item.map((obj, index) => {
            return (
              <CardOwner
                name={obj.name}
                id={obj.id}
                posStore={index}
                breed={obj.breed}
                age={obj.age}
                file={obj.file}
              />
            );
          });
        })}
      </div>
      <Link to={"/adddog"} id="logoText">
        <div className="btn btn-primary mt-3">Agregar Perro</div>
      </Link>
    </div>
  );
};

export default CarouselOwner;
