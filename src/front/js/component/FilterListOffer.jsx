import React, { useState } from "react";
import "../../styles/FilterListOffer.css";

export const FilterListOffer = () => {
    const [filters, setFilters] = useState({
        plazo: "",
        salary: [0, 100000],
        searchText: "",
        fecha_publicacion: "",
        experience: ""
    });

    const handleCheckboxChange = (event) => {
        const { name, value, checked } = event.target;

        setFilters(prevFilters => {
            const newValue = checked
                ? [...prevFilters[name], value]
                : prevFilters[name].filter(item => item !== value);

            return {
                ...prevFilters,
                [name]: newValue
            };
        });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const handleSalaryChange = (event) => {
        const [min, max] = event.target.value.split(',').map(Number);
        setFilters(prevFilters => ({
            ...prevFilters,
            salary: [min, max]
        }));
    };

    return (
        <div className="FilterListOffer-box p-3 ms-5 shadow-lg">
            <h2 className="text-start fw-bold text-muted fs-4">Filtrar Ofertas</h2>
            <div>
                <h3>Buscar</h3>
                <label htmlFor="searchText">Buscar por título o descripción:</label>
                <input
                    className="form-control"
                    id="searchText"
                    type="text"
                    name="searchText"
                    placeholder="Buscar por título o descripción"
                    value={filters.searchText}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <h3>Plazo</h3>
                <label htmlFor="plazo">Seleccione un plazo:</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="YYYY-M-D"
                    name="plazo"
                    id="plazo"
                    required
                    onChange={handleInputChange}
                    value={filters.plazo}
                />
            </div>

            <div>
                <h3>Rango de Salario</h3>
                <label htmlFor="salaryMin">Salario Mínimo:</label>
                <input
                    id="salaryMin"
                    type="range"
                    min="0"
                    max="100000"
                    step="1000"
                    value={filters.salary[0]}
                    onChange={(e) => handleSalaryChange({ target: { value: `${e.target.value},${filters.salary[1]}` } })}
                />
                <label htmlFor="salaryMax">Salario Máximo:</label>
                <input
                    id="salaryMax"
                    type="range"
                    min="0"
                    max="100000"
                    step="1000"
                    value={filters.salary[1]}
                    onChange={(e) => handleSalaryChange({ target: { value: `${filters.salary[0]},${e.target.value}` } })}
                />
                <p>
                    Salario: ${filters.salary[0]} - ${filters.salary[1]}
                </p>
            </div>

            <div>
                <h3>Experiencia</h3>
                <label>
                    <input
                        type="checkbox"
                        name="experience"
                        value="Junior"
                        checked={filters.experience.includes("Junior")}
                        onChange={handleCheckboxChange}
                    />
                    Junior
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="experience"
                        value="Mid-senior"
                        checked={filters.experience.includes("Mid-senior")}
                        onChange={handleCheckboxChange}
                    />
                    Mid-senior
                </label>
                <label htmlFor="experience">
                    <input
                        type="checkbox"
                        name="experience"
                        value="Senior"
                        checked={filters.experience.includes("Senior")}
                        onChange={handleCheckboxChange}
                    />
                    Senior
                </label>
            </div>

            <div>
                <h3>Fecha de publicacion</h3>
                <label htmlFor="location">Seleccione fecha:</label>
                <input
                    className="form-control"
                    id="fecha_publicacion"
                    type="text"
                    name="fecha_publicacion"
                    placeholder="Buscar por fecha de publicacion:"
                    value={filters.fecha_publicacion}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    );
};
