import React, { useEffect, useState, useContext } from "react";
import AddCarModal from "./AddCarModal";
import EditCarModal from "./EditCarModal";
import { Context } from "../store/appContext";

const apiUrl = process.env.BACKEND_URL + "/api";

function UserCars() {
  const { actions } = useContext(Context);
  const [cars, setCars] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [carToEdit, setCarToEdit] = useState(null);
  const [carToDelete, setCarToDelete] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    const loadCarsDetails = async () => {
      try {
        const getCarsUser = await fetch(`${apiUrl}/cars/user/${user_id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!getCarsUser.ok) {
          throw new Error("Failed to load cars details");
        }
        const data = await getCarsUser.json();
        setCars(data.result);
      } catch (error) {
        console.error("Failed to load", error);
      }
    };
    loadCarsDetails();
  }, []);

  const handleAddModalOpen = () => {
    setIsAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
    setError("");
  };

  const handleEditModalOpen = (car) => {
    setCarToEdit(car);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setError("");
  };

  // *Fecth on agregar con patch
  const handleAddCar = async (newCar) => {
    if (!newCar.model.trim() || !newCar.licensePlate.trim()) {
      setError("Model and License Plate cannot be blank");
      return;
    }

    try {
      // Asigna un ID temporal para simular el guardado
      const newCarWithId = { ...newCar, id: cars.length + 1 };

      // Aquí deberías hacer la llamada para guardar los detalles del coche
      const result = await actions.saveCarDetails(newCarWithId.id, newCarWithId);
      if (result.success) {
        setCars([...cars, newCarWithId]);
        setIsAddModalOpen(false);
        setError("");
      } else {
        setError("Failed to add car: " + result.error);
      }
    } catch (error) {
      console.error("Error adding car:", error);
      setError("An error occurred: " + error.message);
    }
  };

  // *Fecth on editar con patch
  const handleEditCar = async (updatedCar) => {
    if (!updatedCar.model.trim() || !updatedCar.licensePlate.trim()) {
      setError("Model and License Plate cannot be blank");
      return;
    }

    try {
      const result = await actions.saveCarDetails(updatedCar.id, updatedCar);
      if (result.success) {
        setCars(cars.map((car) => (car.id === updatedCar.id ? updatedCar : car)));
        setIsEditModalOpen(false);
        setError("");
      } else {
        setError("Failed to update car: " + result.error);
      }
    } catch (error) {
      console.error("Error updating car:", error);
      setError("An error occurred: " + error.message);
    }
  };

  const handleDeleteClick = (carId) => {
    setCarToDelete(carId);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    setCars(cars.filter((car) => car.id !== carToDelete));
    setShowConfirmModal(false);
  };

  return (
    <div className="user-cars">
      <h2 className="fw-bolder text-dark p-3">My Cars</h2>
      <button className="btn btn-primary mb-3" onClick={handleAddModalOpen}>
        Add Car
      </button>
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
            {cars.map((car) => (
              <tr key={car.id}>
                <td>{car.car_model || "Unknown"}</td>
                <td>{car.license_plate || "Unknown"}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEditModalOpen(car)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger ms-2"
                    onClick={() => handleDeleteClick(car.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isAddModalOpen && (
        <AddCarModal
          onSave={handleAddCar}
          onClose={handleAddModalClose}
          error={error}
        />
      )}
      {isEditModalOpen && (
        <EditCarModal
          car={carToEdit}
          onSave={handleEditCar}
          onClose={handleEditModalClose}
          error={error}
        />
      )}

      {showConfirmModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowConfirmModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this car?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowConfirmModal(false)}
                >
                  No
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmDelete}
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserCars;
