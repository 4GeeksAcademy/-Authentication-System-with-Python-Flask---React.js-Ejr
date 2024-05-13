import React, { useState, useEffect, useContext } from "react";
import "./../../../styles/User/userForm.css";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";

const userForm = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        surnames: '',
        age: '',
        height: '',
        weight: '',
        illness: '',
        objetives: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit = () => {
        try {

            if (
                formData.name === '' ||
                formData.age === '' ||
                formData.height === '' ||
                formData.weight === '' ||
                formData.illness === ''
            ) {
                alert('Por favor, complete todos los campos.');
                return;
            }

            const response = fetch(`${process.env.BACKEND_URL}/user_data`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": store.token
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                navigate('/user');
            } else {
                console.error('Error al enviar los datos');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    }

    return (
        <div className="container-form">
        <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
        }}>
                <label>
                    Name and Surnames:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Age 
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        min="16"
                        required
                    />
                </label>
                <br />
                <label>
                    Height (cm):
                    <input
                        type="number"
                        name="height"
                        value={formData.height}
                        onChange={handleChange}
                        placeholder="000"
                        required
                    />
                </label>
                <br />
                <label>
                    Weight (kg):
                    <input
                        type="text"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        pattern="\d+(\,\d{1,2})?"
                        placeholder="00.00"
                        required
                    />
                </label>
                <br />
                <label>
                    Illness:
                    <input
                        type="text"
                        name="illness"
                        value={formData.illness}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Objetives:
                    <input
                        type="text"
                        name="objetives"
                        value={formData.objetives}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <button type="submit">Send</button>
            </form>

        </div>
    );
}
export default userForm;