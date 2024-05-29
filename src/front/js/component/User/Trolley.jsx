import React, { useState, useEffect } from 'react';
import CourseCard from '../Courses/CourseCard.jsx';
import { UserNavbar } from '../../component/User/UserNavbar.jsx';

export const Trolley = () => {
  const [trolleyItems, setTrolleyItems] = useState([]);

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
        const course = {
          id: courseId,
          title_course: titleCourse,
          price: price
        };
        setTrolleyItems([...trolleyItems, course]);
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

  const createOrder = async () => {
    const total = calculateTotalPrice();
    const userId = 1;  // Reemplaza esto con la lógica para obtener el userId correcto
    const titleOrder = 'New Order'; // Puedes cambiar esto según sea necesario

    try {
      const response = await fetch('/api/order/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          titleOrder,
          price: total,
          total,
          userId
        })
      });
      if (response.ok) {
        const newData = await response.json();
        console.log('Order created successfully:', newData);
        setTrolleyItems([]); // Vacía el carrito después de crear la orden
      } else {
        console.error('Failed to create order:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div>
      <UserNavbar />
      <h2>Shopping Cart</h2>
      <div className="row">
        {trolleyItems.map(item => (
          <div key={item.id} className="col-md-4">
            <CourseCard
              id={item.id}
              img={item.img}
              title={item.title_course}
              description={item.description}
            />
            <button className="btn btn-danger" onClick={() => removeFromTrolley(item.id)}>Remove</button>
          </div>
        ))}
      </div>
      <div>
        <h3>Total Price: ${calculateTotalPrice()}</h3>
      </div>
      <button className="btn btn-primary" onClick={createOrder}>Create Order</button>
      <button className="btn btn-primary" onClick={() => addToTrolley(1, 1, 'Curso de Python', 120)}>Add Course</button>
    </div>
  );
};





