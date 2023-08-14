import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import ImagePreview from './ImagePreview.jsx';
import Draggable from 'react-draggable';


const OffersDoubleModal = () => {
    const { store, actions } = useContext(Context);
    const [selectedFile, setSelectedFile] = useState(null);

    return (

        <Formik
            initialValues={{
                offer_title: "",
                offer_description: "",
                country: "",
                city: "",
                normal_user_price: "",
                premium_user_price: "",
                offer_image: "",
            }}
            validationSchema={Yup.object({
                offer_title: Yup.string()
                    .min(10, 'Debe tener 10 caracteres o más')
                    .matches(/^[A-ZÁÉÍÓÚÑ][A-Za-zÁÉÍÓÚáéíóúÑñ0-9,.*!¡?¿\s ]*$/, 'Debe comenzar con una letra mayúscula')
                    .required('Campo obligatorio!'),
                offer_description: Yup.string()
                    .min(50, 'Debe tener 50 caracteres o más')
                    .matches(/^[A-ZÁÉÍÓÚÑ][A-Za-zÁÉÍÓÚáéíóúÑñ0-9,.*!¡?¿\s ]*$/, 'Debe comenzar con una letra mayúscula')
                    .required('Campo obligatorio!'),
                country: Yup.string()
                    .min(2, 'Debe tener 2 caracteres o más')
                    .required('Campo obligatorio!'),
                city: Yup.string()
                    .min(2, 'Debe tener 2 caracteres o más')
                    .required('Campo obligatorio!'),
                normal_user_price: Yup.number()
                    .min(2, 'Debe tener al menos 2 dígitos')
                    .required('Campo obligatorio!')
                    .integer('Debe ser un número entero')
                    .typeError('Debe ser un número'),
                premium_user_price: Yup.number()
                    .min(2, 'Debe tener al menos 2 dígitos')
                    .required('Campo obligatorio!')
                    .integer('Debe ser un número entero')
                    .typeError('Debe ser un número'),
                offer_image: Yup.mixed()
                    .required('Debes seleccionar al menos una imagen!')
                    .test("FILE_SIZE", "El tamaño de la imagen es demasiado grande!", value => value && value.size < 400 * 400)
                    .test("FILE_TYPE", "Formato inválido", value => value && ['image/png', 'image/jpeg', 'image/jpg'].includes(value.type))
            })}
            onSubmit={async (values, { setSubmitting, setStatus }) => {
                setSubmitting(true);

                try {
                    const formData = new FormData();
                    formData.append("file", selectedFile);
                    formData.append("cloud_name", "albertge");
                    formData.append("upload_preset", "trip_nexus_upload_preset");

                    const response = await axios.post(
                        "https://api.cloudinary.com/v1_1/albertge/image/upload",
                        formData
                    );

                    const imgUrl = response.data.url;

                    await actions.createOffer({ ...values, offer_image: imgUrl });

                    console.log("Form submitted successfully!");
                    alert('Tu oferta se publicó correctamente');
                    setStatus({ success: true });
                    setSelectedFile(null);
                    window.location.reload();

                } catch (error) {
                    console.error("Error submitting form:", error);
                    alert("Alguna cosa salió mal");
                    setStatus({ error: true });
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {formik => (
                <div>
                    <div>
                        <Draggable>
                        <button className="btn btn-primary floating-button" data-bs-toggle="modal" data-bs-target="#exampleModalToggle">
                            Publica tu oferta
                        </button>

                        </Draggable>
                        

                        <Form onSubmit={formik.handleSubmit}>


                            {/* Primer Modal */}
                            <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content content-signup">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalToggleLabel">Rellena el formulario para publicar tu oferta:</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">


                                            <div className='custom-input-password'>
                                                <label htmlFor="offer_title" className={formik.values.offer_title ? 'input-label has-value' : 'input-label'}>Título:</label>
                                                <Field type="text" name="offer_title" />
                                                <ErrorMessage name="offer_title"  />
                                            </div>
                                            <div className='custom-input-password'>
                                                <label htmlFor="offer_description" className={formik.values.offer_description ? 'input-label has-value' : 'input-label'}>Descripción de la oferta:</label>
                                                <Field type="text" name="offer_description" />
                                                <ErrorMessage name="offer_description" />
                                            </div>
                                            <div className='custom-input-password'>
                                                <label htmlFor="country" className={formik.values.country ? 'input-label has-value' : 'input-label'}>País:</label>
                                                <Field type="text" name="country" />
                                                <ErrorMessage name="country" />
                                            </div>
                                            <div className='custom-input-password'>
                                                <label htmlFor="city" className={formik.values.city ? 'input-label has-value' : 'input-label'}>Ciudad:</label>
                                                <Field type="text" name="city" />
                                                <ErrorMessage name="city" />
                                            </div>
                                            <div className='custom-input-password'>
                                                <label htmlFor="normal_user_price" className={formik.values.normal_user_price ? 'input-label has-value' : 'input-label'}>Precio para Usuario:</label>
                                                <Field type="number" name="normal_user_price" />
                                                <ErrorMessage name="normal_user_price" />
                                            </div>
                                            <div className='custom-input-password'>
                                                <label htmlFor="premium_user_price" className={formik.values.premium_user_price ? 'input-label has-value' : 'input-label'}>Precio para Usuario Premium:</label>
                                                <Field type="number" name="premium_user_price" />
                                                <ErrorMessage name="premium_user_price" />
                                            </div>
                                            <div className='modal-footer'>
                                                <button className="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" onClick={() => setCurrentModal(2)}>Siguiente</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Segundo Modal */}
                            <div className="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content content-signup">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalToggleLabel2">Sube tus fotografias para publicar tu oferta:</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">

                                            <div>
                                                <label htmlFor="offer_image">Publica tu foto aquí:</label>
                                                <input
                                                    type="file"
                                                    name="offer_image"
                                                    onChange={(event) => {
                                                        const selectedFile = event.target.files[0];
                                                        setSelectedFile(selectedFile);
                                                        formik.setFieldValue("offer_image", selectedFile);
                                                    }}
                                                />
                                                <ErrorMessage name="offer_image" />
                                                {selectedFile && <ImagePreview file={selectedFile} />}
                                            </div>
                                            <div className='modal-footer'>
                                                <button className="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" onClick={() => setCurrentModal(1)}>Volver al formulario anterior</button>
                                                <button type="submit" className="btn btn-primary btn-signup">
                                                    Publicar mi oferta
                                                </button>                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </div>
                    <div>
                    </div>
                </div>
            )
            }
        </Formik >
    );
};

export default OffersDoubleModal;