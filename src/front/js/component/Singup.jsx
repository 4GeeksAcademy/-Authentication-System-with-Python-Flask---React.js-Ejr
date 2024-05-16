
import React, { useContext, useState } from "react"; // Importación de React y algunos hooks
import { Link, useNavigate } from "react-router-dom"; // Importación de Link para la navegación
import { Context } from "../store/appContext"; // Importación del contexto
import styles from "./Singup.module.css"; // Importación de estilos CSS

const Singup = () => {
    const { store, actions } = useContext(Context); // Obtención del estado global, las acciones y la función setStore desde el contexto
    const { creationState } = store; // Obtención del estado de inicio de sesión y los datos recuperados del usuario desde el estado global
    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState({
        email: "",
        username: "",
        password: "",
        name: "",
        last_name: "",
        role: "athlete",
        security_questions: [
            { question: "", answer: "" },
            { question: "", answer: "" }
        ]
    });
    // console.log(userDetails)
    const handleChange = (e) => {
        const { name, value } = e.target; // Extraemos name y value directamente del evento

        // Verificamos si estamos actualizando preguntas de seguridad
        if (name.startsWith("security_question_") || name.startsWith("security_answer_")) {
            // Extraemos el índice y el tipo desde el nombre del campo
            const [type, index] = name.split("_").slice(-2);
            const newSecurityQuestions = [...userDetails.security_questions];
            newSecurityQuestions[index][type] = value;

            setUserDetails({ ...userDetails, security_questions: newSecurityQuestions });
        } else {
            // Actualizamos el estado para campos normales
            setUserDetails({ ...userDetails, [name]: value });
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await actions.createUser(userDetails);
        if (result) {
            alert(store.creationState.message);
            navigate("/LoginUserV2");
        } else {
            alert(store.creationState.error);
        }
    };


    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h1>REGISTER</h1>
                <div className={styles.inputGroup}>
                    <input type="text" class="input" name="name" value={userDetails.name} onChange={handleChange} required />
                    <label className="label">First Name</label>
                </div>
                <div className={styles.inputGroup}>
                    <input type="text" name="last_name" value={userDetails.last_name} onChange={handleChange} required />
                    <label>Last Name</label>
                </div>
                <div className={styles.inputGroup}>
                    <input type="email" name="email" value={userDetails.email} onChange={handleChange} required />
                    <label>Email</label>
                </div>
                <div className={styles.inputGroup}>
                    <input type="text" name="username" autoComplete="off" value={userDetails.username} onChange={handleChange} required />
                    <label>Username</label>
                </div>
                <div className={styles.inputGroup}>
                    <input type="password" name="password" value={userDetails.password} onChange={handleChange} required />
                    <label>Password</label>
                </div>
                {/* Security Questions Inputs */}
                {userDetails.security_questions.map((sq, index) => (
                    <div key={index} className={styles.inputGroup}>
                        <select name={`security_question_${index}`} value={sq.question} onChange={handleChange} required className={styles.securityQuestion}>
                            <option value="" disabled selected>Choose a question</option>
                            <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
                            <option value="What is the name of your first pet?">What is the name of your first pet?</option>
                            <option value="What is the name of the city where you were born?">What is the name of the city where you were born?</option>
                        </select>
                        <input type="text" name={`security_answer_${index}`} value={sq.answer} onChange={handleChange} required />
                        <label>{`Answer ${index + 1}`}</label>
                    </div>
                ))}

                <button type="submit" className={styles.buttonSave}>Sign up</button>
                <p>
                    Have an account? <Link to="/LoginUserV2">Login Here</Link>
                </p>
            </form>
        </div>
    );
};

export default Singup;
