import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const psicologos = [
    {
        nombre: "Dr. Juan Pérez",
        especialidades: ["Psicología Clínica", "Terapia Cognitivo-Conductual"],
        descripcion: "El Dr. Juan Pérez tiene más de 15 años de experiencia en psicología clínica y es experto en terapia cognitivo-conductual. Ha ayudado a numerosos pacientes a superar trastornos de ansiedad y depresión.",
        calificacion: 4.8
    },
    {
        nombre: "Dra. María García",
        especialidades: ["Psicología Infantil", "Terapia Familiar"],
        descripcion: "La Dra. María García se especializa en psicología infantil y terapia familiar. Con su enfoque comprensivo y empático, ha trabajado con familias para mejorar la comunicación y resolver conflictos.",
        calificacion: 4.7
    },
    {
        nombre: "Dr. Luis Rodríguez",
        especialidades: ["Psicología Organizacional", "Coaching"],
        descripcion: "El Dr. Luis Rodríguez es un psicólogo organizacional y coach certificado. Ayuda a las empresas a mejorar el rendimiento de sus empleados y a desarrollar líderes efectivos.",
        calificacion: 4.9
    },
    {
        nombre: "Dra. Ana Martínez",
        especialidades: ["Psicología Forense", "Evaluaciones Psicológicas"],
        descripcion: "La Dra. Ana Martínez es especialista en psicología forense y realiza evaluaciones psicológicas para casos legales. Su conocimiento en el campo forense es ampliamente reconocido.",
        calificacion: 4.6
    },
    {
        nombre: "Dr. Carlos Gómez",
        especialidades: ["Terapia de Pareja", "Sexología"],
        descripcion: "El Dr. Carlos Gómez se especializa en terapia de pareja y sexología. Ha ayudado a muchas parejas a mejorar su relación y resolver problemas sexuales.",
        calificacion: 4.5
    }
];

const SimpleCarousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,  // Tiempo en milisegundos
    };

    return (
        <Slider {...settings}>
            {
                psicologos.map((elm)=>{
                    return(
                        <div>
                <div className="card mb-3" style={{ maxWidth: '540px' }}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src="..." className="img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{elm.nombre}</h5>
                                {elm.especialidades.map((esp) =>{
                                     <p className="card-text">{esp}</p>
                                })}
                                <p className="card-text"><small className="text-body-secondary">{elm.descripcion}</small></p>
                                <p className="card-text">{elm.calificacion}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                    )
                })
            }
        </Slider>
    );
}

export default SimpleCarousel;
