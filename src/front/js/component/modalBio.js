import React, { useState } from "react";

export const ModalBio = ({ bio, updateBio }) => {
    const [newBio, setNewBio] = useState(bio);

    const handleBioChange = (e) => {
        setNewBio(e.target.value);
    };

    const handleSaveChanges = () => {
        updateBio(newBio);
    };

    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit your bio</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <textarea
                            value={newBio}
                            onChange={handleBioChange}
                            className="form-control"
                            rows="5"
                        />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary custom-update" data-bs-dismiss="modal" onClick={handleSaveChanges}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

