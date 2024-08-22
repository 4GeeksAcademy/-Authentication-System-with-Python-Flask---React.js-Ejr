import React, { useContext, useEffect, useState } from "react";
import ApexCharts from "apexcharts";
import { Context } from "../store/appContext";

export const GraficoHistorico = () => {
    const { store, actions } = useContext(Context);
    const [pesos, setPesos] = useState([]);
    const [fechas, setFechas] = useState([]);
    console.log(store.lastPhysicalUserInformationList);

    useEffect(() => {
        // Iterar sobre store.lastPhysicalUserInformationList y actualizar los estados
        store.lastPhysicalUserInformationList.forEach((item) => {
            setPesos(prevPesos => [...prevPesos, item.weight]);
            setFechas(prevFechas => [...prevFechas, item.date]);
        });
    }, [store.lastPhysicalUserInformationList]);


    console.log(pesos);
    console.log(fechas);

    const options = {
        dataLabels: {
            enabled: true,
            style: {
                cssClass: 'text-xs text-white font-medium'
            },
        },
        grid: {
            show: false,
            strokeDashArray: 4,
            padding: {
                left: 16,
                right: 16,
                top: -26
            },
        },
        series: [
            {
                name: "",
                data: [...pesos],
                color: "#4ade80",
            },
        ],
        chart: {
            height: "100%",
            maxWidth: "100%",
            type: "area",
            fontFamily: "Inter, sans-serif",
            dropShadow: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
        },
        tooltip: {
            enabled: true,
            x: {
                show: false,
            },
        },
        legend: {
            show: true
        },
        fill: {
            type: "gradient",
            gradient: {
                opacityFrom: 0.55,
                opacityTo: 0,
                shade: "#10b981",
                gradientToColors: ["#22c55e"],
            },
        },
        stroke: {
            width: 6,
        },
        xaxis: {
            categories: [...fechas],
            labels: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            show: false,
            labels: {
                formatter: function (value) {
                    return value + " Kg";
                }
            }
        },
    };

    useEffect(() => {
        const chartElement = document.getElementById("data-labels-chart");
        if (chartElement && typeof ApexCharts !== 'undefined') {
            const chart = new ApexCharts(chartElement, options);
            chart.render();

            // Cleanup function to destroy the chart instance when component unmounts
            return () => {
                chart.destroy();
            };
        }
    }, [options]); // Dependencias que puedan afectar al gráfico

    useEffect(() => {
        actions.get_last_physical_user_information()
    }, []);

    return (
        <>
            <div className="w-2/3 bg-white rounded-lg shadow dark:bg-neutral-800 p-4 md:p-6 mx-auto">
                <div className="flex justify-between mb-5">

                    <div>
                        <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">Peso Corporal</h5>
                        {/* <p className="text-base font-normal text-gray-500 dark:text-gray-400">En KG</p> */}
                    </div>
                    {/* <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
                        23%
                        <svg className="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13V1m0 0L1 5m4-4 4 4" />
                        </svg>
                    </div> */}
                </div>
                <div id="data-labels-chart"></div>
                <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between mt-5">
                    <div className="flex justify-between items-center pt-5">
                        {/* <button
                            id="dropdownDefaultButton"
                            data-dropdown-toggle="lastDaysdropdown"
                            data-dropdown-placement="bottom"
                            className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
                            type="button">
                            Last 7 days
                            <svg className="w-2.5 m-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                            </button> */}
                        {/* <div id="lastDaysdropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                            <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Yesterday</a>
                            </li>
                            <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Today</a>
                            </li>
                            <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 7 days</a>
                            </li>
                            <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 30 days</a>
                            </li>
                            <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 90 days</a>
                            </li>
                            </ul>
                            </div> */}
                        {/* <a
                            href="#"
                            className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500  hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2">
                            Sales Report
                            <svg className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                            </svg>
                            </a> */}
                    </div>
                </div>
            </div>
        </>
    );
};