import React, { useState } from "react";
import "../../styles/FilterListOffer.css";

export const FilterListOffer = () => {
    const [filters, setFilters] = useState({
        selectedCategory: "",
        salary: [0, 100000],
        searchText: "",
        modality: "",
        location: "",
        experience: ""
    });

    const handleFilterChange = (event) => {
        const { name, value, type, checked } = event.target;

        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: type === 'checkbox' ? checked : value
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
                <h3>Categoría</h3>
                <label>
                    <input
                        type="radio"
                        name="Frontend"
                        value="tech"
                        checked={filters.selectedCategory === "Frontend"}
                        onChange={handleFilterChange}
                    />
                    Frontend
                </label>
                <label>
                    <input
                        type="radio"
                        name="selectedCategory"
                        value="Backend"
                        checked={filters.selectedCategory === "Backend"}
                        onChange={handleFilterChange}
                    />
                    Backend
                </label>
                <label>
                    <input
                        type="radio"
                        name="selectedCategory"
                        value="UI/UX"
                        checked={filters.selectedCategory === "UI/UX"}
                        onChange={handleFilterChange}
                    />
                    UI/UX
                </label>
            </div>

            <div>
                <h3>Rango de Salario</h3>
                <input
                    type="range"
                    min="0"
                    max="100000"
                    step="1000"
                    value={filters.salary[0]}
                    onChange={(e) => handleSalaryChange({ target: { value: `${e.target.value},${filters.salary[1]}` } })}
                />
                <input
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
                <h3>Tipo de Contrato</h3>
                <label>
                    <input
                        type="radio"
                        name="contractType"
                        value="full-time"
                        checked={filters.modality === "full-time"}
                        onChange={handleFilterChange}
                    />
                    Tiempo Completo
                </label>
                <label>
                    <input
                        type="radio"
                        name="contractType"
                        value="part-time"
                        checked={filters.modality === "part-time"}
                        onChange={handleFilterChange}
                    />
                    Medio Tiempo
                </label>
                <label>
                    <input
                        type="radio"
                        name="contractType"
                        value="freelance"
                        checked={filters.modality === "freelance"}
                        onChange={handleFilterChange}
                    />
                    Freelance
                </label>
            </div>

            <div>
                <h3>Ubicación</h3>
                <select
                    name="location"
                    value={filters.location}
                    onChange={handleFilterChange}
                >
                    <option value="">Seleccionar ubicación</option>
                    <option value="remote">Remoto</option>
                    <option value="new-york">Nueva York</option>
                    <option value="san-francisco">San Francisco</option>
                </select>
            </div>

            <div>
                <h3>Nivel de Experiencia</h3>
                <select
                    name="experienceLevel"
                    value={filters.experience}
                    onChange={handleFilterChange}
                >
                    <option value="">Seleccionar nivel</option>
                    <option value="entry">Entrada</option>
                    <option value="mid">Medio</option>
                    <option value="senior">Senior</option>
                </select>
            </div>

            <div>
                <h3>Buscar</h3>
                <input
                    type="text"
                    name="searchText"
                    placeholder="Buscar por título o descripción"
                    value={filters.searchText}
                    onChange={handleFilterChange}
                />
            </div>
        </div>
    );
};
