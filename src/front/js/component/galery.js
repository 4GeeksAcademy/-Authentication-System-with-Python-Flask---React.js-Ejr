import React, { useRef } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CustomArrows from './CustomArrows'; 



const Galery = () => {
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <CustomArrows 
                 className="slick-next" 
                 onClick={() => sliderRef.current.slickNext()}
                 onMouseEnter={() => sliderRef.current.slickNext()} 
                 onMouseLeave={() => clearInterval(autoPlayId)} // Detiene el desplazamiento automático
               />,
    prevArrow: <CustomArrows 
                 className="slick-prev" 
                 onClick={() => sliderRef.current.slickPrev()}
                 onMouseEnter={() => sliderRef.current.slickPrev()} 
                 onMouseLeave={() => clearInterval(autoPlayId)} // Detiene el desplazamiento automático
               />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  let autoPlayId = null;

  const handleMouseEnter = (direction) => {
    autoPlayId = setInterval(() => {
      if (direction === 'next') {
        sliderRef.current.slickNext();
      } else {
        sliderRef.current.slickPrev();
      }
    }, 2000); // Cambia la imagen cada 2 segundos
  };

  const handleMouseLeave = () => {
    clearInterval(autoPlayId); // Detiene el intervalo cuando el mouse sale
  };

  return (
    <div className="galery-container" style={{ padding: '20px' }}>
      <div className="miniJumbotronGalery text-center py-5 bg-light" style={{ position: 'relative' }}>
        <h2 className="mb-3">Galería de Eventos</h2>
        <p className="mb-0">Descubre y explora las fotos de nuestros eventos musicales y festivales</p>
        <a href="/gallery" className="btn btn-primary position-absolute end-0 top-99 translate-middle-y">
          Ver todo
        </a>
      </div>
      
      <Slider 
        ref={sliderRef}
        {...settings}
        beforeChange={() => clearInterval(autoPlayId)} // Detiene el auto-play cuando cambia el slide
      >
        <div>
          <img src="https://cdn.midjourney.com/17df57f2-1d7c-4cce-9411-afc19c623240/0_1.png" alt="Evento 1" style={{ width: '100%' }} />
        </div>
        <div>
          <img src="https://cdn.midjourney.com/b0e208dd-bb10-4583-8528-132745647d7d/0_0.png" alt="Evento 2" style={{ width: '100%' }} />
        </div>
        <div>
          <img src="https://cdn.midjourney.com/b0e208dd-bb10-4583-8528-132745647d7d/0_1.png" alt="Evento 3" style={{ width: '100%' }} />
        </div>
        <div>
          <img src="https://cdn.midjourney.com/b0e208dd-bb10-4583-8528-132745647d7d/0_2.png" alt="Evento 4" style={{ width: '100%' }} />
        </div>
        <div>
          <img src="https://cdn.midjourney.com/b0e208dd-bb10-4583-8528-132745647d7d/0_3.png" alt="Evento 5" style={{ width: '100%' }} />
        </div>
        <div>
          <img src="https://cdn.midjourney.com/4e387683-658d-4197-a344-5d7dbbcf84dd/0_0.png" alt="Evento 5" style={{ width: '100%' }} />
        </div>
        
      </Slider>
    </div>
  );
};

export default Galery;
