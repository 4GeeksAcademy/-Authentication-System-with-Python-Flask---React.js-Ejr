import React, { useState } from "react";

export const ModalTarget = ({ target, updateTarget, modalId }) => {
    const [newTarget, setNewTarget] = useState(target);

    const handleTargetChange = (e) => {
        setNewTarget(e.target.value);
    };

    const handleSaveChanges = () => {
        updateTarget(newTarget);
    };

    return (
        <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" style={{ width: "15rem" }}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit your Target</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body" style={{ width: "15rem" }}>
                        <textarea
                            value={newTarget}
                            onChange={handleTargetChange}
                            className="form-control"
                            rows="1"
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
