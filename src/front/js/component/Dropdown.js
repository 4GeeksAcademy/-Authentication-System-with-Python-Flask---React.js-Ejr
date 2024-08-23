import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import countries from 'world-countries';


const formatOptionLabel = ({ value, label, flag }) => (
    <div className="d-flex align-items-center">
        <img src={`https://flagcdn.com/w20/${value.toLowerCase()}.png`} alt={label} style={{ width: '20px', marginRight: '10px' }} />
        <span>{label} ({value})</span>
    </div>
);

const CountrySelector = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

   
    const [selectedCountry, setSelectedCountry] = useState({
        value: 'ES',
        label: 'Spain',
        flag: '🇪🇸'
    });

   
    const countryOptions = countries.map((country) => ({
        value: country.cca2,
        label: country.name.common,
        flag: `https://flagcdn.com/w20/${country.cca2.toLowerCase()}.png` 
    }));


    const handleCountryChange = (selectedOption) => {
        setSelectedCountry(selectedOption);
        setDropdownOpen(false); 
    };

    return (
        <div className="d-flex align-items-center">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="ms-3" />
            {!dropdownOpen && (
                <button 
                    className="btn btn-link d-flex align-items-center p-0" 
                    onClick={() => setDropdownOpen(true)}
                >
                    <img 
                        src={selectedCountry.flag} 
                        alt={selectedCountry.label} 
                        style={{ width: '30px', marginRight: '20px' }} 
                    />
                    <span className="ms-2">{selectedCountry.value}</span>
                    <FontAwesomeIcon icon={faCaretDown} className="ms-2" />
                </button>
            )}

            
            {dropdownOpen && (
                <Select
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    options={countryOptions}
                    formatOptionLabel={formatOptionLabel}
                    className="country-select"
                    styles={customSelectStyles}  
                    autoFocus  
                />
            )}

            
        </div>
    );
};


const customSelectStyles = {
    control: (provided) => ({
        ...provided,
        minWidth: '150px',
        borderColor: '#007bff',
    }),
    menu: (provided) => ({
        ...provided,
        zIndex: 9999,  
    }),
};

export default CountrySelector;
