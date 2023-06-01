import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center d-flex custom-home">
			<div id="carouselExampleControls" className="carousel slide pt-4" data-bs-ride="carousel">
  <div className="carousel-inner container" style={{ width: "60%", height: "600px", margin: "0 auto" }}>
    <div className="carousel-item active">
      <img src="https://plus.unsplash.com/premium_photo-1682142558899-772a05c63a3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80" className="d-block w-30" alt="..." style={{ width: "100%", height: "100%", margin: "0 auto" }}/>
    </div>
    <div className="carousel-item">
      <img src="https://plus.unsplash.com/premium_photo-1661594698673-09ffa64a41cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" className="d-block w-30" alt="..." style={{ width: "100%", height: "100%", margin: "0 auto" }}/>
    </div>
    <div className="carousel-item">
      <img src="https://images.unsplash.com/photo-1543439639-aa33770281ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1454&q=80" className="d-block w-30" alt="..." style={{ width: "100%", height: "100%", margin: "0 auto" }}/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>


<div className="card custom-home pt-5 border-0" style={{ width: "18rem"}}>
  <div className="card-body">
    <h5 className="card-title">Now featuring StarWash</h5>
  <img src="https://plus.unsplash.com/premium_photo-1661443447441-1fd90ea3eca5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" class="card-img-top" alt="..."/>
    <p className="card-text">By using our services, you will extend the lifespan of your car's paint, save time, and optimize your time while we wash your car. And our prices are on the crazy side of the Force.</p>
    <button type="button" className="custom-button rounded" style={{ backgroundColor: '#F4A261', color: '#000', padding: '18px 32px', borderRadius: '6px', boxShadow: '0 6px 0 black' }}>Services</button>
  </div>
</div>
			
		

		</div>
	);
};
