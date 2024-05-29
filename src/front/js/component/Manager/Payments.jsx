import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../store/appContext';

export const Payments = () => {
  const { store } = useContext(Context);
  const urlPayments = process.env.BACKEND_URL + '/api/payment/courses';

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const paymentInfo = async () => {
    try {
      const response = await fetch(urlPayments);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      console.log("Data from backend:", data);

      // Establecer todos los pagos recibidos del backend
      setPayments(data.payments);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    paymentInfo();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Payment #</th>
            <th scope="col">Date</th>
            <th scope="col">Title course</th>
            <th scope="col">Amount</th>
            <th scope="col">Type of payment</th>
            <th scope="col">User ID</th>
          </tr>
        </thead>
        <tbody>
          {payments.length > 0 ? (
            payments.map((pay, index) => (
              <tr key={index}>
                <th scope="row">{pay.id}</th>
                <td>{pay.date}</td>
                <td>{pay.titleCourse}</td>
                <td>{pay.padAmount}</td>
                <td>{pay.typePayment}</td>
                <td>{pay.userId}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No payments found</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};


