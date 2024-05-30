
import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../../store/appContext'

export const PostCourse = () => {
    const { store, actions } = useContext(Context)
    const [active, setActive] = useState(false)
    const [counter, setCounter] = useState(7)
    const [courseData, setCourseData] = useState({
        title: '',
        categoryTitle: '',
        modulesLength: '',
        certificate: '',
        price: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData({
            ...courseData,
            [name]: value
        });
    };

    async function handlerCreateCourse(e) {
        e.preventDefault();
        if (courseData.title !== '' && courseData.categoryTitle !== '' && courseData.modulesLength !== '' && courseData.certificate !== '' && courseData.price !== '') {
            await actions.createCourseNew(courseData)
            setCounter(0)
        } else {
            alert('Ingrese todo los campos')
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setCounter(prevCounter => {
                return prevCounter + 1;
            });
        }, 500);

        return () => clearInterval(interval)
    }, [])

    const msgError = typeof store.error === 'string' ? store.error : JSON.stringify(store.error)
    const msg = typeof store.msg === 'string' ? store.msg : JSON.stringify(store.msg)

    return (
        <div className=' position-relative'>
            {/* Msg */}
            <div className='d-flex justify-content-center position-fixed position-absolute top-0 start-50 translate-middle-x'>
                {msgError === ''
                    ? <div className={`text-center mt-3 fs-4 fw-bold w-100 ${(counter >= 1 && counter <= 5) ? "alert alert-success" : "d-none"}`}>
                        {msg}
                    </div>
                    : <div className={`text-center mt-3 fs-4 fw-bold w-100 ${(counter >= 1 && counter <= 5) ? "alert alert-danger" : "d-none"}`}>
                        {msgError}
                    </div>}
            </div>

            <div className='col-md-12 col-lg-5 d-flex justify-content-center align-items-start'>
                <div className='border border-black rounded-3 mx-auto my-5 p-3 w-75'>
                    <div className="d-flex justify-content-center align-items-center mb-5">
                        <div className='d-flex justify-content-center align-items-center'>
                            <h1>Create Course New</h1>
                        </div>
                    </div>
                    <form onSubmit={handlerCreateCourse}>
                        <div>
                            <label>Title:</label>
                            <input
                                type="text"
                                name="title"
                                value={courseData.title}
                                onChange={handleChange}
                                id="validationFormCheck1"
                                className="form-control" />
                            <div className="invalid-feedback">
                                Please enter your information.
                            </div>
                        </div>
                        <div>
                            <label>Category Title:</label>
                            <input
                                type="text"
                                name="categoryTitle"
                                value={courseData.categoryTitle}
                                onChange={handleChange}
                                id="validationFormCheck1"
                                className="form-control" />
                            <div className="invalid-feedback">
                                Please enter your information.
                            </div>
                        </div>
                        <div>
                            <label>Modules Length:</label>
                            <input
                                type="number"
                                name="modulesLength"
                                value={courseData.modulesLength}
                                onChange={handleChange}
                                id="validationFormCheck1"
                                className="form-control" />
                            <div className="invalid-feedback">
                                Please enter your information.
                            </div>
                        </div>
                        <div>
                            <label>Certificate:</label>
                            <input
                                type="text"
                                name="certificate"
                                value={courseData.certificate}
                                onChange={handleChange}
                                id="validationFormCheck1"
                                className="form-control" />
                            <div className="invalid-feedback">
                                Please enter your information.
                            </div>
                        </div>
                        <div>
                            <label>Price:</label>
                            <input
                                type="number"
                                name="price"
                                value={courseData.price}
                                onChange={handleChange}
                                id="validationFormCheck1"
                                className="form-control" />
                            <div className="invalid-feedback">
                                Please enter your information.
                            </div>
                        </div>
                        <button className="btn btn-primary my-3" type='submit'>Upload Course</button>
                    </form>
                </div>
            </div>

        </div>
    );
};


