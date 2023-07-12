import React, {useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { ThemeContext } from "../layout";
import { useNavigate } from "react-router-dom";
import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';



export const CarouselDefault = () => {
  defineElement(lottie.loadAnimation);
  const { store, actions } = useContext(Context);
  const carImage = "https://images.coches.com/_vn_/kia/Sportage/c399cf1d98a95d24f8e8715dd0b13fb2.jpg?p=cc_vn_high"
    const navigate = useNavigate()

    const token = store.token

  useEffect(() => {
    
    actions.getProducts()
    actions.getUser()
    actions.getUsers()
    
    
  }, []) 



  const selectFavoriteVehicle = (product_id) => {
    actions.postFavorite(product_id);
  }


    return (
    store.products ? 
    <div className="d-flex overflow-auto my-5">
      {store.products.map((vehicle, index) => {
             
              
      return (
          <div className="col-12 col-md-4" key={index}>
            <div className="card" style={{width: "18rem"}}>
            <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
              <img src={carImage} className="card-img-top imgCarousel" alt="..."/>
              </div>
              <div className="flip-card-back">
                <Link to="/login" style={{ color: 'white', textDecoration: 'none' }} className="link-hover">
                <h3 className="pt-2">{vehicle.name}</h3> 
                </Link>
                <p>Matriculación: {vehicle.year}</p> 
                <p>Estado: {vehicle.state}</p>
                <p>{vehicle.km} km</p>
                <p>{vehicle.fuel}</p>
              </div>
            </div>
          </div>
              <div className="d-flex justify-content-end m-2">
                <i className="fa-solid fa-star star" style={{"color": "#bbc615"}}></i>
                <i className="fa-solid fa-star star" style={{"color": "#bbc615"}}></i>
                <i className="fa-solid fa-star star" style={{"color": "#bbc615"}}></i>
              </div>
              <div className="card-body d-flex justify-content-between">
                <div>
                  <Link to="/login" style={{ color: 'black', textDecoration: 'none' }} className="link-hover">
                    <h5 className="card-title justify-content-start d-flex" id="vehicleCardTittle">
                      <strong>{vehicle.name}</strong>
                    </h5>
                  </Link>
                  <h5 className="card-title justify-content-start d-flex">20.000€</h5>
                  <p>
                  Vendido por {""}
             
                <Link
                  to={!token ? "/login" : "/profile"}
                  style={{ color: 'black', textDecoration: 'none' }}
                  className="link-hover"
                >
                  {vehicle.user_full_name}
                </Link>
            
            </p>
            
                      </div>

                      <div className="d-flex justify-content-end">                
                     
                      <Link
                        id="heartCard"
                        to="/profile/favorites"
                        onClick={() => selectFavoriteVehicle(vehicle.id)}
                        >
                        <script src="https://cdn.lordicon.com/bhenfmcm.js"></script>
                        <lord-icon
                            src="https://cdn.lordicon.com/rjzlnunf.json"
                            trigger="hover"
                            colors="primary:#1663c7,secondary:#16a9c7"
                            stroke="80"
                            style={{"width":"50px", "height":"30px"}}>
                        </lord-icon>
                      </Link>
                      </div>
                    </div>

                  </div>
                  
                </div>


              )

          })
            
     
              }      

            </div>
            :
            <h2>Aún no tenemos productos en venta</h2>
          
     )
          
    
   

        }