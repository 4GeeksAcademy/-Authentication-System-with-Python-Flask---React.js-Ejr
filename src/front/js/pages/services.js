import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";




export const Services = () => {
  const { store, actions } = useContext(Context);
  const services = store.services

  useEffect(() => {
    actions.fetchServices()
  }, [])



  return (
    <div style={{ backgroundColor: '#264653', color: '#000' }}>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-3 g-4">

          {services.map((element, index) =>(
            <div className="col" key={index}>

            <div className="card text-center border-dark m-3" style={{ width: "25rem" }}>
              <img src="https://img.freepik.com/foto-gratis/hermoso-coche-servicio-lavado_23-2149212221.jpg?w=740&t=st=1686075276~exp=1686075876~hmac=3d03bcfdf61ec295b42afde6c9cd4cfe3efe2341e0f841134f7dd60d29b0b2bb" className="card-img-top" alt="..." style={{ width: "100%" }} />
              <div className="card-body " style={{ backgroundColor: '#40768C' }}>
                <h5 className="card-title">{element.name}</h5>
                <p className="card-text" style={{ height: "15rem" }}>Want to learn more? click Learn More to see more details! <br/>Price: ${element.price} USD</p>
                <button type="button" className="btn btn-dark " data-bs-toggle="modal" data-bs-target="#exampleModal">
                  Learn More
                </button>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog  modal-dialog-scrollable">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Full Exterior Detail</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        <p>{element.description}</p>
                        <p>{element.price}</p>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-footer ">
                  <Link to="/Book" className="btn btn-dark">Book Now</Link>
                </div>
              </div>
            </div>

          </div>
          ) )}
          


          {/* <div className="col">
            <div className="card text-center border-dark m-3" style={{ width: "25rem" }}>
              <img src="https://plus.unsplash.com/premium_photo-1661757819896-b9230b0325cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" className="card-img-top" alt="..." />
              <div className="card-body " style={{ backgroundColor: '#40768C' }}>
                <h5 className="card-title">Full Interior Cleaning</h5>
                <p className="card-text" style={{ height: "15rem" }}>It’s not enough to simply look good. You need a clean, fresh smell that helps create a positive driving experience. This involves deep-cleaning techniques that sanitize upholstery, carpets, and surfaces for an immaculate finish.</p>
                <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                  Learn More
                </button>
                <div class="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                  <div class="modal-dialog  modal-dialog-scrollable">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel2">Full Interior Cleaning</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <p>It’s not enough to simply look good. You need a clean, fresh smell that helps create a positive driving experience. This involves deep-cleaning techniques that sanitize upholstery, carpets, and surfaces for an immaculate finish.</p>
                        Interior detailing to a high standard requires preparation, hard work, and a standardized process.
                        Interior car detailing in general will help your car look great and operate at the highest level. When you’re considering taking your car to have it detailed, think about what you’ll get in return. Not only will you be rewarded with a clean car interior that looks nice, but you’ll also be maintaining your car so that it continues to be in the best possible shape.
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-footer">
                  <Link to="/Book" className="btn btn-dark">Book Now</Link>
                </div>
              </div>
            </div>
          </div> */}

          {/* <div className="col">

            <div className="card text-center border-dark m-3" style={{ width: "25rem" }}>
              <img src="https://img.freepik.com/foto-gratis/hombre-puliendo-interior-coche-servicio-coches_1303-26881.jpg?w=740&t=st=1685751175~exp=1685751775~hmac=d3e0dc091a2ce7eca1f200cb29a6504fdf539aea4ab36a95676c714b29292e7b" className="card-img-top" alt="..." />
              <div className="card-body " style={{ backgroundColor: '#40768C' }}>
                <h5 className="card-title">Engine Cleaning</h5>
                <p className="card-text " style={{ height: "15rem" }}>Engine cleaning is a task that needs to be done regularly. If you want to keep your car running smoothly and enjoy a long lifespan, it is important that you clean its engine bay regularly. </p>
                <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal3">
                  Learn More
                </button>
                <div class="modal fade" id="exampleModal3" tabindex="-1" aria-labelledby="exampleModalLabel3" aria-hidden="true">
                  <div class="modal-dialog  modal-dialog-scrollable">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel3">Engine Cleaning</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <p>
                          Engine cleaning is a task that needs to be done regularly. If you want to keep your car running smoothly and enjoy a long lifespan, it is important that you clean its engine bay regularly. The engine bay is where the most vital parts of your car are located and yet it is one of the most neglected areas when it comes to cleaning.
                          If you have ever wondered why this area gets so dirty, here’s why: Engine oil and other fluids leak out of these parts onto the ground where they collect dirt, dust, grime, and other debris. If these parts are not cleaned regularly then they can cause damage to other components in your car such as electrical connections which can lead to expensive repairs later on down the line.
                        </p>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-footer">
                  <Link to="/Book" className="btn btn-dark">Book Now</Link>
                </div>
              </div>
            </div>
          </div> */}

        </div>

        {/* <div className="row row-cols-1 row-cols-md-3 g-4">
          <div className="col">
            <div className="card text-center border-dark m-3" style={{ width: "25rem" }}>
              <img src="https://img.freepik.com/foto-gratis/hombre-pulir-auto-garaje_1157-26065.jpg?w=740&t=st=1685751264~exp=1685751864~hmac=d9decc888fb38ff122df9c05caa5c06dc1a0086fc91131294cc8b0dea23f8c46" className="card-img-top" alt="..." />
              <div className="card-body " style={{ backgroundColor: '#40768C' }}>
                <h5 className="card-title">Ceramic Coating</h5>
                <p className="card-text" style={{ height: "15rem" }}>Ceramic coating has become a popular option for car owners looking to protect their vehicle's paint and improve its appearance.</p>
                  <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal4">
                    Learn More
                  </button>
                  <div class="modal fade" id="exampleModal4" tabindex="-1" aria-labelledby="exampleModalLabel4" aria-hidden="true">
                  <div class="modal-dialog  modal-dialog-scrollable">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel4">Ceramic Coating</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <p>
                        Ceramic coating has become a popular option for car owners looking to protect their vehicle's paint and improve its appearance.This innovative solution promises to deliver long-lasting protection against the elements, making it an appealing option for car enthusiasts and daily drivers alike. In this article, we'll explore the benefits of ceramic coating, as well as some of the myths surrounding this technology
                        </p>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                      </div>
                    </div>
                  </div>
                </div>

                 
                <div className="card-footer">
                  <Link to="/Book" className="btn btn-dark">Book Now</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card text-center border-dark m-3" style={{ width: "25rem" }}>
              <img src="https://cdn.pixabay.com/photo/2016/11/18/23/04/cleaning-1837331_1280.jpg" className="card-img-top" alt="..." />
              <div className="card-body " style={{ backgroundColor: '#40768C' }}>
                <h5 className="card-title">Paint Correction Services</h5>
                <p className="card-text" style={{ height: "15rem" }}>Paint correction is a great way to make your car look brand new, paint correction can help remove up to 70 - 75% of swirls and scratches.</p>
                <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  Learn More
                </button>
                <div className="card-footer">
                  <Link to="/Book" className="btn btn-dark">Book Now</Link>
                </div>
              </div>
            </div>
          </div>




        </div> */}
      </div>
    </div>
  );
};
