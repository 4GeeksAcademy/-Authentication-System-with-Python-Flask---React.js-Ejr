import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { Context } from "../store/appContext";
import styles from "./SingupMaster.module.css";

const SingupMaster = () => {
    const { store, actions } = useContext(Context);
    const { creationState } = store;
    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState({
        email: "",
        username: "",
        password: "",
        name: "",
        last_name: "",
        role: "master",
        security_questions: [
            { question: "", answer: "" },
            { question: "", answer: "" }
        ]
    });

    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith("security_question_") || name.startsWith("security_answer_")) {
            const [type, index] = name.split("_").slice(-2);
            const newSecurityQuestions = [...userDetails.security_questions];
            newSecurityQuestions[index][type] = value;

            setUserDetails({ ...userDetails, security_questions: newSecurityQuestions });
        } else {
            setUserDetails({ ...userDetails, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await actions.createUser(userDetails);
        if (result) {
            setModalMessage(store.creationState.message);
            setModalVisible(true);
        } else {
            setModalMessage(store.creationState.error);
            setModalVisible(true);
        }
    };

    const handleModalClose = () => {
        setModalVisible(false);
        if (store.creationState.message) {
            navigate("/Login");
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h1>REGISTER</h1>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>First Name</label>
                    <input type="text" className={styles.input} name="name" value={userDetails.name} onChange={handleChange} required />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Last Name</label>
                    <input type="text" className={styles.input} name="last_name" value={userDetails.last_name} onChange={handleChange} required />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Email</label>
                    <input type="email" className={styles.input} name="email" value={userDetails.email} onChange={handleChange} required />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Username</label>
                    <input type="text" className={styles.input} name="username" autoComplete="off" value={userDetails.username} onChange={handleChange} required />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Password</label>
                    <input type="password" className={styles.input} name="password" value={userDetails.password} onChange={handleChange} required />
                </div>
                {userDetails.security_questions.map((sq, index) => (
                    <div key={index} className={styles.inputGroup}>
                        <label className={styles.label}>{`Security Question ${index + 1}`}</label>
                        <select name={`security_question_${index}`} value={sq.question} onChange={handleChange} required className={styles.securityQuestion}>
                            <option value="" disabled>Choose a question</option>
                            <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
                            <option value="What is the name of your first pet?">What is the name of your first pet?</option>
                            <option value="What is the name of the city where you were born?">What is the name of the city where you were born?</option>
                        </select>
                        <input type="text" name={`security_answer_${index}`} value={sq.answer} onChange={handleChange} required className={styles.input} />
                    </div>
                ))}
                <button type="submit" className={styles.buttonSave}>Sign up</button>
                <p>
                    Have an account? <Link to="/LoginUserV2" className={styles.link}>Login Here</Link>
                </p>
            </form>

            {/* Modal */}
            <Modal show={modalVisible} onHide={handleModalClose} className={styles.modalContent}>
                <Modal.Header closeButton>
                    <Modal.Title>Registration Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{modalMessage}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};


export default SingupMaster;
