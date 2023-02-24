import React from "react";
import { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";


const Planets = () => {
  const [info, setInfo] = useState ({"name": " "}, {"climate": " "}, {"diameter": " "}, {"surface_water": " "}, {"gravity": " "}, {"orbital_period": " "}, {"terrain": " "}) 
  const { store, actions } = useContext(Context);
  const [planets, setSelected] = useState (
    [
      {
        'index' : 2,
        'name' : "Alderaan",
        'selected': false
      },
      {
        'index' : 10,
        'name' : "Kamino",
        'selected': false
      },
      {
        'index' : 5,
        'name' : "Dagobah",
        'selected': false
      },
      {
        'index' : 4,
        'name' : "Hoth",
        'selected': false
      },
    ] 
  )
  const addFavorites = (name, index) => {
    actions.addFavorites(name)
    const obj = planets[index]
    obj.selected = !obj.selected
    const tmp = planets
    tmp[index] = obj
    setSelected (tmp)
    if(!obj.selected){
      actions.removeFavorites(name)
    }
  }

  const getInfo =  async (index) => {
    const response = await fetch (`https://www.swapi.tech/api/planets/${index}`) 
    const lands = await response.json()
    console.log(lands)
    setInfo (lands.result.properties)
  }
  return (
    <>
    
      <div className="card-group">
        { planets.map((c, index) => (
       
         <div className="card" key={c.index +10}>
         <img src={`https://starwars-visualguide.com/assets/img/planets/${c.index}.jpg`}/>
           <div className="card-body">
             <h5 className="card-title">{c.name}</h5>
             <button type="button" onClick={()=> getInfo(c.index)} className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#planetsModal">Detalles</button>
             <button type="button" className=  " btn btn-outline-danger border-0" onClick={()=> addFavorites(c.name, index)}>
                  <i className={c.selected ? "fa-solid fa-heart": "fa-regular fa-heart"}></i>
             </button>
           </div>
           </div> 
        ))}
    </div>
    <div class="modal fade" id="planetsModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">{info.name}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>
            Climate:{info.climate}
          </p>
          <p>
            Created: {info.surface_water}
          </p>
          <p>
            Diameter: {info.diameter}
          </p>
          <p>
            Gravity: {info.gravity}
          </p>
          <p>
            Orbital period: {info.orbital_period}
          </p>
          <p>
            Terrain: {info.terrain}
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
      </>
    );
  };

export default Planets;