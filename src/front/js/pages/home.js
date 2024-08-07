import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
    const { store, actions } = useContext(Context);
// esto para que al presionar la pestaña, nos lleve a una pagina LINEA 12
    return (
        <div id="carouselExampleFade" className="carousel slide carousel-fade">
            <div className="carousel-inner">
                <div className="carousel-item active">    
                    <a href="https://example.com/page1" target="_blank" rel="noopener noreferrer"> 
                        <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100" alt="First Slide" />
                    </a>
                </div>
                <div className="carousel-item">
                    <a href="https://example.com/page2" target="_blank" rel="noopener noreferrer">
                        <img src="https://via.placeholder.com/800x400.png?text=Second+Slide" className="d-block w-100" alt="Second Slide" />
                    </a>
                </div>
                <div className="carousel-item">
                    <a href="https://example.com/page3" target="_blank" rel="noopener noreferrer">
                        <img src="https://via.placeholder.com/800x400.png?text=Third+Slide" className="d-block w-100" alt="Third Slide" />
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
    );
};
