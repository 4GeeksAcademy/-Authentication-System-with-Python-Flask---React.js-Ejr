import React, { useState } from "react";
import GenderMale from "../../img/register-form/GenderMale.png";
import GenderFemale from "../../img/register-form/GenderFemale.png";
import GenderIntersex from "../../img/register-form/GenderIntersex.png";
import BackArrow from "../../img/register-form/VectorBack.png"; // Imagen para la flecha hacia atrás

export const RegistrationForm = () => {
    const [selectedGender, setSelectedGender] = useState(null);
    const [selectedButton, setSelectedButton] = useState(null);

    const handleGenderSelect = (gender) => {
        setSelectedGender(gender);
    };

    const handleButtonClick = (button) => {
        setSelectedButton(button);
    };

    return (
        <div
            style={{
                minHeight: '100vh',
                backgroundColor: '#272932',
                fontFamily: 'Poppins',
                marginTop: '110px',
                padding: '0 15px' // Padding horizontal para evitar que el contenido choque con los bordes
            }}
            className="d-flex flex-column "
        >
            <div className="row mt-4">
                <div className="col text-center">
                    <h1
                        style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 'bold',
                            fontSize: '36px',
                            color: '#FFFFFF'
                        }}
                    >
                        Personal Information
                    </h1>
                </div>
            </div>
            <div className="row mt-4 justify-content-center">
                <div className="col-12 col-md-5">
                    <label
                        htmlFor="username"
                        style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: '400',
                            fontSize: '20px',
                            color: '#FFFFFF'
                        }}
                    >
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="form-control custom-placeholder"
                        placeholder="Username"
                        style={{
                            backgroundColor: '#797979',
                            color: '#FFFFFF',
                            border: 'none'
                        }}
                    />
                </div>
                <div className="col-12 col-md-3 mt-3 mt-md-0">
                    <label
                        htmlFor="dob"
                        style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: '400',
                            fontSize: '20px',
                            color: '#FFFFFF'
                        }}
                    >
                        Date of Birth
                    </label>
                    <input
                        type="text"
                        id="dob"
                        className="form-control custom-placeholder"
                        placeholder="Date of Birth"
                        style={{
                            backgroundColor: '#797979',
                            color: '#FFFFFF',
                            border: 'none'
                        }}
                    />
                </div>
            </div>

            <div className="row mt-4 justify-content-center">
                <div className="col-12 col-md-4">
                    <label
                        htmlFor="name"
                        style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: '400',
                            fontSize: '20px',
                            color: '#FFFFFF'
                        }}
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="form-control custom-placeholder"
                        placeholder="Name"
                        style={{
                            backgroundColor: '#797979',
                            color: '#FFFFFF',
                            border: 'none'
                        }}
                    />
                </div>
                <div className="col-12 col-md-4 mt-3 mt-md-0">
                    <label
                        htmlFor="lastname"
                        style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: '400',
                            fontSize: '20px',
                            color: '#FFFFFF'
                        }}
                    >
                        Last name
                    </label>
                    <input
                        type="text"
                        id="lastname"
                        className="form-control custom-placeholder"
                        placeholder="Lastname"
                        style={{
                            backgroundColor: '#797979',
                            color: '#FFFFFF',
                            border: 'none'
                        }}
                    />
                </div>
            </div>

            <div className="row mt-4 text-center">
                <div className="col-12">
                    <h2
                        style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: '400',
                            fontSize: '20px',
                            color: '#FFFFFF'
                        }}
                    >
                        Gender
                    </h2>
                </div>
            </div>

            <div className="row mt-2 justify-content-center">
                <div className="col-12 col-sm-4 col-md-2">
                    <div
                        className="d-flex flex-column align-items-center"
                        onClick={() => handleGenderSelect("male")}
                        style={{
                            backgroundColor: selectedGender === "male" ? "#700B97" : "#575757",
                            padding: "10px",
                            borderRadius: "10px",
                            cursor: "pointer"
                        }}
                    >
                        <img
                            src={GenderMale}
                            alt="Masculine"
                            style={{ width: '50px' }}
                        />
                        <p
                            style={{
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '20px',
                                color: '#FFFFFF',
                                marginTop: '10px'
                            }}
                        >
                            Masculine
                        </p>
                    </div>
                </div>
                <div className="col-12 col-sm-4 col-md-2 mt-3 mt-sm-0">
                    <div
                        className="d-flex flex-column align-items-center"
                        onClick={() => handleGenderSelect("female")}
                        style={{
                            backgroundColor: selectedGender === "female" ? "#700B97" : "#575757",
                            padding: "10px",
                            borderRadius: "10px",
                            cursor: "pointer"
                        }}
                    >
                        <img
                            src={GenderFemale}
                            alt="Feminine"
                            style={{ width: '50px' }}
                        />
                        <p
                            style={{
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '20px',
                                color: '#FFFFFF',
                                marginTop: '10px'
                            }}
                        >
                            Feminine
                        </p>
                    </div>
                </div>
                <div className="col-12 col-sm-4 col-md-2 mt-3 mt-sm-0">
                    <div
                        className="d-flex flex-column align-items-center"
                        onClick={() => handleGenderSelect("other")}
                        style={{
                            backgroundColor: selectedGender === "other" ? "#700B97" : "#575757",
                            padding: "10px",
                            borderRadius: "10px",
                            cursor: "pointer"
                        }}
                    >
                        <img
                            src={GenderIntersex}
                            alt="Other"
                            style={{ width: '50px' }}
                        />
                        <p
                            style={{
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '20px',
                                color: '#FFFFFF',
                                marginTop: '10px'
                            }}
                        >
                            Other
                        </p>
                    </div>
                </div>
            </div>

            <div className="row mt-4 justify-content-center">
                <div className="col-12 col-md-4">
                    <label
                        htmlFor="password"
                        style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: '400',
                            fontSize: '20px',
                            color: '#FFFFFF'
                        }}
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="form-control custom-placeholder"
                        placeholder="Password"
                        style={{
                            backgroundColor: '#797979',
                            color: '#FFFFFF',
                            border: 'none'
                        }}
                    />
                </div>
                <div className="col-12 col-md-4 mt-3 mt-md-0">
                    <label
                        htmlFor="confirmPassword"
                        style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: '400',
                            fontSize: '20px',
                            color: '#FFFFFF'
                        }}
                    >
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="form-control custom-placeholder"
                        placeholder="Confirm Password"
                        style={{
                            backgroundColor: '#797979',
                            color: '#FFFFFF',
                            border: 'none'
                        }}
                    />
                </div>
            </div>


            <div className="row mt-5 text-center mb-5">
            <div className="col-12 d-flex justify-content-center flex-nowrap" style={{ gap: '20px' }}>
                    <button
                        onClick={() => handleButtonClick("back")}
                        style={{
                            background: selectedButton === "back"
                                ? 'linear-gradient(0deg, #8C67F6 0%, #4B3783 100%)'
                                : '#383838',
                            color: '#FFFFFF',
                            borderRadius: '10px',
                            padding: '10px 20px',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                        }}
                    >
                        <img src={BackArrow} alt="Back" style={{ width: '20px', marginRight: '10px' }} />
                        Back
                    </button>
                    <button
                        onClick={() => handleButtonClick("start")}
                        style={{
                            background: selectedButton === "start"
                                ? 'linear-gradient(0deg, #8C67F6 0%, #4B3783 100%)'
                                : '#383838',
                            color: '#FFFFFF',
                            borderRadius: '10px',
                            padding: '10px 20px',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        Start!
                    </button>
                </div>
            </div>
        </div>
    );
};
