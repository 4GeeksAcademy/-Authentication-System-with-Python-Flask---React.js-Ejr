import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';
import { Table, Form, InputGroup, FormControl } from 'react-bootstrap';
import styles from './TransactionsTable.module.css';

const TransactionsTable = () => {
    const { store, actions } = useContext(Context);
    const [search, setSearch] = useState('');
    const [filteredPayments, setFilteredPayments] = useState([]);

    useEffect(() => {
        actions.getAllPayments();
    }, []);

    useEffect(() => {
        if (store.payments) {
            setFilteredPayments(store.payments.filter(payment =>
                payment.user_email.toLowerCase().includes(search.toLowerCase()) ||
                payment.amount.toString().includes(search) ||
                new Date(payment.transaction_reference).toLocaleDateString().includes(search)
            ));
        }
    }, [search, store.payments]);

    return (
        <div className={styles.tableContainer}>
            <h1 className={styles.titleComponent}>Transactions</h1>
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Search by email, amount, Reference"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </InputGroup>
            <div className="table-responsive">
                <Table striped bordered hover className="table-sm">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Amount</th>
                            <th>Currency</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Method</th>
                            <th>Reference</th>
                            <th>Card number</th>
                            <th>Card type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPayments.map(payment => (
                            <tr key={payment.payment_id}>
                                <td>{payment.user_email}</td>
                                <td>{payment.amount}</td>
                                <td>{payment.currency}</td>
                                <td>{new Date(payment.payment_date).toLocaleDateString()}</td>
                                <td>{payment.status}</td>
                                <td>{payment.payment_method}</td>
                                <td>{payment.transaction_reference}</td>

                                <td>{payment.card_number}</td>
                                <td>
                                    {payment.card_type === 'visa' && <i className="fa-brands fa-cc-visa"></i>}
                                    {payment.card_type === 'mastercard' && <i className="fa-brands fa-cc-mastercard"></i>}
                                    {payment.card_type === 'amex' && <i className="fa-brands fa-cc-amex"></i>}
                                    {!['visa', 'mastercard', 'amex'].includes(payment.card_type) && payment.card_type}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default TransactionsTable;
