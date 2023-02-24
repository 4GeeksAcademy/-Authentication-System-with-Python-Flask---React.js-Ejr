import React from "react";  
import { useState, useContext } from "react";
import { Context } from "../store/appContext";


const Characters = () =>{
    const[info, setInfo] = useState({"name":""}, {"heigth":""}, {"gender":""}, {"mass":""}, {"hair_color":""}, {"nskin_color":""}, {"birth_year":""})
    const{store, actions} = useContext(Context)
    const [characters, serSelected] = useState([
        {
            'index' : 1,
            'name' : "Luke Skywalker",
            'selected': false
          },
          {
            'index' : 5,
            'name' : "Leia Organa",
            'selected': false
          },
          {
            'index' : 3,
            'name' : "R2-D2",
            'selected': false
          },
          {
            'index' : 11,
            'name' : "Anakin Skywalker",
            'selected': false
          },

        ])

        const addFavorites = (name, index) => {
          actions.addFavorites(name)
          const obj = characters[index]
          obj.selected = !obj.selected
          const tmp = characters
          tmp[index] = obj
          setSelected (tmp)
          if(!obj.selected){
            actions.removeFavorites(name)
          }
        }

        const getInfo = async (index) => {
            const response = await fetch (`https://www.swapi.tech/api/people/${index}`)
            const people = await response.json()
            setInfo ( people.result.properties)
        }

        return(

            <>                   
     
            <div className="card-group">
              {characters.map((c, index) => (
             
               <div className="card" key={c.index}>
               <img src={`https://starwars-visualguide.com/assets/img/characters/${c.index}.jpg`}/>
                 <div className="card-body">
                   <h5 className="card-title">{c.name}</h5>
                   <button type="button" onClick={()=> getInfo(c.index)} className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">Detalles</button>
                   <button type="button" className=  " btn btn-outline-danger border-0"onClick={()=> addFavorites(c.name, index)} >
                         <i className={c.selected ? "fa-solid fa-heart": "fa-regular fa-heart"}></i>
                   </button>
                 </div>
                 </div> 
              ))}
          </div>
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">{info.name}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <p>
                  Height:{info.height}
                </p>
                <p>
                  Mass: {info.mass}
                </p>
                <p>
                  Hair color: {info.hair_color}
                </p>
                <p>
                  Skin color: {info.skin_color}
                </p>
                <p>
                  Birth year: {info.birth_year}
                </p>
                <p>
                 Gender: {info.gender}
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
        
        
        export default Characters;