import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const ModalAlquilar = (props) => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const handlePayment = () => {
        const fechaInicio = startDate.getTime();
        const fechaFin = endDate.getTime();
        const diff = fechaFin - fechaInicio;
        const diasTotales =  diff / (1000 * 60 * 60 * 24);
        actions.totalpayment(props.vehicle_id, props.marca_modelo, props.precio, diasTotales, props.precio_id_stripe,props.url_img1);
		navigate('/payment');
	};

    return (
        <>
            <button type="button" className="botonAlquilar btn-success text-center btn-lg border-2 mt-4 fs-4" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Alquilar
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">¿Cuantos días desea alquilar?</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="d-block modal-body">
                            <div className="mb-3">
                                <p className="m-0"><strong>Recogida</strong></p>
                                <DatePicker
                                    dateFormat="dd/MM"
                                    todayButton="Friendly Wheels" 
                                    showIcon
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={(new Date())}
                                    excludeDates={[
                                        { date: new Date(), message: "El día de hoy no se puede incluir" }
                                    ]}
                                />
                            </div>
                            <div>
                                <p className="m-0"><strong>Devolución</strong></p>
                                <DatePicker
                                    dateFormat="dd/MM"
                                    todayButton="Friendly Wheels" 
                                    showIcon
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={startDate}
                                />
                            </div>
                        </div>
                        <div className="modal-footer justify-content-center">
                            <button onClick={handlePayment} type="button" className="btn btn-success" data-bs-dismiss="modal">Alquilar</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
