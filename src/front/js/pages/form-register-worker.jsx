// faltará añadir navbar y footer 
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
//import { Link } from "react-router-dom";
//import { Navbar } from ".././component/navbar";
import { Context } from "../store/appContext";
import { registerUser } from "../services";  



export const RegistroWorker = () => {
	const { store, actions } = useContext(Context);

	const navigate = useNavigate()

	const [registro, setRegistro] = useState(
		{
			user_name: "",
            password:"",
            name:"",
            last_name:"",
			email: ""
		})


	const handleChange = ({target}) =>{                           // el valor que se escriba en el form se sustituye en el campo name de cada apartado del objeto,
		setRegistro({...registro ,[target.name]:target.value}) // se setean los cambios en el usestate de registro                                                    
	}	

    const handleSubmit = async (event) =>{
		event.preventDefault();
		const register = await registerUser(registro)
       if (register){navigate("/login")}
	   else {navigate("/")} // Pintar alerts entc en el front para controlar esta parte, de momento se queda con este condicional
	}

	return (
		<React.Fragment>
		
			<div className="container text-center mt-5">
				<h2>CREAR NUEVA CUENTA</h2>
				<h5>Accede a todos los servicios de Jobs Hood !</h5>
			</div>
			<div className="container mt-5">
				<h4>Datos de Acceso</h4>
				<form onChange={handleChange} onSubmit={handleSubmit}>
					<div className="row align-items-start my-3">
						<div className="col">
							<label htmlFor="form-register-worker" className="form-label">Nombre de Usuario</label>
							<input type="text" name="user_name" className="form-control rounded-0" placeholder="Usuario"  maxLength="20" required />
						</div>
						<div className="col">
							<label  htmlFor="inputPassword6" className="form-label">Contraseña</label>
							<input type="password" name="password" className="form-control rounded-0" aria-labelledby="passwordHelpInline" placeholder="Debe tener entre 8-20 caracteres." required />
						</div>
					</div>
                    <div className="row align-items-start my-3">
						<div className="col">
							<label htmlFor="form-register-worker" className="form-label">Nombre</label>
							<input type="text" name="name" className="form-control rounded-0" pattern="^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s]*$" maxLength="20" required />
						</div>
						<div className="col">
							<label htmlFor="form-register-worker" className="form-label">Apellidos</label>
							<input type="text" name="last_name" className="form-control rounded-0"  pattern="^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s]*$" maxLength="40"  />
						</div>
					</div>
					<div className="row align-items-end my-3">
						<div className="col">
							<label  htmlFor="form-register-worker" className="form-label">Dirección Email</label>
							<input type="email" name="email" className="form-control rounded-0" placeholder="name@example.com" required />
						</div>
					</div>
					<input type="submit" className="btn btn-dark mx-3  rounded-0" value="Registrarme"></input>
				</form>
			</div>

		</React.Fragment >

	);
};
