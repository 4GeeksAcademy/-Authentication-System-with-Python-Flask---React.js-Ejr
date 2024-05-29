import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseCard from '../Courses/CourseCard.jsx';
import { UserNavbar } from '../../component/User/UserNavbar.jsx';

export const Trolley = () => {
  const [trolleyItems, setTrolleyItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/trolley/courses')
      .then(response => response.json())
      .then(data => setTrolleyItems(data))
      .catch(error => console.error('Error fetching trolley:', error));
  }, []);

  const addToTrolley = async (courseId, userId, titleCourse, price) => {
    try {
      const response = await fetch('/api/trolley/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          courseId,
          userId,
          titleCourse,
          price
        })
      });
      if (response.ok) {
        const newData = await response.json();
        setTrolleyItems([...trolleyItems, newData]);
      } else {
        console.error('Failed to add course to trolley:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding course to trolley:', error);
    }
  };

  const removeFromTrolley = async (itemId) => {
    try {
      const response = await fetch(`/api/trolley/courses/${itemId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setTrolleyItems(trolleyItems.filter(item => item.id !== itemId));
      } else {
        console.error('Failed to remove course from trolley:', response.statusText);
      }
    } catch (error) {
      console.error('Error removing course from trolley:', error);
    }
  };

  const calculateTotalPrice = () => {
    return trolleyItems.reduce((total, item) => total + item.price, 0);
  };

  const handleCheckout = () => {
    const totalPrice = calculateTotalPrice();
    navigate('/paypal', { state: { totalPrice } });
  };

  return (
    <div>
      <UserNavbar />
      <div className="container mt-5">
        <h2 className="mb-4">Shopping Cart</h2>
        <div className="row">
          {trolleyItems.map(item => (
            <div key={item.id} className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <CourseCard
                  id={item.id}
                  img={item.img}
                  title={item.title}
                  description={item.description}
                  price={item.price}
                />
                <div className="card-body">
                  <button className="btn btn-danger btn-block" onClick={() => removeFromTrolley(item.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="card shadow-sm p-3">
          <h3>Total: ${calculateTotalPrice()}</h3>
          <button className="btn btn-success btn-block" onClick={handleCheckout}>Checkout</button>
        </div>
        <button className="btn btn-primary mt-3" onClick={() => addToTrolley(1, 1, 'Curso de Python', 120)}>Add Course</button>
      </div>
    </div>
  );
};







