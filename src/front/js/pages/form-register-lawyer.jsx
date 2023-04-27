import React, { useState, useEffect} from "react";
import { registerLawyer } from "../services/lawyer.js";  

export const RegistroLawyer = () => {
	
	const defaultForm = {
			user_name: "",
            password:"",
            name:"",
            last_name:"",
			email: "",
            address: "",
            city: "",
            cp: "",
            col_number: "",
	}

	const [form, setForm] = useState(defaultForm)


    // Función que actualiza el user_name basado en el campo email
    const updateUserName = (email) => {
        const userName = email.replace(/\s+/g, ""); 
        setForm({...form, user_name: userName});
    };

    // Actualiza el user_name cada vez que el campo email cambia
    useEffect(() => {
        updateUserName(form.email);
    }, [form.email]);


	const handleChange = (e) =>{// el valor que se escriba en el form se sustituye en el campo name de cada apartado del objeto,
		const {name, value} = e.target;
    	setForm({...form, [name]: value}) // se setean los cambios en el usestate de form                                                  
	}	

    const handleSubmit = async (event) =>{
		event.preventDefault();
		await registerLawyer(form);
        setForm(defaultForm)
	}

    return (
		<React.Fragment>
		
			<div className="container text-center mt-5">
				<h2>CREAR NUEVA CUENTA</h2>
				<h5>Accede a todos los servicios de Jobs Hood !</h5>
			</div>
			<div className="container mt-5">
				<h4>Datos de Acceso</h4>
				<form onSubmit={handleSubmit} onChange={handleChange}>
					<div className="row align-items-start my-3">
						<div className="col">
							<label 
								htmlFor="form-register-worker" 
								className="form-label">
									Nombre
							</label>
							<input type="text" 
								className="form-control rounded-0" 
								name="name"
								placeholder="Nombre" 
								maxLength="80" 
								value={form.name}
								required 
							/>
						</div>
						<div className="col">
							<label
								htmlFor="inputPassword6" 
								className="form-label">
									Contraseña
							</label>
							<input type="password" 
								 
								className="form-control rounded-0"
								name="password"
								aria-labelledby="passwordHelpInline" 
								placeholder="Debe tener entre 8-20 caracteres."
								value={form.password}
								maxLength="250"
								required 
							/>
						</div>
					</div>
					<div className="row align-items-end my-3">
						<div className="col">
							<label 
								htmlFor="form-register-worker" 
								className="form-label">
									Dirección Email
							</label>
							<input 
								type="email" 
								
								className="form-control rounded-0" 
								name="email"
								placeholder="name@example.com"
								value={form.email}
								maxLength="250"
								required 
							/>
						</div>
					</div>
					<div className="row align-items-end my-3">
						<div className="col">
							<label 
								htmlFor="form-register-worker" 
								className="form-label">
									Dirección postal
							</label>
							<input 
								type="text" 
								
								className="form-control rounded-0"
								name="address"
								value={form.address}
								maxLength="100"
								required 
							/>
						</div>
					</div>
					<div className="row align-items-end my-3">
						<div className="col">
							<label 
								htmlFor="form-register-worker" 
								className="form-label">
									Ciudad
								</label>
							<input 
								type="text" 
								
								className="form-control rounded-0"
								name="city"
								value={form.city}
								maxLength="100"
								required 
							/>
						</div>
					</div>
					<div className="row align-items-end my-3">
						<div className="col">
							<label 
								htmlFor="form-register-worker" 
								className="form-label">
									Código postal
							</label>
							<input 
								type="number" 
								className="form-control rounded-0"
								name="cp"
								value={form.cp}
								required 
							/>
						</div>
					</div>
					<div className="row align-items-end my-3">
						<div className="col">
							<label 
								htmlFor="form-register-worker" 
								className="form-label">
									Número de colegiado
							</label>
							<input 
								type="text"
								className="form-control rounded-0"
								name="col_number"
								value={form.col_number}
								required 
							/>
						</div>
					</div>
					<input type="submit" className="btn btn-dark mx-3 rounded-0" value="Registrarme"></input>
				</form>
			</div>

		</React.Fragment >

	);
};
