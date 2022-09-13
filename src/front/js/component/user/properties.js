import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../store/appContext";

export const Properties = () => {
  const { store, actions } = useContext(Context);
  const [properties, setProperties] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      await actions.getUserProperties();
      setProperties(JSON.parse(localStorage.getItem("userProperties")));
      setIsLoading(false);
    };
    fetchProperties();
  }, []);

  return (
    <>
      {!isloading ? (
        <div
          className="d-flex justify-content-center"
          style={{ height: "90vh", width: "70vw" }}
        >
          <div
            style={{
              background: "lightgreen",
              height: "80%",
              width: "100%",
              overflowX: "auto",
              overflowY: "auto",
              textAlign: "center",
            }}
          >
            {properties.map((property, i) => (
              <div
                className="card text-bg-dark mb-3"
                style={{ maxWidth: "100%" }}
                key={i}
              >
                <div className="card-header">
                  <h3>{property.comunidad}</h3>
                  {property.direccion}
                </div>
                <div className="card-body">
                  <img
                    src={property.fotos[0]}
                    className="img-thumbnail rounded float-start"
                    style={{ width: "200px", height: "200px" }}
                  />
                  <div className="d-flex justify-content-evenly">
                    <h5 className="card-title">{property.tipo_operacion}</h5>
                    <h5 className="card-title">{property.tipo_vivienda}</h5>
                    <h5 className="card-title">{property.habitaciones} hab.</h5>
                    <h5 className="card-title ">{property.baños} baños</h5>
                  </div>
                  <div className="d-flex justify-content-center">
                    <h5 className="text-muted">
                      <br /> {property.descripcion}
                    </h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          className="d-flex justify-content-center"
          style={{ height: "90vh", width: "1200px" }}
        >
          <h5>Loading...</h5>
        </div>
      )}
    </>
  );
};
