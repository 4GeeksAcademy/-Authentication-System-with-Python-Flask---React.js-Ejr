import React, { useState } from 'react';
import FormReview from './FormReview.js';

const ReviewsDoubleModal = () => {
    const [currentReviewModal, setCurrentReviewModal] = useState(1);

    return (
        <div>
            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModalToggle">
                Publica tu reseña
            </button>

            {/* Primer Modal */}
            
            <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalToggleLabel">Rellena el formulario para publicar tu reseña:</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <FormReview currentReviewModal={currentReviewModal} />
                            {/* {currentReviewModal === 1 && (
                                <div className='modal-footer'>
                                    <button className="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" onClick={() => setCurrentReviewModal(2)}>Siguiente</button>
                                </div>
                            )} */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Segundo Modal */}
            {/* <div className="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalToggleLabel2">Sube tus fotografias para publicar tu reseña:</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <FormReview currentReviewModal={currentReviewModal} />
                            {currentReviewModal === 2 && (
                                <div className='modal-footer'>
                                    <button className="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" onClick={() => setCurrentReviewModal(1)}>Volver al formulario anterior</button>
                                    <button type="submit" className="btn btn-primary btn-signup">
                                        Publicar mi reseña
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
}

export default ReviewsDoubleModal;