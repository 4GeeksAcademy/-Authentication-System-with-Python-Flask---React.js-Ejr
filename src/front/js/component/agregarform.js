import React,{useContext, useState} from "react";
import { Context } from "../store/appContext";
import swal from 'sweetalert';
import { useNavigate} from "react-router-dom";
import "../../styles/index.css";

export const AgregarForm = () => {
    
    const {actions} = useContext(Context)
    const [inputMarcayModelo, setInputMarcayModelo]=useState("")
    const [inputMatricula, setInputMatricula]=useState("")
    const [inputMotor, setInputMotor]=useState("")
    const [inputCambio, setInputCambio]=useState("")
    const [inputAsientos, setInputAsientos]=useState("")
    const [inputPrecio, setInputPrecio]=useState("")
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault()
        let respuesta = await actions.addVehicle(inputMarcayModelo, inputMatricula.toUpperCase(), inputMotor, inputCambio, inputAsientos, inputPrecio) 
        if (respuesta === "success"){
            swal ( "Vehículo añadido correctamente", ":)",  "success" )
             navigate("/");
        } else if (respuesta === "plate_exist") {
            swal ("El vehículo con esta matrícula ya ha sido añadido" , "Por favor intentelo de nuevo",  "error" )
        } else {
            swal ( "Todos los campos son obligatorios" ,  "Por favor intentelo de nuevo" ,  "error" )
        }
    };
    return (
        <div className="container lg-5">
            <h1 className="border-bottom pb-4 text-center">Añadir Vehículo</h1>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-lg-6 mb-3">
                        <h4 className="subtitulos">Marca y modelo del vehículo</h4>
                        <input type="text" className="form-control mb-3" id="exampleinputMarcayModelo" placeholder="Ingresa la marca y modelo del vehículo" name="marcaymodelo" onChange={(e) => setInputMarcayModelo(e.target.value)} />
                    </div>
                    <div className="col-lg-6 mb-3">
                        <h4 className="subtitulos">Matrícula de vehículo</h4>
                        <input type="text" className="form-control mb-3" id="exampleinputMatricula" placeholder="Ingresa la matrícula del vehículo" name="matricula" onChange={(e) => setInputMatricula(e.target.value)} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 mb-3">
                        <h4 className="subtitulos">Tipo de motor</h4>
                        <input type="text" className="form-control mb-3" id="exampleinputMotor" placeholder="Ingresa el tipo de motor del vehículo" name="motor" onChange={(e) => setInputMotor(e.target.value)} />
                    </div>
                    <div className="col-lg-6 mb-3">
                        <h4 className="subtitulos">Tipo de cambio</h4>
                        <input type="text" className="form-control mb-3" id="exampleinputCambio" placeholder="Ingresa el tipo de cambio del vehículo" name="cambio" onChange={(e) => setInputCambio(e.target.value)} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 mb-3">
                        <h4 className="subtitulos">Número de asientos</h4>
                        <input type="text" className="form-control mb-3" id="exampleinputAsientos" placeholder="Ingresa el número de asientos" name="asientos" value={inputAsientos} onChange={(e) => setInputAsientos(e.target.value)} />
                    </div>
                    <div className="col-lg-6 mb-3">
                        <h4 className="subtitulos">Precio por día</h4>
                        <input type="number" className="form-control mb-3" id="exampleinputPrecioDia" placeholder="Ingresa precio por día" name="precio" onChange={(e) => setInputPrecio(e.target.value)} />
                    </div>
                </div>
                <div className="d-flex justify-content-center" id="btnAgregarForm">
                <button type="submit" className="btn btn-outline-success btn-lg border-2 mb-5 fs-4 justify-content-center">Añadir vehículo</button>
                </div>
            </form>
        </div>
    )
};
