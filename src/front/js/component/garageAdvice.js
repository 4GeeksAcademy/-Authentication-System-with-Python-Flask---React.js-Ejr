import React, {useContext, useState, useEffect} from "react";
import { Context } from "../store/appContext";
import { ThemeContext } from "../layout";
import "../../styles/index.css";
import { Link } from "react-router-dom";



export const GarageAdvice = () => {
    
    const {store, actions} = useContext(Context)
    const garageImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFOZ2L1ab7nVYrVxuxVUXMBSokaf-6FWNvug&usqp=CAU"
    const [isVisible, setIsVisible] = useState(false);
    
    const toolImage = () => {
        return(
            <>
            <script className="toolIcon justify-content-end d-none d-sm-flex d-sm-none d-md-block" src="https://cdn.lordicon.com/bhenfmcm.js"></script>
                        <lord-icon
                            className="toolIcon justify-content-end d-none d-sm-flex d-sm-none d-md-block"
                            src="https://cdn.lordicon.com/sbiheqdr.json"
                            trigger="hover"
                            colors="primary:#ffffff,secondary:#3080e8"
                            stroke="90"
                            style={{"width":"100px", "height":"100px"}}>
                        </lord-icon>
            </>
        )
    }









    return (
    
      <div className="container mt-5 my-3 d-md-flex justify-content-evenly transitionEffect" >


            <div className="container mx-2 mb-4 col-5 container-garage">

                    <img src={garageImage} className="card-img garageImageLanding d-none d-sm-block d-sm-none d-md-block" alt="..."/>
                    
                    
                    <h5 className="text-end text-white mt-4 pt-3 pe-3">
                        <Link to="/garage" className="titleAdviceGarage">
                            Consulta nuestros Talleres
                        </Link> 
                    </h5>            
                    <p className="text-end text-white pt-2 px-3 textGarageLeft d-md-flex" style={{"font-size": "larger"}}> 
                    Tasamos vuestros vehículos como garantía su estado. Las ventas serán más rápidas y las compras serán más seguras así.
                    </p>
                   
                 
                    
                
                  
                        <Link to="profile" className="btn-plus btn-mas m-2 float-end buttonGarage  ">
                        <script src="https://cdn.lordicon.com/bhenfmcm.js"></script>
                        <lord-icon
                            src="https://cdn.lordicon.com/mecwbjnp.json"
                            trigger="hover"
                            colors="primary:#b4b4b4,secondary:#ffffff"
                            stroke="80"
                            style={{"width":"250px","height":"250px"}}>
                        </lord-icon>
                        </Link>
               
                   
               </div>
         
{
    // DIV DE LLAVE INGLESA
}

            <div className=" mx-2 mb-4 col-5 container-garage ">

          
                    <h5 className="text-start text-white pt-3 px-3 mx-3">
                        <Link to="/login" className="titleAdviceGarage">
                            ¿Eres un Taller?
                        </Link>
                    </h5>   
               
                
                        <p className="text-start text-white pt-2 px-3 m-3 textGarageRight mt-5" style={{"font-size": "larger"}}> 
                         Date de alta y ayuda a vendedores y compradores a certificar el estado de tu vehículo.
              
                        {toolImage()}
                      
                    </p>
                   
          

               
                
               
                        <Link to="profile" className="btn-plus btn-mas m-2 float-end buttonGarage  ">
                        <script src="https://cdn.lordicon.com/bhenfmcm.js"></script>
                        <lord-icon
                            src="https://cdn.lordicon.com/mecwbjnp.json"
                            trigger="hover"
                            colors="primary:#b4b4b4,secondary:#ffffff"
                            stroke="80"
                            style={{"width":"250px","height":"250px"}}>
                        </lord-icon>
                        </Link>
                    
                  
             
                

             </div>




        </div>

   
    
    );

}