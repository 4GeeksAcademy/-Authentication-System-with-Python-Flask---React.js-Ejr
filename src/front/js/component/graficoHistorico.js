import React, { useContext, useEffect, useState } from "react";
import ApexCharts from "apexcharts";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const GraficoHistorico = () => {
    const { store, actions } = useContext(Context);
    const [pesos, setPesos] = useState([]);
    const [fechas, setFechas] = useState([]);
    const [alturas, setAlturas] = useState([]);
    const [imc, setIMC] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        if (store.lastPhysicalUserInformationList.length > 0) {
            const pesosTemp = [];
            const alturasTemp = [];
            const fechasTemp = [];
            const imcTemp = [];

            store.lastPhysicalUserInformationList.forEach((item) => {
                pesosTemp.push(item.weight);
                // alturasTemp.push(item.height);

                console.log(item)
                fechasTemp.push(item.date);
                const calculatedIMC = (item.weight / Math.pow(item.height / 100, 2)).toFixed(2);
                imcTemp.push(parseFloat(calculatedIMC));
            });

            setPesos(pesosTemp);
            // setAlturas(alturasTemp);
            setFechas(fechasTemp);
            setIMC(imcTemp);
        }
    }, [store.lastPhysicalUserInformationList]);

    useEffect(() => {
        // if (pesos.length > 0 && alturas.length > 0 && imc.length > 0 && fechas.length > 0) {
        if (pesos.length > 0 && imc.length > 0 && fechas.length > 0) {
            const options = {
                series: [
                    {
                        name: "Peso",
                        data: pesos,
                        color: "#4ade80",
                    },
                    // {
                    //     name: "Altura",
                    //     data: alturas,
                    //     color: "#1A56DB",
                    // },
                    {
                        name: "IMC",
                        data: imc,
                        color: "#7E3BF2",
                    },
                ],
                chart: {
                    type: "area",
                    height: 350,
                    toolbar: { show: false },
                },
                xaxis: {
                    categories: fechas,
                    labels: {
                        rotate: -45,
                    },
                },
                yaxis: [
                    {
                        title: { text: "Peso (Kg)" },
                        labels: {
                            formatter: (value) => `${value} Kg`,
                        },
                    },
                    // {
                    //     opposite: true,
                    //     title: { text: "Altura (cm)" },
                    //     labels: {
                    //         formatter: (value) => `${value} cm`,
                    //     },
                    // },
                    {
                        opposite: true,
                        title: { text: "IMC" },
                        labels: {
                            formatter: (value) => value,
                        },
                    },
                ],
                tooltip: {
                    shared: true,
                    intersect: false,
                },
            };

            const chart = new ApexCharts(document.getElementById("combined-chart"), options);
            chart.render();

            return () => {
                chart.destroy();
            };
        }
    }, [pesos, imc, fechas]);

    useEffect(() => {
        async function fetchData() {
            const data = await actions.get_last_physical_user_information();
            console.log(store.lastPhysicalUserInformationList);
            
            if (store.lastPhysicalUserInformationList.length === 0) {
                setIsModalOpen(true)
            }
        }

        fetchData();
    }, [actions]);

    return (
        <div className="w-2/3 bg-white rounded-lg shadow dark:bg-neutral-800 p-4 md:p-6 mx-auto min-h-[60vh]">
            <span className="relative flex justify-center w-full sm:w-3/4 mx-auto">
                <div
                    className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-75"
                ></div>
                <span className="relative z-10 text-neutral-50 font-bold px-2 sm:px-6 bg-neutral-800 text-xl">Historico corporal</span>
            </span>
            <div id="combined-chart"></div>
            <div id="crud-modal" tabIndex="-1" aria-hidden="true" className={`${isModalOpen ? '' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen bg-neutral-950/40 backdrop-blur-sm transition-all ease-in flex`}>
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-neutral-700 px-2">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-neutral-600">
                            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                                No tienes información física
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-neutral-400 bg-transparent hover:bg-neutral-200 hover:text-neutral-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-neutral-600 dark:hover:text-white"
                            >
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="flex flex-col gap-4 p-4">
                            <p className="text-neutral-300 ">Actualmente no tienes información física agregada en tu cuenta, por favor agrega datos y vuelve a esta página</p>
                            <Link to='/profile' className="text-white w-full flex items-center bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800 transition-all ease-in">
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                Agregar Información
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
