import React, {useContext} from "react";
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
    
    return (
    
    <div className="d-flex overflow-auto my-5">
            
                <div className="col-12 col-md-4">
                  <div className="card" style={{width: "18rem"}}>
                  <div className="flip-card">
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                    <img src={carImage} className="card-img-top imgCarousel" alt="..."/>
                    </div>
                    <div className="flip-card-back">
                      <Link to="/login" style={{ color: 'white', textDecoration: 'none' }} className="link-hover">
                      <h3 className="pt-2">Seat Ibiza</h3> 
                      </Link>
                      <p>Matriculación: 2017</p> 
                      <p>Cambio: Manual</p>
                      <p>120.000 km</p>
                      <p>Ubicación: Córdoba</p>
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
                        <h5 className="card-title justify-content-start d-flex" id="vehicleCardTittle">Coche fantástico</h5>
                        </Link>
                        <h5 className="card-title justify-content-start d-flex">20.000€</h5>
                        <p>
                          Vendido por {""}
                          <Link  to={!token ? "/login" : "/profile"} style={{ color: 'black', textDecoration: 'none' }} className="link-hover" >
                            Alguien
                          </Link>
                        </p>
                      </div>

                      <div className="d-flex justify-content-end">                
                     
                      <Link
                        id="heartCard"
                        to="/profile"
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
                {
  /* Segundo coche de ejemplo */
}
           <div className="col-12 col-md-4">
                  <div className="card" style={{width: "18rem"}}>
                  <div className="flip-card">
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                    <img src={carImage} className="card-img-top" alt="..."/>
                    </div>
                    <div className="flip-card-back">
                      <Link to="/login" style={{ color: 'white', textDecoration: 'none' }} className="link-hover">
                      <h3 className="pt-2">Peugeot 507</h3> 
                      </Link>
                      <p>Matriculación: 2020</p> 
                      <p>Cambio: Automático</p>
                      <p>180.000 km</p>
                      <p>Ubicación: Migard</p>
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
                          <h5 className="card-title justify-content-start d-flex" id="vehicleCardTittle">
                          <Link to="/login" style={{ color: 'black', textDecoration: 'none' }}>
                            Coche fantástico
                          </Link> 
                          </h5>
                        <h5 className="card-title justify-content-start d-flex">20.000€</h5>
                        <p>
                          Vendido por {""}
                          <Link  to={!token ? "/login" : "/profile"} style={{ color: 'black', textDecoration: 'none' }} className="link-hover" >
                            Alguien
                          </Link>
                        </p>
                      </div>

                      <div className="d-flex justify-content-end">                
                     
                      <Link
                        id="heartCard"
                        to="/profile"
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


                <div className="col-12 col-md-4">
                  <div className="card" style={{width: "18rem"}}>
                  <div className="flip-card">
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                    <img src={carImage} className="card-img-top" alt="..."/>
                    </div>
                    <div className="flip-card-back">
                      <Link to="/login" style={{ color: 'white', textDecoration: 'none' }} className="link-hover">
                      <h3 className="pt-2">Peugeot 507</h3> 
                      </Link>
                      <p>Matriculación: 2020</p> 
                      <p>Cambio: Automático</p>
                      <p>180.000 km</p>
                      <p>Ubicación: Migard</p>
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
                          <h5 className="card-title justify-content-start d-flex" id="vehicleCardTittle">
                          <Link to="/login" style={{ color: 'black', textDecoration: 'none' }}>
                            Coche fantástico
                          </Link> 
                          </h5>
                        <h5 className="card-title justify-content-start d-flex">20.000€</h5>
                        <p>
                          Vendido por {""}
                          <Link  to={!token ? "/login" : "/profile"} style={{ color: 'black', textDecoration: 'none' }} className="link-hover" >
                            Alguien
                          </Link>
                        </p>
                      </div>

                      <div className="d-flex justify-content-end">                
                     
                      <Link
                        id="heartCard"
                        to="/profile"
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
                <div className="col-12 col-md-4">
                  <div className="card" style={{width: "18rem"}}>
                  <div className="flip-card">
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                    <img src={carImage} className="card-img-top" alt="..."/>
                    </div>
                    <div className="flip-card-back">
                      <Link to="/login" style={{ color: 'white', textDecoration: 'none' }} className="link-hover">
                      <h3 className="pt-2">Peugeot 507</h3> 
                      </Link>
                      <p>Matriculación: 2020</p> 
                      <p>Cambio: Automático</p>
                      <p>180.000 km</p>
                      <p>Ubicación: Migard</p>
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
                          <h5 className="card-title justify-content-start d-flex" id="vehicleCardTittle">
                          <Link to="/login" style={{ color: 'black', textDecoration: 'none' }}>
                            Coche fantástico
                          </Link> 
                          </h5>
                        <h5 className="card-title justify-content-start d-flex">20.000€</h5>
                        <p>
                          Vendido por {""}
                          <Link  to={!token ? "/login" : "/profile"} style={{ color: 'black', textDecoration: 'none' }} className="link-hover" >
                            Alguien
                          </Link>
                        </p>
                      </div>

                      <div className="d-flex justify-content-end">                
                     
                      <Link
                        id="heartCard"
                        to="/profile"
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
                <div className="col-12 col-md-4">
                  <div className="card" style={{width: "18rem"}}>
                  <div className="flip-card">
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                    <img src={carImage} className="card-img-top" alt="..."/>
                    </div>
                    <div className="flip-card-back">
                      <Link to="/login" style={{ color: 'white', textDecoration: 'none' }} className="link-hover">
                      <h3 className="pt-2">Peugeot 507</h3> 
                      </Link>
                      <p>Matriculación: 2020</p> 
                      <p>Cambio: Automático</p>
                      <p>180.000 km</p>
                      <p>Ubicación: Migard</p>
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
                          <h5 className="card-title justify-content-start d-flex" id="vehicleCardTittle">
                          <Link to="/login" style={{ color: 'black', textDecoration: 'none' }}>
                            Coche fantástico
                          </Link> 
                          </h5>
                        <h5 className="card-title justify-content-start d-flex">20.000€</h5>
                      </div>

                      <div className="d-flex justify-content-end">                
                     
                      <Link
                        id="heartCard"
                        to="/profile"
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
                <div className="col-12 col-md-4">
                  <div className="card" style={{width: "18rem"}}>
                  <div className="flip-card">
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                    <img src={carImage} className="card-img-top" alt="..."/>
                    </div>
                    <div className="flip-card-back">
                      <Link to="/login" style={{ color: 'white', textDecoration: 'none' }} className="link-hover">
                      <h3 className="pt-2">Peugeot 507</h3> 
                      </Link>
                      <p>Matriculación: 2020</p> 
                      <p>Cambio: Automático</p>
                      <p>180.000 km</p>
                      <p>Ubicación: Migard</p>
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
                          <h5 className="card-title justify-content-start d-flex" id="vehicleCardTittle">
                          <Link to="/login" style={{ color: 'black', textDecoration: 'none' }}>
                            Coche fantástico
                          </Link> 
                          </h5>
                        <h5 className="card-title justify-content-start d-flex">20.000€</h5>
                      </div>

                      <div className="d-flex justify-content-end">                
                     
                      <Link
                        id="heartCard"
                        to="/profile"
                      >
                        <script src="https://cdn.lordicon.com/bhenfmcm.js"></script>
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

            </div>
          
     )
          
    
   

        }