import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/styles.css"
export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div>
    <div className="text-center d-flex custom-home">
      <div id="carouselExampleControls" className="carousel slide pt-4" data-bs-ride="carousel">
        <div className="carousel-inner container" style={{ width: "60%", height: "600px", margin: "0 auto" }}>
          <div className="carousel-item active">
            <img src="https://img.freepik.com/foto-gratis/hombre-lavando-su-auto-garaje_1157-26072.jpg?w=1380&t=st=1686345106~exp=1686345706~hmac=60b081dbbfb91c247e1a913d9d7e38f57107d88f890ecb2ccc8b0ef6df099b8c" className="d-block w-30" alt="..." style={{ width: "100%", height: "100%", margin: "0 auto" }} />
          </div>
          <div className="carousel-item">
            <img src="https://img.freepik.com/fotos-premium/trabajador-lavado-coche-rojo-esponja-tunel-lavado_179755-10792.jpg?w=1380" className="d-block w-30" alt="..." style={{ width: "100%", height: "100%", margin: "0 auto" }} />
          </div>
          <div className="carousel-item">
            <img src="https://img.freepik.com/fotos-premium/hombre-lavando-automovil-autoservicio-lavado-autos-lavadora-vehiculos-alta-presion-rocia-espuma_177415-8.jpg?w=1380" className="d-block w-30" alt="..." style={{ width: "100%", height: "100%", margin: "0 auto" }} />
          </div>
          <div className="carousel-item">
            <img src="https://img.freepik.com/fotos-premium/limpieza-automovil-detalles-automovil-tienda-cuidado-automovil_41043-2766.jpg?w=1380" className="d-block w-30" alt="..." style={{ width: "100%", height: "100%", margin: "0 auto" }} />
          </div>
          <div className="carousel-item">
            <img src="https://img.freepik.com/foto-gratis/cerrar-proceso-cuidado-automovil_23-2149193628.jpg?w=1380&t=st=1686346248~exp=1686346848~hmac=318635960e0dfbaff63216ec624c08ece27f5a5e6a8230a9ca366082bc46d56c" className="d-block w-30" alt="..." style={{ width: "100%", height: "100%", margin: "0 auto" }} />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>


      <div className="card custom-home pt-5 border-0" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">Now featuring StarWash</h5>
          <img src="https://plus.unsplash.com/premium_photo-1661443447441-1fd90ea3eca5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" className="card-img-top" alt="..." />
          <p className="card-text">By using our services, you will extend the lifespan of your car's paint, save time, and optimize your time while we wash your car. And our prices are on the crazy side of the Force.</p>
          <Link to="/services"><button type="button" className="rounded " style={{ backgroundColor: '#F4A261', color: '#000', padding: '18px 32px', borderRadius: '6px', boxShadow: '0 6px 0 black' }}>Services</button></Link>
        </div>
      </div>
    </div>
     
    <div className="d-flex justify-content-center" style={{ backgroundColor: "#264653"}}>
      <div className="card col-3 border-0 d-flex flex-column align-items-center" style={{ backgroundColor: "#264653"}}>
        <img src="https://images.squarespace-cdn.com/content/v1/632cad1bcd38e003eb2d978e/b84c2375-f1ad-4dd1-9b62-fba66e30c8a5/text-message+icon.png?format=300w" style={{ width: "30%" }} className="card-img-top justify-content-center" alt="..." />
        <div className="card-body">
        <h5 className="card-title d-flex flex-column align-items-center">Step #1</h5>
          <p className="card-text">Click the “Book Now” button, then select a date/time, and lastly fill out the customer intake information. That’s it!</p>
        </div>
      </div>


      <div className="card col-3 border-0 d-flex flex-column align-items-center" style={{ backgroundColor: "#264653"}}>
        <img src="https://images.squarespace-cdn.com/content/v1/632cad1bcd38e003eb2d978e/482bccab-e622-4dbd-85c5-4656c01a4135/car+wash+icon.png?format=300w" style={{ width: "30%" }} className="card-img-top justify-content-center" alt="..." />
        <div className="card-body">
        <h5 className="card-title d-flex flex-column align-items-center">Step #2</h5>
          <p className="card-text">We come to your home or place of business with all the tools and detail! All we ask is for a water spigot and an electrical outlet.</p>
        </div>
      </div>


      <div className="card col-3 border-0 d-flex flex-column align-items-center" style={{ backgroundColor: "#264653"}}>
        <img src="https://images.squarespace-cdn.com/content/v1/632cad1bcd38e003eb2d978e/e778f883-ad94-4b56-8ff4-78e89a939ec1/relax+icon+.png?format=300w" style={{ width: "30%" }} className="card-img-top justify-content-center" alt="..." />
        <div className="card-body">
        <h5 className="card-title d-flex flex-column align-items-center">Step #3</h5>
          <p className="card-text">Go on about your day and in a matter of few hours, your vehicle will be set to factory reset!</p>
        </div>
      </div>

      </div>
    </div>

  );
};

