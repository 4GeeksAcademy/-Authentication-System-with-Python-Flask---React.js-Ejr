import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import ProfilePicture from "../../img/profile-picture.jpg";
import { SimpleCard } from "../component/SimpleCard.js";
import "../../styles/home.css";

export const Profile = () => {


    const { store, actions } = useContext(Context)
    const [diasDiferencia, setDiasDiferencia] = useState(0);

    useEffect(() => {
        async function ini() {
            await actions.obtenerInfoUsuario();
            diferenciaDias()
        }
        ini()

    }, [])


    function diferenciaDias() {
        let fechaUltima = store.user.eventos_asistido[0]?.fecha;

        // Convertir la cadena en un objeto de fecha
        const fechaObjeto = new Date(fechaUltima);

        // Formatear la fecha en el formato corto
        const fechaString1 = fechaObjeto.toLocaleDateString();

        // Obtener la fecha actual
        var fechaActual = new Date();

        // Obtener día, mes y año
        var dia = fechaActual.getDate();
        var mes = fechaActual.getMonth() + 1; // Se suma 1 porque los meses van de 0 a 11
        var año = fechaActual.getFullYear();

        // Formatear la fecha
        var fechaString2 = dia.toString().padStart(2, '0') + '/' + mes.toString().padStart(2, '0') + '/' + año;

        // Función para convertir una fecha en formato "dd/mm/aaaa" a objeto de fecha en JavaScript
        function convertirAFecha(fechaString) {
            var partesFecha = fechaString.split('/');
            var dia = parseInt(partesFecha[0], 10);
            var mes = parseInt(partesFecha[1], 10) - 1; // Se resta 1 porque los meses van de 0 a 11
            var año = parseInt(partesFecha[2], 10);
            return new Date(año, mes, dia);
        }

        // Función para calcular la diferencia en días entre dos fechas
        function diferenciaEnDias(fecha1, fecha2) {
            var diferenciaEnMilisegundos = fecha2.getTime() - fecha1.getTime();
            var milisegundosPorDia = 1000 * 60 * 60 * 24;
            return Math.round(diferenciaEnMilisegundos / milisegundosPorDia);
        }

        var fecha1 = convertirAFecha(fechaString1);
        var fecha2 = convertirAFecha(fechaString2);

        var diferencia = diferenciaEnDias(fecha2, fecha1);
        setDiasDiferencia(diferencia);
        // }
    }

    return (
        <div className="container-fluid d-flex flex-column justify-content-between align-items-center">
            <div className="d-flex flex-row justify-content-center align-items-center my-5">
                <div className="col-6 d-flex flex-row justify-content-center align-items-center ">
                    <img className="col-4 img-fluid" src="https://img.freepik.com/fotos-premium/feliz-dibujo-dibujos-animclass=abindex`ados-boceto-imagen-fondo-blanco-arte-generado-ai_848903-6756.jpg" />
                    <div>
                        <ul className="col-8 list-group">
                            <h2>{store.user.name}</h2>
                            <h4>{store.user.email}</h4>
                        </ul>
                    </div>
                </div>
                <div className="col-6 d-flex justify-content-end align-items-center">
                    <div className="bg-300 rounded-circle d-flex justify-content-center align-items-center p-5" style={{ height: "22rem", width: "22rem" }}>
                        <h3 className="text-white">Próximo eventos en {diasDiferencia} días</h3>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-row justify-content-between align-items-center w-75 my-5">
                <div className="col-6 text-center">
                    <h3>HAS CREADO {store.user.num_eventos_creados} EVENTOS</h3>
                </div>
                <div className="col-6 text-center">
                    <h3>HAS ASISTIDO A {store.user.num_eventos_asistido ?  store.user.num_eventos_asistido : "0"} EVENTOS</h3>
                </div>
            </div>

            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Próximos eventos a los que asistir</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Tus eventos creados</button>
                </li>
            </ul>
                <div className="tab-content mt-2" id="myTabContent">
                    <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
                    <   ul className="list-group d-flex flex-column mb-5 w-100" id="contact-list">
                            {store.user?.eventos_asistido? (store.user?.eventos_asistido?.map((item, id) => (
                                <li className="list-group col-xl-3 col-lg-4 col-md-6 col-12 mb-2 pe-2 w-100 text-center" key={item.id}>
                                < SimpleCard id={item.id} evento={item.evento} descripcion={item.descripcion} ciudad={item.ciudad} fecha={item.fecha} />
                                </li>
                            ))
                            ) : (
                            "Sin eventos creados"
                            )}
                        </ul>
                    </div>
                    <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
                        <ul className="list-group d-flex flex-column mb-5 w-100" id="contact-list">
                            {store.user?.eventos_creados ? (store.user?.eventos_creados?.map((item, id) => (
                                <li className="list-group col-xl-3 col-lg-4 col-md-6 col-12 mb-2 pe-2 w-100" key={item.id}>
                                < SimpleCard id={item.id} evento={item.evento} descripcion={item.descripcion} ciudad={item.ciudad} fecha={item.fecha} />
                                </li>
                            ))
                            ) : (
                            "Sin eventos creados"
                            )}
                        </ul>              
                    </div>
                </div>




            
            {/* <div className="accordion mb-5" id="accordionExample">
                <div className="accordion-item mb-3 border-0">
                    <h2 className="accordion-header">
                    <button className="btn-400 accordion-button m-1" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Próximos eventos a los que asistir
                    </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <ul className="list-group d-flex flex-column mb-5 w-100" id="contact-list">
                            {store.user?.eventos_asistido? (store.user?.eventos_asistido?.map((item, id) => (
                                <li className="list-group col-xl-3 col-lg-4 col-md-6 col-12 mb-2 pe-2 w-100 text-center" key={item.id}>
                                < SimpleCard id={item.id} evento={item.evento} descripcion={item.descripcion} ciudad={item.ciudad} fecha={item.fecha} />
                                </li>
                            ))
                            ) : (
                            "Sin eventos creados"
                            )}
                        </ul>
                    </div>
                    </div>
                </div>
                <div className="accordion-item border-0 text-center">
                    <h2 className="accordion-header">
                    <button className="btn-400 accordion-button collapsed m-1" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Tus eventos creados
                    </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <ul className="list-group d-flex flex-column mb-5 w-100" id="contact-list">
                            {store.user?.eventos_creados ? (store.user?.eventos_creados?.map((item, id) => (
                                <li className="list-group col-xl-3 col-lg-4 col-md-6 col-12 mb-2 pe-2 w-100" key={item.id}>
                                < SimpleCard id={item.id} evento={item.evento} descripcion={item.descripcion} ciudad={item.ciudad} fecha={item.fecha} />
                                </li>
                            ))
                            ) : (
                            "Sin eventos creados"
                            )}
                        </ul>
                    </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
};