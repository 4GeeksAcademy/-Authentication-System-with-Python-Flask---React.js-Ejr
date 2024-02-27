import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export const EditProfile = () => {
    const { actions } = useContext(Context)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [passwordError, setPasswordError] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showConfirm, setShowConfirm] = useState(false)
    const [confirmError, setConfirmError] = useState('')
    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [birthdate, setBirthdate] = useState('')
    const [phone, setPhone] = useState('')
    const [phoneError, setPhoneError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const changes = {

        };

        try {

            if (username !== '') {
                changes.username = username
            }

            if (name !== '') {
                changes.name = name
            }

            if (lastname !== '') {
                changes.lastname = lastname
            }

            if (birthdate !== '') {
                changes.birthdate = birthdate
            }

            if (password !== '') {
                if (password !== confirmPassword) {
                    setConfirmError("Las contraseñas no coinciden");
                    return;
                }
                const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

                if (!passwordRegex.test(password)) {
                    setPasswordError("La contraseña debe tener al menos 8 caracteres, una mayúscula y un carácter especial");
                    return;
                }

                changes.password = password

            }

            if (phone !== '') {
                if (phone.length() !== 10) {
                    setPhoneError("Número de telefono invalido")
                    return;
                }

                changes.phone = phone
            }

            const result = await actions.editProfile(changes);
            console.log("Profile updated successfully:", result);

            setUsername('');
            setPassword('');
            setConfirmPassword('');
            setName('');
            setLastname('');
            setBirthdate('');
            setPhone('');
            setPasswordError('');
            setConfirmError('');
            setPhoneError('');

            useNavigate("/profile")
        } catch (error) {
            console.error("Error updating profile:", error);
        }

    }

    const handleInputChange = () => {
        setPasswordError('');
        setConfirmError('');
        setPhoneError('')
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirm(!showConfirm)
    }

    return (
        <div className="container edit">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <input type="text"
                                className="form-control"
                                id="username"
                                name="username-input"
                                value={username}
                                onChange={(e) => { setUsername(e.target.value); handleInputChange() }}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <input type="text"
                                className="form-control"
                                id="name"
                                name="name-input"
                                value={name}
                                onChange={(e) => { setName(e.target.value); handleInputChange() }}
                            />
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <input type="text"
                                    className="form-control"
                                    id="lastname"
                                    name="lastname-input"
                                    value={lastname}
                                    onChange={(e) => { setLastname(e.target.value); handleInputChange() }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <div className="input-group">
                                <input type="password"
                                    className="form-control"
                                    id="password"
                                    name="password-input"
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value); handleInputChange() }}
                                />
                                <button className="btn btn-outline-secondary" type="button" id="button-addon-password"
                                    onClick={togglePasswordVisibility}>
                                    <FontAwesomeIcon
                                        icon={showPassword ? faEyeSlash : faEye}
                                        className="eye-icon"
                                    /></button>
                            </div>
                            {passwordError && (
                                <div className="alert alert-danger" role="alert">
                                    {passwordError}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <div className="input-group">
                                <input type="password"
                                    className="form-control"
                                    id="confirm"
                                    name="confirm-input"
                                    value={confirmPassword}
                                    onChange={(e) => { setConfirmPassword(e.target.value); handleInputChange() }}
                                />
                                <button className="btn btn-outline-secondary" type="button" id="button-addon-confirm"
                                    onClick={toggleConfirmPasswordVisibility}>
                                    <FontAwesomeIcon
                                        icon={showConfirm ? faEyeSlash : faEye}
                                        className="eye-icon"
                                    /></button>
                            </div>
                            {confirmError && (
                                <div className="alert alert-danger" role="alert">
                                    {confirmError}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <input type="date"
                                className="form-control"
                                id="birthdate"
                                name="birthdate-input"
                                value={birthdate}
                                onChange={(e) => { setBirthdate(e.target.value); handleInputChange() }}
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <input type="tel"
                                className="form-control"
                                id="phonenumber"
                                name="phonenumber-input"
                                value={phone}
                                onChange={(e) => { setPhone(e.target.value); handleInputChange() }}
                            />
                            {phoneError && (
                                <div className="alert alert-danger" role="alert">
                                    {phoneError}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <button type="submit">Guardar</button>
                        </div>
                    </div>
                </div>
            </form >
        </div>
    );
}