import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";




export const Services = () => {
  const { store, actions } = useContext(Context);



  return (
    <div style={{ backgroundColor: '#264653', color: '#000' }}>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-3 g-4">
   
            <div className="col">
              <div className="card text-center border-dark m-3" style={{ width: "25rem" }}>
                <img src="https://plus.unsplash.com/premium_photo-1661443402703-a7e48f84ceec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" className="card-img-top" alt="..." style={{ width: "100%" }} />
                <div className="card-body ">
                  <h5 className="card-title">Full Exterior Detail</h5>
                  <p className="card-text">Your car is your pride and joy, so you want to keep it in top condition. In fact, we know most of you spend a lot of time detailing your vehicle. But there are some things that can't be done with a sponge or cloth. That's why we've developed a full exterior service for your vehicle!
                    We are probably not a good choice for you if you're seeking a quick and inexpensive way to have your car cleaned in Oregon. To deliver a higher standard of service and outcomes, we extend the wash procedure.
                    We refer to it as our Full exterior detail. We'll wash the car to get rid of ordinary filth, bird droppings, and dust using the right washing, drying, and strategies to prevent significant surface scratches</p>
                  <div className="card-footer ">
                    <a href="#" className="btn btn-primary mx-1">Book Now</a>
                  
                    <a href="#" className="btn btn-primary">Pricing</a>
                  </div>
                </div>
              </div>
            </div>
        
         
            <div className="col">
              <div className="card text-center border-dark m-3" style={{ width: "25rem" }}>
                <img src="https://plus.unsplash.com/premium_photo-1661757819896-b9230b0325cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" className="card-img-top" alt="..." />
                <div className="card-body ">
                  <h5 className="card-title">Full Interior Cleaning</h5>
                  <p className="card-text">It’s not enough to simply look good. You need a clean, fresh smell that helps create a positive driving experience. This involves deep-cleaning techniques that sanitize upholstery, carpets, and surfaces for an immaculate finish. Interior detailing to a high standard requires preparation, hard work, and a standardized process.
                    Interior car detailing in general will help your car look great and operate at the highest level. When you’re considering taking your car to have it detailed, think about what you’ll get in return. Not only will you be rewarded with a clean car interior that looks nice, but you’ll also be maintaining your car so that it continues to be in the best possible shape. </p>
                  <div className="card-footer">
                    <a href="#" className="btn btn-primary">Book Now</a>
                  </div>
                </div>
              </div>
            </div>
         
            <div className="col">
              <div className="card text-center border-dark m-3" style={{ width: "25rem" }}>
                <img src="https://img.freepik.com/foto-gratis/hombre-puliendo-interior-coche-servicio-coches_1303-26881.jpg?w=740&t=st=1685751175~exp=1685751775~hmac=d3e0dc091a2ce7eca1f200cb29a6504fdf539aea4ab36a95676c714b29292e7b" className="card-img-top" alt="..."/>
                <div className="card-body ">
                  <h5 className="card-title">Engine Cleaning</h5>
                  <p className="card-text">Engine cleaning is a task that needs to be done regularly. If you want to keep your car running smoothly and enjoy a long lifespan, it is important that you clean its engine bay regularly. The engine bay is where the most vital parts of your car are located and yet it is one of the most neglected areas when it comes to cleaning.
                    If you have ever wondered why this area gets so dirty, here’s why: Engine oil and other fluids leak out of these parts onto the ground where they collect dirt, dust, grime, and other debris. If these parts are not cleaned regularly then they can cause damage to other components in your car such as electrical connections which can lead to expensive repairs later on down the line.</p>
                  <div className="card-footer">
                    <a href="#" className="btn btn-primary">Book Now</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
        <div className="row row-cols-1 row-cols-md-3 g-4">
          <div className="col">
            <div className="card text-center border-dark m-3" style={{ width: "25rem" }}>
              <img src="https://img.freepik.com/foto-gratis/hombre-pulir-auto-garaje_1157-26065.jpg?w=740&t=st=1685751264~exp=1685751864~hmac=d9decc888fb38ff122df9c05caa5c06dc1a0086fc91131294cc8b0dea23f8c46" className="card-img-top" alt="..." />
              <div className="card-body ">
                <h5 className="card-title">Ceramic Coating</h5>
                <p className="card-text">Ceramic coating has become a popular option for car owners looking to protect their vehicle's paint and improve its appearance. This innovative solution promises to deliver long-lasting protection against the elements, making it an appealing option for car enthusiasts and daily drivers alike. In this article, we'll explore the benefits of ceramic coating, as well as some of the myths surrounding this technology</p>
                <div className="card-footer">
                  <a href="#" className="btn btn-primary">Book Now</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card text-center border-dark m-3" style={{ width: "25rem" }}>
              <img src="https://cdn.pixabay.com/photo/2016/11/18/23/04/cleaning-1837331_1280.jpg" className="card-img-top" alt="..." />
              <div className="card-body ">
                <h5 className="card-title">Paint Correction Services</h5>
                <p className="card-text">Paint correction is a great way to make your car look brand new, paint correction can help remove up to 70 - 75% of swirls and scratches.</p>
                <div className="card-footer">
                  <a href="#" className="btn btn-primary">Book Now</a>
                </div>
              </div>
            </div>
          </div>




        </div>
      </div>
    </div>
  );
};
