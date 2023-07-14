import React, {useContext, useState, useEffect  } from "react";
import { Context, } from "../store/appContext";
import { ThemeContext } from "../layout";
import "../../styles/index.css";
import "../../styles/filters.css";
import { CarouselDefault } from "../component/carouselDefault";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';





export const SearchResults = () => {

  defineElement(lottie.loadAnimation);
  const { store, actions } = useContext(Context);


    useEffect(() => {
    
        actions.getAllProducts()
    
      }, []) 



return (

<div className="container">
   
   
   <h1>
    Resultados de tu búsqueda por filtros
   </h1>
   <CarouselDefault />



</div>








)








}