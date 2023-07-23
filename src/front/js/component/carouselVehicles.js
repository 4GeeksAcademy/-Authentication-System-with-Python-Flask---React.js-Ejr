import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';
import { CarouselDefault } from "./carouselDefault";



export const CarouselVehicles = () => {
    
    defineElement(lottie.loadAnimation);
    const {store, actions} = useContext(Context)
    

    return (
      <div className="container mb-">
          <div className="row pb-4 my-4">
            <h2>Asequibles</h2>
            <hr className="mb-4"></hr>
                  <CarouselDefault />
           </div>
          
           <div className="row pb-4 my-4">
            <h2>Destacados</h2>
            <hr className="mb-4"></hr>
                  <CarouselDefault />
            </div>


           <div className="row pb-4 my-4">
            <h2>Los Más Mirados</h2>
            <hr className="mb-4"></hr>
                  <CarouselDefault />
            </div>





            </div>    
          );

        }