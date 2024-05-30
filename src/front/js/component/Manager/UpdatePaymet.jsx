import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Context } from '../../store/appContext';

import { GrFormPreviousLink } from "react-icons/gr";
import { GoHome } from "react-icons/go";
import { IoAddCircleOutline } from "react-icons/io5";

export const UpdatePayment = () => {
    const { actions, store } = useContext(Context);
    const [redirectPath, setRedirectPath] = useState('');
    const [counter, setCounter] = useState(7);
    const { payId } = useParams();
    const navigate = useNavigate();
    const [payData, setPayData] = useState(() => {
        const payToUpdate = store.quizzes.Quiz.find(pay => pay.id == payId)

        if (payToUpdate) {
            return {
                date: payToUpdate.date,
                titleCourse: payToUpdate.titleCourse,
                padAmount: payToUpdate.padAmount,
                typePayment: payToUpdate.typePayment,
                courseId: payToUpdate.courseId,  
                userId: payToUpdate.userId
            };
        } else {
            return {
                date: "",
                titleCourse: "",
                padAmount:  "",
                typePayment:  "",
                courseId:  "",  
                userId: ""
            };
        }
    })

    async function handleSubmit(event) {
        event.preventDefault();
        console.log(payData, payId)
        await actions.updateQuizzes(payData, payId);
        setCounter(0)
    }


    useEffect(() => {
        // Obtener los detalles del usuario específico y establecer los datos en el estado local
        const payToUpdate = store.quizzes.Quiz.find(quiz => pay.id === payId);
        if (payToUpdate) {
            setPayData({
                date: payToUpdate.date,
                titleCourse: payToUpdate.titleCourse,
                padAmount: payToUpdate.padAmount,
                typePayment: payToUpdate.typePayment,
                courseId: payToUpdate.courseId,  
                userId: payToUpdate.userId
            });
        }
    }, [payId, store.quizzes.Quiz]);

    const handleChange = e => {
        const { name, value } = e.target;

        setPayData(prevState => ({
            ...prevState,
            [name]: value
        }));

    };

    const handlerSubmit = (e) => {
        e.preventDefault();
        if (payData.titleCourse !== '' && payData.date !== '' && payData.padAmount !== '') {
            actions.updateQuizzes(payData, payId);

        } else {
            alert('No debe dejar ningun campo vacío');
        }
    }

    function handlerGoToHome() {
        navigate('/managerView');
    }

    function handlerHome() {
        navigate('/');
    }

    useEffect(() => {
        if (redirectPath !== '') {
            navigate(redirectPath);
        }
    }, [navigate, redirectPath]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCounter(prevCounter => {
                if (msgError === '' && msg2 === '') {
                    return

                } else if (store.error === '' && selectedRole !== '' && counter === 7) {
                    setRedirectPath(`/managerView`)
                    clearInterval(interval)
                }

                return prevCounter + 1;
            });
        }, 500);

        return () => clearInterval(interval);
    }, [setRedirectPath, store.error, counter, msg2, msgError]);


    const msgError = typeof store.error === 'string' ? store.error : JSON.stringify(store.error)
    const msg2 = typeof store.msg2 === 'string' ? store.msg2 : JSON.stringify(store.msg2)

    return (
        <div className="container mt-4 w-50">
            {/* Msg */}
            <div className='d-flex justify-content-center position-fixed position-absolute top-0 start-50 translate-middle-x'>
                {(msgError === '' && msg2 === '') ? (
                    <div className={`text-center mt-3 fs-4 fw-bold w-100 ${(counter >= 1 && counter <= 5) ? "alert alert-danger" : "d-none"}`}>
                        {"Internet or server connection failure"}
                    </div>
                ) : (msgError === '') ? (
                    <div className={`text-center mt-3 fs-4 fw-bold w-100 ${(counter >= 1 && counter <= 5) ? "alert alert-success" : "d-none"}`}>
                        {msg2}
                    </div>
                ) : (
                    <div className={`text-center mt-3 fs-4 fw-bold w-100 ${(counter >= 1 && counter <= 5) ? "alert alert-danger" : "d-none"}`}>
                        {msgError}
                    </div>
                )}
            </div>

            <h1>Update Quiz</h1>
            <div >
                <button onClick={handlerGoToHome}>Regresar</button>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title Course</label>
                        <input
                            type="text"
                            name="titleCourse"
                            value={payData.titleCourse}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Date</label>
                        <input
                            type="date"
                            name="date"
                            value={payData.date}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Type Payment</label>
                        <input
                            type="text"
                            name="typePayment"
                            value={payData.typePayment}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Pad Amount</label>
                        <input
                            type="text"
                            name="padAmount"
                            value={payData.padAmount}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>User ID</label>
                        <select className="form-select" name='userId' onChange={handleChange} value={payData.userId} required>
                            <option value="">--Choose--</option>
                            {
                                store.user.access_to_user.map((item, index) => (
                                    <option key={index} value={item.id}>#{item.id}/{item.name}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Course ID</label>
                        <select className="form-select" name='courseId' onChange={handleChange} value={payData.courseId} required>
                            <option value="">--Choose--</option>
                            {
                                store.course.Courses.map((item, index) => (
                                    <option key={index} value={item.id}>#{item.id}/{item.title}</option>
                                ))
                            }
                        </select>
                    </div>
                </form>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handlerSubmit}>
                    {
                        (store.spinner)
                            ? <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            : <div className="row align-items-center ">
                                <div className="col align-self-center text-center fs-4">
                                    <span>Update User</span>
                                </div>
                            </div>
                    }
                </button>
            </div>
        </div>
    );
}




