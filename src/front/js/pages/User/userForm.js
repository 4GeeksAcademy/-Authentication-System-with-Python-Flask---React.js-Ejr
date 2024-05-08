import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../../store/appContext";

const userForm = () => {
    const { store, actions } = useContext(Context);
    const [formData, setFormData] = useState({
        name: '',
        surnames: '',
        age: '',
        height: '',
        weight: '',
        objetives: '',
        illness: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit = () => {
        try {

            if (
                formData.name === '' ||
                formData.surnames === '' ||
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
                history.push('/user');
            } else {
                console.error('Error al enviar los datos');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
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
                Surnames:
                <input
                    type="text"
                    name="surnames"
                    value={formData.surnames}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />
            <label>
                Age:
                <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
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
                    required
                />
            </label>
            <br />
            <label>
                Weight (kg):
                <input
                    type="number"
                    name="weight"
                    value={formData.weight}
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
            <button type="submit">Send</button>
        </form>
    );
}
export default userForm;