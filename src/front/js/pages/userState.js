import { useNavigate } from "react-router-dom";
import { Logo } from "../component/Logo";
import React from "react";

export const UserStore = () => {
  const navigate = useNavigate();
  return (
    <form className="contenedor-login">
      <div className="mb-3">
        <div className="nombre-tienda">
          <Logo />
        </div>
        <div className="carrito">
          <button
            onClick={() => alert("proximamente")}
            type="submit"
            className="btn btn-dark"
          >
            <i className="fa-solid fa-cart-shopping"></i>{" "}
          </button>
        </div>

        <select className="form-select" aria-label="Default select example">
          <option selected>Categoria</option>
          <option value="1">repuetos</option>
          <option value="2">accesorios</option>
          <option value="3">vestimenta</option>
        </select>

        <select className="form-select" aria-label="Default select example">
          <option selected>Productos</option>
          <option value="1">Productos1</option>
          <option value="2">Productos2</option>
          <option value="3">Productos3</option>
        </select>
        <div
          id="carouselExampleControlsNoTouching"
          class="carousel slide"
          data-bs-touch="false"
        >
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div className="card-producto">
                <img
                  src="https://cdn.pixabay.com/photo/2019/07/27/18/24/cyclist-4367308_960_720.jpg"
                  className="card-img-top"
                  alt="..."
                ></img>

                <h5>Card title</h5>
                <p>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
            <div class="carousel-item">
              <div className="card-producto">
                <img
                  src="https://cdn.pixabay.com/photo/2019/07/27/18/24/cyclist-4367308_960_720.jpg"
                  className="card-img-top"
                  alt="..."
                ></img>

                <h5>Card title</h5>
                <p>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
            <div class="carousel-item">
              <div className="card-producto">
                <img
                  src="https://cdn.pixabay.com/photo/2019/07/27/18/24/cyclist-4367308_960_720.jpg"
                  className="card-img-top"
                  alt="..."
                ></img>

                <h5>Card title</h5>
                <p>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControlsNoTouching"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControlsNoTouching"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>

        <button
          onClick={() => alert("proximamente")}
          type="submit"
          className="btn btn-dark"
        >
          Agregar al carro
        </button>
      </div>
    </form>
  );
};
