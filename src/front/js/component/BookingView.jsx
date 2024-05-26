import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Table, Form, InputGroup, FormControl } from 'react-bootstrap';
import styles from './BookingView.module.css';

const BookingView = () => {
    const { actions, store } = useContext(Context);
    const [search, setSearch] = useState('');
    const [filteredBookings, setFilteredBookings] = useState([]);

    // useEffect(() => {
    //     actions.getAllBookings();
    // }, []);

    useEffect(() => {
        if (store.bookingData) {
            setFilteredBookings(store.bookingData.filter(booking =>
                booking.booking_user_name.toLowerCase().includes(search.toLowerCase()) ||
                booking.class_name.toLowerCase().includes(search.toLowerCase()) ||
                booking.class_instructor.toLowerCase().includes(search.toLowerCase()) ||
                booking.booking_date.toLowerCase().includes(search.toLowerCase())
            ));
        }
    }, [search, store.bookingData]);

    return (
        <div className={styles.tableContainer}>
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Search by user, class name, instructor, date"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </InputGroup>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th scope="col">Booking Date</th>
                        <th scope="col">Booking Id</th>
                        <th scope="col">Booking Status</th>
                        <th scope="col">Class Id</th>
                        <th scope="col">Class Instructor</th>
                        <th scope="col">Class User</th>
                        <th scope="col">Class Name</th>
                        <th scope="col">Class Start Time</th>
                        <th scope="col">Class Date</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBookings.map((item) => (
                        <tr key={item.booking_id}>
                            <td>{item.booking_date}</td>
                            <td>{item.booking_id}</td>
                            <td>{item.booking_status}</td>
                            <td>{item.class_id}</td>
                            <td>{item.class_instructor}</td>
                            <td>{item.booking_user_name}</td>
                            <td>{item.class_name}</td>
                            <td>{item.class_start_time}</td>
                            <td>{item.dateTime_class}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default BookingView;
