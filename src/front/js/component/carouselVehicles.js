import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';
import { CarouselDefault } from "./carouselDefault";
import { CarouselMotos } from "./carouselMotos";
import { CarouselCars } from "./carouselCars";
import { CarouselPrice } from "./carouselPrice";
import { CarouselKm } from "./carouselKm";



export const CarouselVehicles = () => {
    
    defineElement(lottie.loadAnimation);
    const {store, actions} = useContext(Context)
    

    return (
      <div className="container mb-">
          <div className="row pb-4 my-4">

            
            <h2>Asequibles</h2>
        
                  <CarouselPrice />
           </div>
          
           <div className="row pb-4 my-4">
            <h2>Los más vistosos</h2>
           
                  <CarouselDefault />
            </div>


           <div className="row pb-4 my-4">
            <h2>Motos</h2>
           
                  <CarouselMotos />
            </div>


            <div className="row pb-4 my-4">
            <h2>De bajo kilometraje</h2>
         
                  <CarouselKm />
            </div>


           <div className="row pb-4 my-4">
            <h2>Coches</h2>
           
                  <CarouselCars />
            </div>





            </div>    
          );

        }