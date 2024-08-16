import React, { useState } from 'react';
import "../../styles/gallery.css";
const Gallery = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalInfo, setModalInfo] = useState(null);

  const data = [
    {
      img: 'url(https://cdn.midjourney.com/404707fc-1d26-4573-8890-99396329498f/0_2.png)',
      titulo: 'Concierto Slipknot',
      id: 1
    },
    {
      img: 'url(https://cdn.midjourney.com/17df57f2-1d7c-4cce-9411-afc19c623240/0_2.png)',
      titulo: 'BCN FEST',
      id: 2
    },
    {
      img: 'url(https://cdn.midjourney.com/17df57f2-1d7c-4cce-9411-afc19c623240/0_0.png)',
      titulo: 'MAD FEST',
      id: 3
    },
    {
      img: 'url(https://cdn.midjourney.com/c968799a-87ff-4f82-9472-08de96af2bd1/0_2.png)',
      titulo: 'GAL FEST',
      id: 1
    },
    {
      img: 'url(https://cdn.midjourney.com/0f2d329c-6e2d-433d-9f72-e1bbccaa08a4/0_3.png)',
      titulo: 'BEACH FEST',
      id: 2
    },
    {
      img: 'url(https://cdn.midjourney.com/6b5fa8f6-7f00-47fa-bc04-3131bf09cc25/0_1.png)',
      titulo: 'ACDC',
      id: 3
    }
  ];

  const handleShow = (item) => {
    setModalShow(true);
    setModalInfo(item);
  };

  return (
    <div className="gallery-container" style={{ display: 'flex', flexWrap: 'wrap' }}>
      {data.map(el => (
        <div
          className="gallery-item"
          key={el.id}
          onClick={() => handleShow(el)}
          style={{ backgroundImage: el.img }}
        >
          <div className="gallery-item-overlay">
            <h3 className="gallery-item-title">{el.titulo}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
