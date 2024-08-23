import React from "react";
import "../../styles/testimonial-carousel.css";

const TestimonialCarousel = () => {
    return (
        <div id="testimonialCarousel" className="carousel carousel-dark slide testimonial-carousel mt-5">
            <div className="carousel-indicators testimonial-carousel-indicators">
                <button
                    type="button"
                    data-bs-target="#testimonialCarousel"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                ></button>
                <button
                    type="button"
                    data-bs-target="#testimonialCarousel"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                ></button>
            </div>
            <div className="carousel-inner testimonial-carousel-inner">
                <div className="carousel-item testimonial-carousel-item active">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card testimonial-card text-center">
                                <div className="testimonial-img-container">
                                    <img
                                        src="https://media.istockphoto.com/id/1476170969/es/foto/retrato-de-un-joven-listo-para-el-trabajo-concepto-de-negocio.webp?b=1&s=170667a&w=0&k=20&c=zh48SUji-WA9JiFnLNADswQlrYq-bmbc1eoynSkqBIw="
                                        className="testimonial-profile-img"
                                        alt="Giordano L"
                                    />
                                </div>
                                <div className="card-body testimonial-card-body">
                                    <h5 className="card-title testimonial-card-title">Giordano L</h5>
                                    <p className="card-text testimonial-card-text">
                                        "Excelente servicio y atención al cliente. Tuve un problema con la compra de mis entradas y el equipo de Tickeate respondió de inmediato y resolvió todo rápidamente. Además, los precios son competitivos y la selección de eventos es impresionante. Recomiendo totalmente Tickeate."
                                    </p>
                                    <p className="card-details testimonial-card-details">Buenos Aires, Argentina - Usuario</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card testimonial-card text-center">
                                <div className="testimonial-img-container">
                                    <img
                                        src="https://www.hubspot.com/hubfs/media/bancosimagenes.jpeg"
                                        className="testimonial-profile-img"
                                        alt="Maria G"
                                    />
                                </div>
                                <div className="card-body testimonial-card-body">
                                    <h5 className="card-title testimonial-card-title">Maria G</h5>
                                    <p className="card-text testimonial-card-text">
                                        "¡Tickeate ha hecho que la compra de entradas sea más fácil que nunca! La interfaz es muy amigable y el proceso de compra es rápido y seguro. Compré entradas para un concierto y todo salió perfecto. ¡Sin duda, seguiré usando Tickeate para futuros eventos!"
                                    </p>
                                    <p className="card-details testimonial-card-details">Madrid, España - Usuario</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="carousel-item testimonial-carousel-item">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card testimonial-card text-center">
                                <div className="testimonial-img-container">
                                    <img
                                        src="https://st.depositphotos.com/2309453/3120/i/450/depositphotos_31203671-stock-photo-friendly-smiling-man.jpg"
                                        className="testimonial-profile-img"
                                        alt="Daniel M"
                                    />
                                </div>
                                <div className="card-body testimonial-card-body">
                                    <h5 className="card-title testimonial-card-title">Daniel M</h5>
                                    <p className="card-text testimonial-card-text">
                                        "Publicar mi evento en Tickeate fue muy sencillo y eficiente. La plataforma hizo que el proceso de promoción y venta de entradas fuera mucho más fácil. Los usuarios encontraron rápidamente mi evento, y el soporte técnico fue excelente durante todo el proceso. Recomiendo Tickeate a cualquier organizador de eventos que busque una solución confiable."
                                    </p>
                                    <p className="card-details testimonial-card-details">Ciudad de México, México - Organizador de eventos</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card testimonial-card text-center">
                                <div className="testimonial-img-container">
                                    <img
                                        src="https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg"
                                        className="testimonial-profile-img"
                                        alt="Laura S"
                                    />
                                </div>
                                <div className="card-body testimonial-card-body">
                                    <h5 className="card-title testimonial-card-title">Laura S</h5>
                                    <p className="card-text testimonial-card-text">
                                        "Como fanática de los conciertos, Tickeate ha sido un descubrimiento increíble. La plataforma me mantiene informada sobre todos los eventos próximos en mi ciudad y me permite comprar entradas de manera rápida y segura. La función de recordatorios es especialmente útil. ¡Gracias a Tickeate, no me he perdido ningún concierto de mis artistas favoritos!"
                                    </p>
                                    <p className="card-details testimonial-card-details">Lima, Perú - Usuario frecuente</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button
                className="carousel-control-prev testimonial-carousel-control-prev"
                type="button"
                data-bs-target="#testimonialCarousel"
                data-bs-slide="prev"
            >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button
                className="carousel-control-next testimonial-carousel-control-next"
                type="button"
                data-bs-target="#testimonialCarousel"
                data-bs-slide="next"
            >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default TestimonialCarousel;