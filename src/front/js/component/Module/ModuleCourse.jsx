import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../../store/appContext';
import { useNavigate } from 'react-router-dom';
import { GoArrowLeft } from "react-icons/go";

export const ModuleCourse = () => {
    const { store, actions } = useContext(Context);
    const [counter, setCounter] = useState(7);
    const [formData, setFormData] = useState({
        descriptionContent: '',
        title: '',
        urlVideo: store.media,
        videoId: '',
        imageId: '',
        totalVideo: '',
        dateCreate: '',
        tokenModule: '',
        courseId: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const resetFormData = () => {
        setFormData({
            descriptionContent: '',
            title: '',
            urlVideo: '',
            videoId: '',
            imageId: '',
            totalVideo: '',
            dateCreate: '',
            tokenModule: '',
            courseId: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.title !== '' && formData.descriptionContent !== '') {
            console.log("Creating course with data:", formData);
            await actions.postModule(formData);
            setCounter(0);
            resetFormData();
        } else {
            alert('Ingrese todos los campos');
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCounter(prevCounter => prevCounter + 1);
        }, 500);

        return () => clearInterval(interval);
    }, []);

    const uploadMedia = async (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            await actions.uploadCloudinaryMedia(files);
            console.log("Uploaded media:", store.media);
        }
    };

    useEffect(() => {
        console.log("Media updated:", store.media);
        setFormData(prevData => ({
            ...prevData,
            urlVideo: store.media
        }));
    }, [store.media]);

    const toTime = (segundos) => {
        const horas = Math.floor(segundos / 3600);
        const minutos = Math.floor((segundos % 3600) / 60);
        const segundosRestantes = segundos % 60;
        return `${horas} horas, ${minutos} minutos, ${segundosRestantes} segundos`;
    };

    console.log(formData);

    const msgError = typeof store.error === 'string' ? store.error : JSON.stringify(store.error);
    const msg = typeof store.msg === 'string' ? store.msg : JSON.stringify(store.msg);

    return (
        <div className="container position-relative">
            {/* Msg */}
            <div className='d-flex justify-content-center position-fixed position-absolute top-0 start-50 translate-middle-x'>
                {(msgError === '' && msg === '') ? (
                    <div className={`text-center mt-3 fs-4 fw-bold w-100 ${(counter >= 1 && counter <= 5) ? "alert alert-danger" : "d-none"}`}>
                        {"Internet or server connection failure"}
                    </div>
                ) : (msgError === '') ? (
                    <div className={`text-center mt-3 fs-4 fw-bold w-100 ${(counter >= 1 && counter <= 5) ? "alert alert-success" : "d-none"}`}>
                        {msg}
                    </div>
                ) : (
                    <div className={`text-center mt-3 fs-4 fw-bold w-100 ${(counter >= 1 && counter <= 5) ? "alert alert-danger" : "d-none"}`}>
                        {msgError}
                    </div>
                )}
            </div>

            <h2>Create Course Module</h2>
            <form onSubmit={handleSubmit}>
                <div className="container">
                    <h2 className="text-center my-4">Upload Media</h2>
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <input type="file" className="form-control" onChange={uploadMedia} />
                        </div>
                    </div>
                    <div className="row justify-content-center my-4">
                        <div className="col-md-8">
                            {store.loading ? (
                                <div className="text-center">
                                    <div className="spinner-border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            ) : (
                                store.media && (
                                    store.mediaType === 'image' ? (
                                        <img src={store.media} className="img-fluid" alt="Uploaded" />
                                    ) : (
                                        <video controls className="img-fluid">
                                            <source src={store.media} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    )
                                )
                            )}
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label>Title</label>
                    <select
                        className="form-select"
                        name='title'
                        onChange={handleChange}
                        value={formData.title}
                        required>
                        <option value="">--Choose--</option>
                        {
                                (!store.course.access_to_courses) 
                                ? <option disabled>Sin Datos</option>
                                : store.course.access_to_courses.map((item, index) => (
                                    <option key={index} value={item.title}>#{item.id} /{item.title}</option>
                                ))
                        }
                    </select>
                </div>

                <div className="form-group">
                    <label>Description Content</label>
                    <select
                        className="form-select"
                        name='descriptionContent'
                        onChange={handleChange}
                        value={formData.descriptionContent}
                        required>
                        <option value="">--Choose--</option>
                        {
                            (!store.course.access_to_courses) ? <option disabled>Sin Datos</option>
                                : store.course.access_to_courses.map((item, index) => (
                                    <option key={index} value={item.description}>#{item.id} /{item.description}</option>
                                ))
                        }
                    </select>
                </div>

                <div className="form-group">
                    <label>Video ID</label>
                    <select
                        className="form-select"
                        name='videoId'
                        onChange={handleChange}
                        value={formData.videoId}
                        required>
                        <option value="">--Choose--</option>
                        {
                            (store.medios.length === 0) ? (
                                <option disabled>Sin Datos</option>
                            ) : (
                                store.medios.map((item, index) => (
                                    <option key={index} value={item.version_id}>
                                        #{item.original_filename}.{item.format}
                                    </option>
                                ))
                            )
                        }
                    </select>
                </div>

                <div className="form-group">
                    <label>Image ID</label>
                    <select
                        className="form-select"
                        name='imageId'
                        onChange={handleChange}
                        value={formData.imageId}
                        required>
                        <option value="">--Choose--</option>
                        {
                            (store.medios.length === 0) ? (
                                <option disabled>Sin Datos</option>
                            ) : (
                                store.medios.map((item, index) => (
                                    <option key={index} value={item.version_id}>
                                        #{item.original_filename}.{item.format}
                                    </option>
                                ))
                            )
                        }
                    </select>
                </div>

                <div className="form-group">
                    <label>Total Video</label>
                    <select
                        className="form-select"
                        name='videoTotal'
                        onChange={handleChange}
                        value={formData.videoTotal}
                        required>
                        <option value="">--Choose--</option>
                        {
                            (store.medios.length === 0) ? (
                                <option disabled>Sin Datos</option>
                            ) : (
                                store.medios.map((item, index) => (
                                    <option key={index} value={toTime(item.duration)}>
                                        #{item.id} /{toTime(item.duration)} hrs
                                    </option>
                                ))
                            )
                        }
                    </select>
                </div>

                <div className="form-group">
                    <label>Course Id</label>
                    <select
                        className="form-select"
                        name='courseId'
                        onChange={handleChange}
                        value={formData.courseId}
                        required>
                        <option value="">--Choose--</option>
                        {
                            (!store.course.access_to_courses) ? <option disabled>Sin Datos</option>
                                : store.course.access_to_courses.map((item, index) => (
                                    <option key={index} value={item.id}>#{item.id} /{item.title}</option>
                                ))
                        }
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Create Module</button>
            </form>

            {/* Uncomment this button if you want to navigate back */}
            <button onClick={() => navigate(-1)} className="btn btn-secondary">
                <GoArrowLeft /> Back
            </button>
        </div>
    );
};
