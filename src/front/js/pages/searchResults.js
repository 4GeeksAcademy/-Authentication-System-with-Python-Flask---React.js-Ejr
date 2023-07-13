import React, {useContext, useState, useEffect  } from "react";
import { Context, } from "../store/appContext";
import { ThemeContext } from "../layout";
import "../../styles/index.css";
import { Link } from "react-router-dom";
import "../../styles/filters.css";
import { CarouselDefault } from "../component/carouselDefault";





export const SearchResults = () => {




return (

<div className="container">
   
   
   <h1>
    Resultados de tu búsqueda por filtros
   </h1>
   <CarouselDefault />



</div>








)








}