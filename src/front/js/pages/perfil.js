import React from "react";
import UserProfile from "../component/perfil";
import { Navbar } from "../component/navbar";



const Userpage = ()=>{
    return(
        <div>
            <header>
        </header>
        <body>
            <UserProfile/>
        </body>
        
        </div>
        
        )
}

export default Userpage
=======
import "../../styles/home.css";
import Pricing from "../component/princing";

const Perfil = () => {
	return (
		<div className="App">
			<div className="row">
				<div style={{ textAlign: "center" }} className="col-12">
					<h1>Planes</h1>
					<div className="divider divider-default m-3"></div>
				</div>
			</div>
			<div className="row ">
				<div className="col">
					<Pricing
						planes="Basic"
						price="$5"
						pack="2 Eventos al año"
						event="10 equipos por evento"
						admi="Administración de personal"
						control="Control de ingresos"
					/>
				</div>
				<div className="col">
					<Pricing
						planes="Advance"
						price="$10"
						pack="5 Eventos al año"
						event="20 equipos por evento"
						admi="Administración de personal"
						control="Control de ingresos"
					/>
				</div>
				<div className="col">
					<Pricing
						planes="Premium"
						price="$15"
						pack="Eventos ilimitados"
						event="Equipos ilimitados"
						admi="Administración de personal"
						control="Control de ingresos"
					/>
				</div>

			</div>

		</div>


	);
}
export default Perfil; 
