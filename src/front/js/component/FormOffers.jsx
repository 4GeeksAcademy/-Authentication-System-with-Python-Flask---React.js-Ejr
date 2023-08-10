import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import ImagePreview from './ImagePreview.jsx';


const FormOffers = () => {
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
                    {store.auth ? (
                        <div>
                            <Form onSubmit={formik.handleSubmit}>
                                <div>
                                    <label htmlFor="offer_title">Título:</label>
                                    <Field type="text" name="offer_title" />
                                    <ErrorMessage name="offer_title" />
                                </div>
                                <div>
                                    <label htmlFor="offer_description">Descripción de la oferta:</label>
                                    <Field type="text" name="offer_description" />
                                    <ErrorMessage name="offer_description" />
                                </div>
                                <div>
                                    <label htmlFor="country">País:</label>
                                    <Field type="text" name="country" />
                                    <ErrorMessage name="country" />
                                </div>
                                <div>
                                    <label htmlFor="city">Ciudad:</label>
                                    <Field type="text" name="city" />
                                    <ErrorMessage name="city" />
                                </div>
                                <div>
                                    <label htmlFor="normal_user_price">Precio para Usuario:</label>
                                    <Field type="number" name="normal_user_price" />
                                    <ErrorMessage name="normal_user_price" />
                                </div>
                                <div>
                                    <label htmlFor="premium_user_price">Precio para Usuario Premium:</label>
                                    <Field type="number" name="premium_user_price" />
                                    <ErrorMessage name="premium_user_price" />
                                </div>
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
                                <button type="submit" className="btn btn-primary btn-signup">
                                    Publicar mi oferta
                                </button>
                            </Form>
                        </div>
                    ) : null}
                </div>
            )}
        </Formik>
    );
};

export default FormOffers;
