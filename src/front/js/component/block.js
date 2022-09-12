{
  /*contenedor filtros*/
}
<div className="container pt-0 pb-4">
  {/* comunidad */}
  <div className="selector mx-3 mb-3">
    <div className="pb-2">
      <span className="">Comun. Autónoma</span>
    </div>
    <select
      onChange={actions.updateComunidad}
      className="form-select"
      aria-label="Default select example"
      value={store.comunidad}
    >
      <option className="">todas</option>
      {store.listacomunidades.map((item) => {
        let comunidad = Object.keys(item);
        return (
          <option key={comunidad} className="">
            {comunidad}
          </option>
        );
      })}
    </select>
  </div>
  {/* provincia */}
  <div className="selector mx-3 mb-3">
    <div className="pb-2">
      <span className="">Provincia</span>
    </div>
    <select
      onChange={actions.updateProvincia}
      className="form-select"
      aria-label="Default select example"
      value={store.provincia}
    >
      <option className="">todas</option>
      {store.listaprovincias.map((elem) => (
        <option key={elem} className="">
          {elem}
        </option>
      ))}
    </select>
  </div>
  {/* precio */}
  <div className="selector mx-3 mb-3">
    <div className="pb-2">
      <span className="">Precio</span>
    </div>
    <div className="form-text">{/*input para el precio*/}</div>
  </div>
  {/* tipo de vivienda */}
  <div className="selector mx-3 mb-3">
    <div className="pb-2">
      <span className="">Tipo de Vivienda</span>
    </div>
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        onChange={actions.updateViviendaPiso}
      />
      <label className="form-check-label">Piso</label>
    </div>
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        onChange={actions.updateViviendaChalet}
      />
      <label className="form-check-label">Chalet</label>
    </div>
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        onChange={actions.updateViviendaVilla}
      />
      <label className="form-check-label">Villa</label>
    </div>
  </div>
  {/* caracteristicas */}
  <div className="selector mx-3 mb-3">
    <div className="pb-2">
      <span className="">Características</span>
    </div>
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        onChange={actions.updateCaracteristicaPet}
      />
      <label className="form-check-label">Admite mascotas</label>
    </div>
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        onChange={actions.updateCaracteristicaGarage}
      />
      <label className="form-check-label">Garage</label>
    </div>
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        onChange={actions.updateCaracteristicaPiscina}
      />
      <label className="form-check-label">Piscina</label>
    </div>
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        onChange={actions.updateCaracteristicaTerraza}
      />
      <label className="form-check-label">Terraza</label>
    </div>
  </div>
  {/* habitaciones */}
  <div className="selector mx-3 mb-3">
    <div className="pb-2">
      <span className="">Habitaciones</span>
    </div>
    <select
      onChange={actions.updateHabitacion}
      className="form-select"
      aria-label="Default select example"
      value={store.habitaciones}
    >
      <option className="">cualquiera</option>
      {["1", "2", "3 a más"].map((item) => (
        <option key={item} className="">
          {item}
        </option>
      ))}
    </select>
  </div>
  {/* baños */}
  <div className="selector mx-3 mb-3">
    <div className="pb-2">
      <span className="">Baños</span>
    </div>
    <select
      onChange={actions.updateBaño}
      className="form-select"
      aria-label="Default select example"
      value={store.baños}
    >
      <option className="">cualquiera</option>
      {["1", "2", "3 a más"].map((item) => (
        <option key={item} className="">
          {item}
        </option>
      ))}
    </select>
  </div>
  {/* boton */}
  <div className="mx-3 my-2 text-center">
    <button
      onClick={handleClick}
      type="button"
      className="btn btn-primary mb-3"
    >
      Publicar
    </button>
  </div>
</div>;
