import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

//Barra de búsqueda
import BarraBusqueda from "../component/barraBusqueda";
import "../../styles/barraBusqueda.css";
import ListaCursos from "../component/listaCursos";



export const Home = () => {
    const { store, actions } = useContext(Context);
// esto para que al presionar la pestaña, nos lleve a una pagina LINEA 12
return (
    <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <a href="https://example.com/page1" target="_blank" rel="noopener noreferrer">
                        <img src="https://i.blogs.es/78408e/programador/1366_2000.jpeg" className="d-block w-100" alt="First Slide" />
                    </a>
                    <div className="text-overlay">Aprende, Conecta y Crece</div>
                </div>
                <div className="carousel-item">
                    <a href="https://example.com/page2" target="_blank" rel="noopener noreferrer">
                        <img src="https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="d-block w-100" alt="Second Slide" />
                    </a>
                </div>
                <div className="carousel-item">
                    <a href="https://example.com/page3" target="_blank" rel="noopener noreferrer">
                        <img src="https://esden.es/wp-content/uploads/2024/06/lenguajesdeprogramacion-qbit-01.webp" className="d-block w-100" alt="Third Slide" />
                    </a>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
        {/* Aquí se agrega el componente BarraBusqueda */}
        <BarraBusqueda />
        <ListaCursos />
    </div>
);
};

