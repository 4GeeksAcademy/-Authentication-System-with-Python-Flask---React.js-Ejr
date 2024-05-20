import React, { useState, useEffect, useContext } from "react";
import "./../../../styles/User-styles/userForm.css";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const userForm = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        user_name: '',
        //age: '',
        user_height: '',
        user_weight: '',
        user_illness: '',
        user_objetives: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handleSubmit = async () => {

        try {

            if (
                formData.user_name === '' ||
                //formData.user_age === '' ||
                formData.user_height === '' ||
                formData.user_weight === '' ||
                formData.user_illness === ''
            ) {
                alert('Please, complete all fields.');
                return;
            } else {
                await actions.postUserData(formData);
                navigate(`/user/${store.user_id}`)
            }
        }

        catch (error) {
            console.error('Error de red:', error);
        }
    };

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
                        name="user_name"
                        value={formData.user_name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Age
                    <input
                        type="number"
                        name="user_age"
                        //value={formData.user_age}
                        //onChange={handleChange}
                        min="16"
                        required
                    />
                </label>
                <br />
                <label>
                    Height (cm):
                    <input
                        type="number"
                        name="user_height"
                        value={formData.user_height}
                        onChange={handleChange}
                        placeholder="000"
                        required
                    />
                </label>
                <br />
                <label>
                    Weight (kg):
                    <input
                        type="number"
                        name="user_weight"
                        value={formData.user_weight}
                        onChange={handleChange}
                        pattern="\d+(\.\d{1,2})?"
                        placeholder="00.00"
                        required
                    />
                </label>
                <br />
                <label>
                    Illness:
                    <input
                        type="text"
                        name="user_illness"
                        value={formData.user_illness}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Objetives:
                    <input
                        type="text"
                        name="user_objetives"
                        value={formData.user_objetives}
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