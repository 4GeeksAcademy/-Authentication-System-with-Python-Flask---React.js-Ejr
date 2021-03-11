import React from "react";
//import React, { useContext, useEffect } from "react";
import "../../styles/home.scss";
//import { Link } from "react-router-dom";
//import PropTypes from "prop-types";
//import { Context } from "../store/appContext";
//import { useParams } from "react-router-dom";

//const PymeView = ({ pymes })
const PymeView = () => {
    return (
        <>
            <img
                className="card-img-top"
                style={{ width: "738px", height: "500px", margin: "0 auto" }}
                src="https://fondosmil.com/fondo/74500.jpg"
                alt="Card image cap"
            />
            <div className="container">
                <div className="row"><h1>Chachagua Rainforest Eco Lodge</h1></div>
                <div className="row d-flex">
                    <div className="col-8">
                        <p>Chachagua Rainforest Hotel and Ecolodge se encuentra en un bello paraíso selvático cerca del Volcán Arenal. Aclamado por las publicaciones de viajes de confianza, somos el principal destino de bosque tropical en Costa Rica. Desde el momento en que llege será transportado hacia el mágico y exquisito encanto de nuestro singular complejo en el bosque.</p>
                        <p>En nuestro hotel del bosque tropical en Costa Rica se le garantiza que experimentará servicio de primera clase, habitaciones bellas y bien equipados que se mezclan con la naturaleza, y gastronomía de alto nivel con productos agrícolas de nuestras propias huertas orgánicas.</p>    
                        <p>Eco-aventuras excepcionales colocadas en impresionantes entornos son aptas para todas las edades y las habilidades.</p>
                    </div>
                    <div className="col-4">
                        <img
                            className="card-img-top"
                            style={{ width: "200px", height: "200px", margin: "0 auto" }}
                            src="https://images.squarespace-cdn.com/content/v1/555cbc7ee4b059e095f39179/1488390070674-CXYQU17QO2DSEV4TJ5V5/ke17ZwdGBToddI8pDm48kMxP3zelORv554bfrCgYiuNZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PIO3p9JfP_jmAUPHyNnkpZX7wqTYQ8n-Q3yghIWqr7I-w/map-la-fortuna-arenal-costa-rica.jpg"
                            alt="Card image cap"
                        />
                    </div>
                </div>
                <div className="row"></div>
                <div className="row"></div>
            </div>

        </>
    );
};

/*export const Profile = () => {
	const { entity, id } = useParams();
	const storeContext = useContext(Context);
	const {
		store: { characterEntity, planetsEntity }
	} = storeContext;

	useEffect(
		() => {
			storeContext.actions.fetchEntity(entity, id);
		},
		[entity, id]
	);*/
return (
    <div
        className="container mb-5 my-5"
        style={{ background: "grey", maxWidth: "1338px", paddingTop: "192px", paddingBottom: "250px" }}>
        <div className="row">
            <img
                className="card-img-top"
                style={{ width: "738px", height: "500px", margin: "0 auto" }}
                src="https://images.mediotiempo.com/Q3JLKOwPAZjcdK-6u406n-REY-g=/958x596/uploads/media/2020/02/19/star-wars-franquicias-cine-ciencia.jpg"
                alt="Card image cap"
            />
        </div>
        <div style={{ color: "white", paddingLeft: "42px" }}>
            {characterEntity.name ? (
                <PersonProfile person={characterEntity} />
            ) : (
                    <PlanetProfile planet={planetsEntity} />
                )}
        </div>
    </div>
);
};

/*PlanetProfile.propTypes = {
	planet: PropTypes.object
};

PersonProfile.propTypes = {
	person: PropTypes.object
};
*/