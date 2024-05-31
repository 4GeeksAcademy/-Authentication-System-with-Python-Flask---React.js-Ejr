import React, { useState, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Context } from "../../store/appContext";

export const HistoryCourses = () => {
    const { store, actions } = useContext(Context);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        titleOrder: '',
        price: '',
        total: '',
        userId: '',
        courseId: '',
        teacherId: ''
    });

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        actions.createOrders(formData)
            // .then(() => {

            //     actions.fetchOrders(formData)
            //         .then(orders => setOrders(orders))
            //         .catch(error => console.error("Error fetching orders:", error));
            //     setShowModal(false);
            // })
            // .catch(error => console.error("Error creating order:", error));
    };
     console.log(store.order)
    return (
        <div className="container mx-auto">
            <h1 className="text-center my-4">My Purchased Courses</h1>

            <Button variant="primary" onClick={handleShowModal}>Add Order</Button>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="titleOrder">
                            <Form.Label>Title of the Order</Form.Label>
                            <Form.Control type="text" name="titleOrder" value={formData.titleOrder} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="text" name="price" value={formData.price} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="total">
                            <Form.Label>Total</Form.Label>
                            <Form.Control type="text" name="total" value={formData.total} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="userId">
                            <Form.Label>User ID</Form.Label>
                            <Form.Control type="text" name="userId" value={formData.userId} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="courseId">
                            <Form.Label>Course ID</Form.Label>
                            <Form.Control type="text" name="courseId" value={formData.courseId} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="teacherId">
                            <Form.Label>Teacher ID</Form.Label>
                            <Form.Control type="text" name="teacherId" value={formData.teacherId} onChange={handleChange} />
                        </Form.Group>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <div className=' mx-5 my-2 py-3 px-3 text-center'>
                    <div>
                        {store.order === '' ? (
                            "No hay Courses Registrados"
                        ) : (
                            <table className="table mx-auto">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Title Order</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Total</th>
                                        <th scope="col">Usuario</th>
                                        <th scope="col">Course</th>
                                        <th scope="col">Teacher</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {store.order.map((item, index) => (
                                        <tr key={item.id || index}>
                                            <th scope="row">{item.id}</th>
                                            <td>{item.titleOrder}</td>
                                            <td>{item.price}</td>
                                            <td>{item.total}</td>
                                            <td>{item.userId}</td>
                                            <td>{item.courseId}</td>
                                            <td>{item.teacherId}</td>
                                        
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                
                </div>
        </div>
    );
};
