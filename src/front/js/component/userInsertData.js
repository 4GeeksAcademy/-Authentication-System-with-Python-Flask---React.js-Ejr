import React, { useState } from "react";

export const UserInsertData = () => {
    const [newDateTime, setNewDateTime] = useState([]);
    const [newLocation, setNewLocation] = useState([]);
    const [liters, setLiters] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setNewDateTime([...newDateTime, { label: newDateTime, done: false }]);
        setNewDateTime("");
        setNewLocation([...newLocation, { label: newLocation, done: false }]);
        setNewLocation("");
        setLiters([...liters, { label: liters, done: false }]);
        setLiters("");
    };

    const handleChange = (e) => {
        if (e.key === "Enter") {
            handleSubmit(e);
        } else {
            setNewDateTime(e.target.value);
            setNewLocation(e.target.value);
            setLiters(e.target.value);
        }
    };

    return (
        <div className="userInsertData container-fluid">
            <div className="input-group input-group-sm mb-3 ol-sm-10">
                <input
                    type="datetime-local"
                    id="collecting_time"
                    className="form-control"
                    placeholder="Date & Time"
                    aria-describedby="button-addon2"
                />
                <button className="btn btn-outline-secondary" type="button" id="button-addon2">
                    Add
                </button>
            </div>
            <div className="input-group input-group-sm mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Location"
                    aria-label="Location"
                    aria-describedby="button-addon2"
                />
                <button className="btn btn-outline-secondary" type="button" id="button-addon2">
                    Add
                </button>
            </div>
            <div className="input-group input-group-sm mb-3">

                <input
                    type="number"
                    className="form-control"
                    placeholder="Liters"
                    aria-label="Liters"
                    aria-describedby="button-addon2"
                />
                <button className="btn btn-outline-secondary" type="button" id="button-addon2">
                    Add
                </button>
            </div>

        </div>
    );
}; 