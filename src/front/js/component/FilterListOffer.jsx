import React, { useState } from "react";
import "../../styles/FilterListOffer.css";

export const FilterListOffer = () => {
    const [filters, setFilters] = useState({
        selectedCategories: [], 
        salary: [0, 100000],
        searchText: "",
        modalities: [], 
        location: "",
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
                <h3>Categoría</h3>
                <label>
                    <input
                        type="checkbox"
                        name="selectedCategories"
                        value="Frontend"
                        checked={filters.selectedCategories.includes("Frontend")}
                        onChange={handleCheckboxChange}
                    />
                    Frontend
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="selectedCategories"
                        value="Backend"
                        checked={filters.selectedCategories.includes("Backend")}
                        onChange={handleCheckboxChange}
                    />
                    Backend
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="selectedCategories"
                        value="UI/UX"
                        checked={filters.selectedCategories.includes("UI/UX")}
                        onChange={handleCheckboxChange}
                    />
                    UI/UX
                </label>
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
                <h3>Tipo de Contrato</h3>
                <label>
                    <input
                        
                        type="checkbox"
                        name="modalities"
                        value="full-time"
                        checked={filters.modalities.includes("full-time")}
                        onChange={handleCheckboxChange}
                    />
                    Tiempo Completo
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="modalities"
                        value="part-time"
                        checked={filters.modalities.includes("part-time")}
                        onChange={handleCheckboxChange}
                    />
                    Medio Tiempo
                </label>
                <label htmlFor="modalities">
                    <input
                        type="checkbox"
                        name="modalities"
                        value="freelance"
                        checked={filters.modalities.includes("freelance")}
                        onChange={handleCheckboxChange}
                    />
                    Freelance
                </label>
            </div>

            <div>
                <h3>Ubicación</h3>
                <label htmlFor="location">Buscar por Provincia o País:</label>
                <input
                    className="form-control"
                    id="location"
                    type="text"
                    name="location"
                    placeholder="Buscar por Provincia o País"
                    value={filters.location}
                    onChange={handleInputChange}
                />
            </div>

            <div>
                <h3>Nivel de Experiencia</h3>
                <label htmlFor="experience">Seleccionar nivel:</label>
                <select
                    className="form-control"
                    id="experience"
                    name="experience"
                    value={filters.experience}
                    onChange={handleInputChange}
                >
                    <option value="">Seleccionar nivel</option>
                    <option value="Junior">Junior</option>
                    <option value="Mid-senior">Mid-senior</option>
                    <option value="Senior">Senior</option>
                </select>
            </div>

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
        </div>
    );
};
