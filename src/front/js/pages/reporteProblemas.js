import React from "react";
const Reporte = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <br />
          <br />
          <br />
          <br />
          <br />
          <p>Hola, lamentamos mucho los problemas ocasionados</p>
          <p>Cuéntanos, ¿Cuál es tu problema?</p>
          <label className="mb-3 mt-4">
            <input type="checkbox" name="check" value="si" autocomplete="off" />{" "}
            No pedí colación, pero esta llegó a mi casa
          </label>{" "}
          <br />
          <label className="mb-3 mt-4">
            <input type="checkbox" name="check" value="si" autocomplete="off" />{" "}
            Pedí menú, y esta no llegó
          </label>{" "}
          <br />
          <label className="mb-3 mt-4">
            <input type="checkbox" name="check" value="si" autocomplete="off" />{" "}
            Tuve un problema con mi colación
          </label>{" "}
          <br />
          <label className="mb-3 mt-4">
            <input type="checkbox" name="check" value="si" autocomplete="off" />{" "}
            Otro: (especfica)
          </label>{" "}
          <br />
          <textarea
            className="form-control mb-5"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
          
        </div>
      </div>
    </div>
  );
};

export default Reporte;
