import React, { useState } from 'react';
import AddCarModal from './AddCarModal';
import EditCarModal from './EditCarModal';

function UserCars() {
  const initialCars = [
    { id: 1, model: 'Toyota Camry', licensePlate: 'ABC123' },
    { id: 2, model: 'Honda Accord', licensePlate: 'XYZ789' }
  ];

  const [cars, setCars] = useState(initialCars);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [carToEdit, setCarToEdit] = useState(null);
  const [carToDelete, setCarToDelete] = useState(null);

  const handleAddModalOpen = () => {
    setIsAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
  };

  const handleEditModalOpen = (car) => {
    setCarToEdit(car);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleAddCar = (newCar) => {
    if (!newCar.model.trim() || !newCar.licensePlate.trim()) {
      alert('Model and License Plate cannot be blank');
      return;
    }

    const newCarWithId = { ...newCar, id: cars.length + 1 };
    setCars([...cars, newCarWithId]);
    setIsAddModalOpen(false);
  };

  const handleEditCar = (updatedCar) => {
    if (!updatedCar.model.trim() || !updatedCar.licensePlate.trim()) {
      alert('Model and License Plate cannot be blank');
      return;
    }

    setCars(cars.map(car => car.id === updatedCar.id ? updatedCar : car));
    setIsEditModalOpen(false);
  };

  const handleDeleteClick = carId => {
    setCarToDelete(carId);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    setCars(cars.filter(car => car.id !== carToDelete));
    setShowConfirmModal(false);
  };

  return (
    <div className="user-cars">
      <h2>My Cars</h2>
      <button className="btn btn-primary mb-3" onClick={handleAddModalOpen}>Add Car</button>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Model</th>
              <th>License Plate</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map(car => (
              <tr key={car.id}>
                <td>{car.model}</td>
                <td>{car.licensePlate}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => handleEditModalOpen(car)}>Edit</button>
                  <button className="btn btn-danger ms-2" onClick={() => handleDeleteClick(car.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isAddModalOpen && <AddCarModal onSave={handleAddCar} onClose={handleAddModalClose} />}
      {isEditModalOpen && <EditCarModal car={carToEdit} onSave={handleEditCar} onClose={handleEditModalClose} />}

      {showConfirmModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button type="button" className="btn-close" onClick={() => setShowConfirmModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this car?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowConfirmModal(false)}>No</button>
                <button type="button" className="btn btn-danger" onClick={confirmDelete}>Yes, Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserCars;
