import React,{useContext, useState} from "react";
 import { Context } from "../store/appContext";
 import { useNavigate} from "react-router-dom";
 import "../../styles/index.css";

 export const AgregarForm = () => {
    
    const {actions} = useContext(Context)
    const [inputMarcayModelo, setInputMarcayModelo]=useState("")
    const [inputMatricula, setInputMatricula]=useState("")
    const [inputMotor, setInputMotor]=useState("")
    const [inputCambio, setInputCambio]=useState("")
    const [inputAsientos, setInputAsientos]=useState("")
    const [inputPrecioDia, setInputPrecioDia]=useState("")
    const navigate = useNavigate();

    // async function handleSubmit(e) {
    //     e.preventDefault()
    //     let isLogged = await actions.login(inputEmail, inputPassword)
    //     if (isLogged){
    //         console.log('Login successful');
    //         navigate("/"); 
    //     } else {
    //         setLoginError(true);
    //         console.log('Login failed');
    //     }
    // };
    return (
        <div className="container mt-5">
            <h1 className="border-bottom pb-2">Añadir Vehículo</h1>
            <form >
                <div className="row">
                    <div className="col-md-6" style={{ color: 'brown' }}>
                        <h4>Marca y modelo del vehículo</h4>
                        <input type="text" className="form-control mb-3" name="marca" placeholder="Ingresa la marca y modelo del vehículo" onChange={(e) => setInputMarcayModelo(e.target.value)} />
                    </div>
                    <div className="col-md-6"style={{ color: 'brown' }}>
                        <h4>Matrícula de vehículo</h4>
                        <input type="text" className="form-control mb-3" name="matricula" placeholder="Ingresa la matrícula del vehículo" onChange={(e) => setInputMatricula(e.target.value)} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6"style={{ color: 'brown' }}>
                        <h4>Tipo de motor</h4>
                        <input type="text" className="form-control mb-3" name="motor" placeholder="Ingresa el tipo de motor del vehículo" onChange={(e) => setInputMotor(e.target.value)} />
                    </div>
                    <div className="col-md-6"style={{ color: 'brown' }}>
                        <h4>Tipo de cambio</h4>
                        <input type="text" className="form-control mb-3" name="cambio" placeholder="Ingresa el tipo de cambio del vehículo" onChange={(e) => setInputCambio(e.target.value)} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6"style={{ color: 'brown' }}>
                        <h4>Número de asientos</h4>
                        <input type="text" className="form-control mb-3" name="asientos" placeholder="Ingresa el número de asientos" onChange={(e) => setInputAsientos(e.target.value)} />
                    </div>
                    <div className="col-md-6"style={{ color: 'brown' }}>
                        <h4>Precio por día</h4>
                        <input type="text" className="form-control mb-3" name="precio" placeholder="Ingresa precio por día" onChange={(e) => setInputPrecioDia(e.target.value)} />
                    </div>
                </div>
                <button type="submit" className="btn btn-success">Añadir Vehículo</button>
            </form>
        </div>
    )
};
