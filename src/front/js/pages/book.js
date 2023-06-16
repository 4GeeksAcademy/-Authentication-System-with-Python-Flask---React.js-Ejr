import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import DateTimePicker from "react-datetime-picker";


import { useNavigate } from "react-router-dom";

export const Book = () => {

  const { store, actions } = useContext(Context);
  const services = store.services
  const vehicles = store.vehicle_types
  const [selectedVehicleType, setSelectedVehicleType] = useState(null)
  const navigate = useNavigate()
  const [value, onChange] = useState(new Date());

  useEffect(() => {
    if (!store.accessToken) {
      navigate("/login")
    }
    else {
      actions.fetchServices()
      actions.fetchVehicleTypes()
      actions.pagoMercadopago()
    }

  }, [])

  



  const handleSelectVehicleType = (vehicleType) => {
    setSelectedVehicleType(vehicleType);
  };
  const pagoMercadoPago = () => {
    window.location.replace(store?.mercadopago.init_point);
  };



  return(
    <>
    {/* <div > */}
      <div className="container" style={{ backgroundColor: '#264653', color: '#000' }}>
        <h1 className=" display-4 text-center py-2" >Our Services</h1>
        {
          !!store.accessToken ? <div className="accordion accordion-flush" id="accordionFlushExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingOne">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                  1° Pick the Size
                </button>
              </h2>
              <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">
                  <div className="row align-items-center">
                    {vehicles ? (vehicles.map((vehicle, index) => (
                      <div className="col" key={index}>
                        <div className="card text-center card border-dark mb-3" style={{ width: "25rem" }}>
                          <img src={vehicle.picture} className="card-img-top" alt="..." />
                          <div className="card-body " style={{ backgroundColor: '#40768C' }}>
                            <h5 className="card-title">{vehicle.name}</h5>
                            <ul className="list-group list-group-flush">
                             
                              <li className="list-group-item" style={{ backgroundColor: '#40768C' }}>What is about?</li>
                            </ul>
                            <button className="btn btn-dark my-2" onClick={() => handleSelectVehicleType(index + 1)}>Select</button>
                          </div>
                        </div>
                      </div>
                    ))) : (<p>Loading vehicles...</p>)}
                   
                  </div>
                </div>
              </div>
            </div>
            <br></br>
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingTwo">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                  2° Pick the Services
                </button>
              </h2>
              <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body ">
                  <div className="card-group">
                    <div className="overflow-auto d-flex">
                      {services.map((element, index) => (
                        element.vehicle_type == selectedVehicleType && (
                          <div className="card text-center card border-dark   m-2" style={{ width: "35rem" }} key={index}>
                            <img src={element.picture} className="card-img-top" alt="..." />
                            <div className="card-body " style={{ backgroundColor: '#40768C', height: "22rem" }}>
                              <h5 className="card-title" style={{ height: "7rem" }}>{element.name}</h5>
                              <ul className="list-group list-group-flush" style={{ height: "7rem" }}>
                                <li className="list-group-item" style={{ backgroundColor: '#40768C' }}>Price:  {element.price} USD</li>
                               
                              </ul>
                              <div className="card-footer" style={{ height: "5rem" }}>
                              <button onClick={()=>actions.addFavorites(element.name, element.price, element.id)} href="#" className="btn btn-dark my-2">Add to Cart
                              </button>
                              </div>
                            </div>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br></br>
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingThree">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                3° Save the Date
              </button>
            </h2>
            <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
              <div className="accordion-body">
              <DateTimePicker onChange={onChange} value={value}  />
              </div>
            </div>
          </div>
          <br></br>
          <button className="btn btn-dark" onClick={pagoMercadoPago}>Pagar
          </button>
          </div>
            :
            <div className="alert alert-warning" role="alert">
              Signup or login before booking
            </div>
        }
      </div>
   
 
    </>
  );
};
