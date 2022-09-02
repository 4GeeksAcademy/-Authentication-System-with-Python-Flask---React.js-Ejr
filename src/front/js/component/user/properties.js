import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../store/appContext";

export const Properties = () => {
  const { store, actions } = useContext(Context);
  const [properties, setProperties] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      await actions.getProperties();
      setProperties(JSON.parse(localStorage.getItem("properties")));
      setIsLoading(false);
    };
    fetchProperties();
  }, []);

  return (
    <>
      {!isloading ? (
        <div
          className="d-flex justify-content-center"
          style={{ height: "90vh", width: "1200px" }}
        >
          <div
            style={{
              background: "lightgreen",
              height: "60%",
              width: "60%",
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
                <div className="card-header">{property.direccion}</div>
                <div className="card-body">
                  <h5 className="card-title">{property.tipo_operacion}</h5>
                  <h5 className="card-title text-muted">
                    {property.tipo_vivienda}
                  </h5>
                  <p className="card-text">{property.pet}</p>
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
