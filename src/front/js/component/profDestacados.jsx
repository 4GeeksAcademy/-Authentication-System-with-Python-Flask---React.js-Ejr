import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactStars from 'react-rating-stars-component';
import defaultAvatar from "../../img/avatar.jpg";

const psicologos = [
    {
        img: "https://media.licdn.com/dms/image/C5603AQEf2PH1Z6jMaQ/profile-displayphoto-shrink_800_800/0/1542835716681?e=2147483647&v=beta&t=UStaIdaLcPXslHpqfUExnhZpPCiFlveK6_Xf60asB2w",
        nombre: "Juan Pérez",
        especialidades: ["Psicología Clínica", "Terapia Cognitivo-Conductual"],
        descripcion: "El Dr. Juan Pérez tiene más de 15 años de experiencia en psicología clínica y es experto en terapia cognitivo-conductual. Ha ayudado a numerosos pacientes a superar trastornos de ansiedad y depresión.",
        calificacion: 4.8,
    },
    {
        img: "https://th.bing.com/th/id/OIP.3pTvuODk4tohlb2GjXzhUQHaGv?rs=1&pid=ImgDetMain",
        nombre: "María García",
        especialidades: ["Psicología Infantil", "Terapia Familiar"],
        descripcion: "La Dra. María García se especializa en psicología infantil y terapia familiar. Con su enfoque comprensivo y empático, ha trabajado con familias para mejorar la comunicación y resolver conflictos.",
        calificacion: 4.7,

    },
    {
        img: "https://th.bing.com/th/id/OIP.7kRUafV2fWsF8wi1zH_CewHaE8?w=1500&h=1000&rs=1&pid=ImgDetMain",
        nombre: "Luis Rodríguez",
        especialidades: ["Psicología Organizacional", "Coaching"],
        descripcion: "El Dr. Luis Rodríguez es un psicólogo organizacional y coach certificado. Ayuda a las empresas a mejorar el rendimiento de sus empleados y a desarrollar líderes efectivos.",
        calificacion: 4.9,
    },
    {
        img: "https://media.licdn.com/dms/image/C4D03AQG6bwvCYAJucQ/profile-displayphoto-shrink_800_800/0/1619111773727?e=2147483647&v=beta&t=4YsQKaZyBsL-csV5ud1Pm8M5tqienkoe_dEvHhNNUwI",
        nombre: "Ana Martínez",
        especialidades: ["Psicología Forense", "Evaluaciones Psicológicas"],
        descripcion: "La Dra. Ana Martínez es especialista en psicología forense y realiza evaluaciones psicológicas para casos legales. Su conocimiento en el campo forense es ampliamente reconocido.",
        calificacion: 3.6,

    },
    {
        img: "https://th.bing.com/th/id/OIP.ZqIS8QmJFXUBUT1j292aegHaHa?w=530&h=530&rs=1&pid=ImgDetMain",
        nombre: "Carlos Gómez",
        especialidades: ["Terapia de Pareja", "Sexología"],
        descripcion: "El Dr. Carlos Gómez se especializa en terapia de pareja y sexología. Ha ayudado a muchas parejas a mejorar su relación y resolver problemas sexuales.",
        calificacion: 4.5,
    }
];

const SimpleCarousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 2500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,  // Tiempo en milisegundos
        arrows: true,
    };

    return (
        <Slider {...settings}>
            {
                psicologos.map((elm, index) => {
                    
                    
                    return (
                        <div className='d-flex justify-content-center' key={index}>
                            <div className="card profesional mb-3 text-start col-10 col-md-8 bg-light" style={{ minHeight: '300px', overflow: 'hidden' }}>
                                <div className="row g-0 h-100">
                                    <div className="col-md-4">
                                        <img
                                            src={elm.img == null ? defaultAvatar : elm.img }
                                            className="img-fluid rounded-start"
                                            alt={elm.nombre}
                                            style={{
                                                height: '300px',
                                                width: '100%',
                                                objectFit: 'cover',
                                                objectPosition: 'center'
                                            }}
                                        />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title my-3">{elm.nombre}</h5>
                                            {elm.especialidades.map((esp, inx) => (
                                                <h6 className="card-text" key={inx}>{esp}</h6>
                                            ))}
                                            <p className="card-text"><small className="text-body-secondary">{elm.descripcion}</small></p>
                                            <ReactStars
                                                count={5}
                                                value={elm.calificacion}
                                                size={40}  // Tamaño de las estrellas
                                                isHalf={true}  // Permite calificación en medio punto
                                                activeColor="#ffd700"  // Color de las estrellas activas
                                                edit={false}  // Desactiva la edición
                                            />
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
