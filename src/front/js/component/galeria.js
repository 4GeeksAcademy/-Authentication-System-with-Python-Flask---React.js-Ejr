import React from "react"
import basket from "../../img/basket7.jpeg"
const Galeria=()=>{
    return(
        <div className="ecommerce-gallery" data-mdb-zoom-effect="true" data-mdb-auto-height="true">
        <div className="row py-3 shadow-5">
          <div className="col-3 mb-1">
            <div className="lightbox">
              <img
                src={basket}
                alt="Gallery image 1"
                className="ecommerce-gallery-main-img active w-100"
              />
            </div>
          </div>
          <div className="col-3 mt-1">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/14a.webp"
              data-mdb-img="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/14a.webp"
              alt="Gallery image 1"
              className="active w-100"
            />
          </div>
          <div className="col-3 mt-1">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/14a.webp"
              data-mdb-img="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/14a.webp"
              alt="Gallery image 1"
              className="active w-100"
            />
          </div>
          <div className="col-3 mt-1">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/14a.webp"
              data-mdb-img="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/14a.webp"
              alt="Gallery image 1"
              className="active w-100"
            />
          </div>
           <div className="col-3 mt-1">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/14a.webp"
              data-mdb-img="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/14a.webp"
              alt="Gallery image 1"
              className="active w-100"
            />
          </div>
          <div className="col-3 mt-1">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/12a.webp"
              data-mdb-img="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/12a.webp"
              alt="Gallery image 2"
              className="w-100"
            />
          </div>
          <div className="col-3 mt-1">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/13a.webp"
              data-mdb-img="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/13a.webp"
              alt="Gallery image 3"
              className="w-100"
            />
          </div>
          <div className="col-3 mt-1">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/15a.webp"
              data-mdb-img="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/15a.webp"
              alt="Gallery image 4"
              className="w-100"
            />
          </div>
        </div>
      </div>
      
    );
}

export default Galeria;