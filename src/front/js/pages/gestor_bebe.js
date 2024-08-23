import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import { Context } from "../store/appContext";

import bebe1 from "../../img/bebe1.jpg";

export const Gestor_bebe = () => {
	const { id } = useParams(); // Obtener el id del bebé desde los parámetros de la URL
	const { store, actions } = useContext(Context);

	const { babyData } = store;

	const [editableData, setEditableData] = useState({
        name: "",
        gender: "",
        age: "",
        height: "",
        weight: ""
    });
    const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		console.log("Fetching data for baby with id:", id);
		if (id) {
        	actions.fetchBabyData(id); // Obtener datos del bebé
		}
    }, [id]);

	useEffect(() => {
        console.log("Received new babyData:", babyData);
        if (babyData) {
            setEditableData(babyData);
        }
    }, [babyData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditableData({ ...editableData, [name]: value });
    };

	const handleSave = (event) => {
		event.preventDefault();
        actions.updateBabyData(editableData);
        setIsEditing(false);
    };

	

	return (
	
		<div className="container" style={{ width: '80vw', height: '80vw', backgroundColor: '#FBEE84', marginTop: '55px' }}>
			<div className="d-flex justify-content-center align-items-center">
				<div>
					<img src={bebe1} className="img-fluid" alt="IMG_Baby" style={{ width: '150px', height: 'auto', objectFit: 'cover', borderRadius: '50%' }} />
				</div>
				<div className="d-flex flex-column justify-content-center ms-4" style={{ borderRadius: '10px', padding: '10px', border: '2px solid #63DDFC' }}>
					<label>Name</label>
					<input type="text" name="name" placeholder="Baby name" value={editableData.name} onChange={handleChange} disabled={!isEditing} className="form-control" />
				</div>
			</div>

			<div className="row mt-4">
				<div className="col-md-6 mb-3 d-flex justify-content-center align-items-center">
					<div className="d-flex flex-column" style={{ width: 'fit-content' }}>
						<label style={{ borderRadius: '10px', padding: '5px', border: '2px solid #63DDFC' }}>Gender</label>
						<input type="text" name="gender" placeholder="Gender" value={editableData.gender} onChange={handleChange} disabled={!isEditing} className="form-control" style={{ backgroundColor: '#63DDFC', borderRadius: '10px', border: 'none' }} />
					</div>
				</div>
				<div className="col-md-6 mb-3 d-flex justify-content-center align-items-center">
					<div className="d-flex flex-column" style={{ width: 'fit-content' }}>
						<label style={{ borderRadius: '10px', padding: '5px', border: '2px solid #63DDFC' }}>Height (cm)</label>
						<input type="text" name="height" placeholder="Height" value={editableData.height} onChange={handleChange} disabled={!isEditing} className="form-control" style={{ backgroundColor: '#63DDFC', borderRadius: '10px', border: 'none'}} />
					</div>
				</div>
			</div>

			<div className="row">
				<div className="col-md-6 mb-3 d-flex justify-content-center align-items-center">
					<div className="d-flex flex-column" style={{ width: 'fit-content' }}>
						<label style={{ borderRadius: '10px', padding: '5px', border: '2px solid #63DDFC' }}>Age (months)</label>
						<input type="text" name="age" placeholder="Age" value={editableData.age} onChange={handleChange} disabled={!isEditing} className="form-control" style={{ backgroundColor: '#63DDFC', borderRadius: '10px', border: 'none'}} />
					</div>
				</div>
				<div className="col-md-6 mb-3 d-flex justify-content-center align-items-center">
					<div className="d-flex flex-column" style={{ width: 'fit-content' }}>
						<label style={{ borderRadius: '10px', padding: '5px', border: '2px solid #63DDFC' }}>Weight (kg)</label>
						<input type="text" name="weight" placeholder="Weight" value={editableData.weight} onChange={handleChange} disabled={!isEditing} className="form-control" style={{ backgroundColor: '#63DDFC', borderRadius: '10px', border: 'none' }} />
					</div>
				</div>
			</div>

			<div className="d-flex justify-content-end">
				{isEditing ? (
					<button type="button" onClick={handleSave} className="btn btn-primary">Save</button>
				) : (
					<button type="button" onClick={() => setIsEditing(true)} className="btn btn-secondary">Edit</button>
				)}

				<Link to="/dashboard">
					<button type="button" className="btn btn-dark">Back home</button>
				</Link>
			</div>
		</div>
	);
};
