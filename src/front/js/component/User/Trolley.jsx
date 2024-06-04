import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Context } from '../../store/appContext.js';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import { CourseCard } from '../Courses/CourseCard.jsx';
import { UserNavbar } from '../../component/User/UserNavbar.jsx';

export const Trolley = () => {
    const { store, actions } = useContext(Context);

    const [price, setPrice] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    // Obtener courseId de location.state, si está presente
    const courseId = location.state?.courseId;

    const calculateTotalPrice = () => {
        return store?.courseFavorite?.reduce((total, item) => total + item.price, 0);
    };

    useEffect(() => {
        const totalPrice = calculateTotalPrice();
        setPrice(totalPrice);
    }, [store.courseFavorite]);

    const handleCheckout = () => {
        if (courseId !== undefined) {
            navigate('/paypal', { state: { totalPrice: price, numberCourse: courseId } });
        } else {
            alert('Course ID is not available.');
        }
    };

    return (
        <div>
        <UserNavbar />
        <button
            className="btnFav d-flex justify-content-center align-items-center top-50 end-0 translate-middle-y ms-3 mt-3"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasScrolling"
            aria-controls="offcanvasScrolling"
            onClick={() => navigate(`/`)}
        >
            <FaArrowLeft />
        </button>
        <div className="container mt-5">
            <h1 className="text-center mb-5">Favorite courses</h1>
            <div className="row justify-content-center">
                <div className="col-9">
                    {store.courseFavorite.length === 0 ? (
                        <p className="text-center">No hay Cursos Cargados</p>
                    ) : (
                        <table className="table table-striped table-hover my-5">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Title Course</th>
                                    {/* <th scope="col">Price</th> */}
                                    <th scope="col">Date</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {store.courseFavorite.map((item, index) => (
                                    <tr key={index}>
                                        <th scope="row">{item.id}</th>
                                        <td>{item.titleCourse}</td>
                                        {/* <td>{item.price}</td> */}
                                        <td>{item.date}</td>
                                        <td>
                                            <button className="btn btn-sm btn-danger" onClick={() => actions.deleteTrolley(item.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    </div>
    );
};
