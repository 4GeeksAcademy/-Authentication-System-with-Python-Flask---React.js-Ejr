import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";




export const Book = () => {

  const { store, actions } = useContext(Context);
  const services = store.services
  const vehicles = store.vehicles
  // const [size, setSize] = useState("")
  useEffect(() => {
    actions.fetchServices()
    actions.fetchVehicleTypes()
  }, [])



  return (
    <div style={{ backgroundColor: '#264653', color: '#000' }}>
      <div className="container">
        <h1 className=" display-4 text-center py-2" >  Our Services</h1>
        <div class="accordion accordion-flush" id="accordionFlushExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingOne">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                1° Pick the Size
              </button>
            </h2>
            <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
              <div className="accordion-body">
                <div className="row align-items-center" >
                  <div className="col" >
                    <div className="card text-center card border-dark mb-3" style={{ width: "35rem" }}>
                      <img src="https://img.freepik.com/fotos-premium/coche-deportivo-compacto-family-sedan-3d-ilustracion_101266-19260.jpg?w=900" className="card-img-top" alt="..." />
                      <div className="card-body " style={{ backgroundColor: '#40768C' }}>
                        <h5 className="card-title" >Sedan</h5>
                        <ul className="list-group list-group-flush" >
                          <li className="list-group-item" style={{ backgroundColor: '#40768C' }}>Price 100 USD</li>
                          <li className="list-group-item" style={{ backgroundColor: '#40768C' }}>What is about?</li>
                        </ul>
                        <button className="btn btn-dark my-2" onClick={() => { actions.addServices(item.name) }}>Select</button>
                      </div>
                    </div>
                  </div>
                  <div className="col" >
                    <div className="card text-center card border-dark mb-3" style={{ width: "35rem" }}>
                      <img src="https://img.freepik.com/fotos-premium/coche-camioneta-azul-sobre-fondo-blanco-representacion-3d_101266-9327.jpg?w=900" className="card-img-top" alt="..." />
                      <div className="card-body " style={{ backgroundColor: '#40768C' }}>
                        <h5 className="card-title" >Medium SUV/Medium Truck</h5>
                        <ul className="list-group list-group-flush" >
                          <li className="list-group-item" style={{ backgroundColor: '#40768C' }}>Price 150 USD</li>
                          <li className="list-group-item" style={{ backgroundColor: '#40768C' }}>What is about?</li>
                        </ul>
                        <button className="btn btn-dark my-2" onClick={() => { actions.addServices(item.name) }}>Select</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br></br>
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingTwo">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                2° Pick the Services
              </button>
            </h2>
            <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
              <div className="accordion-body ">
                
                  {/* <div className="row align-items-center " > */}
                    {/* <div className="col" > */}
                    <div className="card-group">
                    <div className="overflow-auto d-flex">
                      <div className="card text-center card border-dark   m-2" style={{ width: "35rem" }}>
                        <img src="https://img.freepik.com/foto-gratis/hermoso-coche-servicio-lavado_23-2149212221.jpg?w=740&t=st=1686075276~exp=1686075876~hmac=3d03bcfdf61ec295b42afde6c9cd4cfe3efe2341e0f841134f7dd60d29b0b2bb" className="card-img-top" alt="..." />
                        <div className="card-body " style={{ backgroundColor: '#40768C' }}>
                          <h5 className="card-title" style={{ height: "4rem" }}>Full Exterior Detail</h5>
                          <ul className="list-group list-group-flush" >
                            <li className="list-group-item" style={{ backgroundColor: '#40768C' }}>Price 100 USD</li>
                            <li className="list-group-item" style={{ backgroundColor: '#40768C' }}>What is about?</li>
                          </ul>
                          <div class="card-footer">
                          <button className="btn btn-dark my-2">Add to Cart</button>
                          </div>
                        </div>
                      </div>
                    {/* </div> */}
                    {/* <div className="col" > */}
                      <div className="card text-center card border-dark m-2" style={{ width: "35rem" }}>
                        <img src="https://plus.unsplash.com/premium_photo-1661757819896-b9230b0325cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" className="card-img-top" alt="..." />
                        <div className="card-body " style={{ backgroundColor: '#40768C' }}>
                          <h5 className="card-title" style={{ height: "4rem" }} >Full Interior Cleaning</h5>
                          <ul className="list-group list-group-flush" >
                            <li className="list-group-item" style={{ backgroundColor: '#40768C' }}>Price 150 USD</li>
                            <li className="list-group-item" style={{ backgroundColor: '#40768C' }}>What is about?</li>
                          </ul>
                          <div class="card-footer">
                          <button className="btn btn-dark my-2" onClick={() => { actions.addServices(item.name) }}>Add to Cart</button>
                          </div>
                        </div>
                      </div>
                    {/* </div> */}
                    {/* <div className="col" > */}
                      <div className="card text-center card border-dark m-2" style={{ width: "35rem" }}>
                        <img src="https://img.freepik.com/foto-gratis/hombre-puliendo-interior-coche-servicio-coches_1303-26881.jpg?w=740&t=st=1685751175~exp=1685751775~hmac=d3e0dc091a2ce7eca1f200cb29a6504fdf539aea4ab36a95676c714b29292e7b" className="card-img-top" alt="..." />
                        <div className="card-body " style={{ backgroundColor: '#40768C' }}>
                          <h5 className="card-title" style={{ height: "4rem" }} >Engine Cleaning</h5>
                          <ul className="list-group list-group-flush" >
                            <li className="list-group-item" style={{ backgroundColor: '#40768C' }}>Price 100 USD</li>
                            <li className="list-group-item" style={{ backgroundColor: '#40768C' }}>What is about?</li>
                          </ul>
                          <div class="card-footer">
                          <button className="btn btn-dark my-2">Add to Cart</button>
                          </div>
                        </div>
                      </div>
                    {/* </div> */}
                    {/* <div className="col" > */}
                      <div className="card text-center card border-dark m-2" style={{ width: "35rem" }}>
                        <img src="https://img.freepik.com/foto-gratis/hombre-pulir-auto-garaje_1157-26065.jpg?w=740&t=st=1685751264~exp=1685751864~hmac=d9decc888fb38ff122df9c05caa5c06dc1a0086fc91131294cc8b0dea23f8c46" className="card-img-top" alt="..." />
                        <div className="card-body " style={{ backgroundColor: '#40768C' }}>
                          <h5 className="card-title" style={{ height: "4rem" }} >Ceramic Coating</h5>
                          <ul className="list-group list-group-flush" >
                            <li className="list-group-item" style={{ backgroundColor: '#40768C' }}>Price 100 USD</li>
                            <li className="list-group-item" style={{ backgroundColor: '#40768C' }}>What is about?</li>
                          </ul>
                          <div class="card-footer">
                          <button className="btn btn-dark my-2">Add to Cart</button>
                          </div>
                        </div>
                      </div>
                    {/* </div> */}
                    {/* <div className="col" > */}
                      <div className="card text-center card border-dark m-2" style={{ width: "35rem" }}>
                        <img src="https://cdn.pixabay.com/photo/2016/11/18/23/04/cleaning-1837331_1280.jpg" className="card-img-top" alt="..." />
                        <div className="card-body " style={{ backgroundColor: '#40768C' }}>
                          <h5 className="card-title" style={{ height: "4rem" }}>Paint Correction Services</h5>
                          <ul className="list-group list-group-flush" >
                            <li className="list-group-item" style={{ backgroundColor: '#40768C' }}>Price 100 USD</li>
                            <li className="list-group-item" style={{ backgroundColor: '#40768C' }}>What is about?</li>
                          </ul>
                          <div class="card-footer">
                          <button className="btn btn-dark my-2">Add to Cart</button>
                          </div>
                        </div>
                      </div>
                    {/* </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br></br>
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingThree">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                3° Save the Date
              </button>
            </h2>
            <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
              <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
            </div>
          </div>
          </div>
        {/* </div> */}
        
        <br></br>




      </div>
    </div>

  );
};
