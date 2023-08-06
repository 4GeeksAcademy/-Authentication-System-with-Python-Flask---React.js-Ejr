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
                medium_user_price: "",
                high_user_price: "",
                premium_user_price: "",
                offer_image: "",
            }}
            validationSchema={Yup.object({
                offer_title: Yup.string().min(10, 'Debe tener 10 caracteres o más').required('Obligatorio!'),
                offer_description: Yup.string().min(40, 'Debe tener 40 caracteres o más').required('Obligatorio!'),
                country: Yup.string().min(2, 'Debe tener 2 caracteres o más').required('Obligatorio!'),
                city: Yup.string().min(2, 'Debe tener 2 caracteres o más').required('Obligatorio!'),
                normal_user_price: Yup.number().min(2, 'Debe tener 2 caracteres o más').required('Obligatorio!').typeError('Debe ser un número').integer('Debe ser un número entero'),
                // medium_user_price: Yup.number().min(2, 'Debe tener 2 caracteres o más').required('Obligatorio!').typeError('Debe ser un número').integer('Debe ser un número entero'),
                // high_user_price: Yup.number().min(2, 'Debe tener 2 caracteres o más').required('Obligatorio!').typeError('Debe ser un número').integer('Debe ser un número entero'),
                premium_user_price: Yup.number().min(2, 'Debe tener 2 caracteres o más').required('Obligatorio!').typeError('Debe ser un número').integer('Debe ser un número entero'),
                offer_image: Yup.mixed().required('Debes seleccionar almenos una imagen!')
                    .test("FILE_SIZE", "El tamaño de la imagen es demasiado grande!", (value) => value && value.size < 1024 * 1024)
                    .test("FILE_TYPE", "Formato invalido", (value) => value && ['image/png', 'image/jpeg', 'image/jpg'].includes(value.type))
            })}
            onSubmit={async (values, { setSubmitting, setStatus }) => {
                setSubmitting(true);

                try {

                    const formData = new FormData();
                    formData.append("file", values.offer_image)
                    formData.append("cloud_name", 'albertge')
                    formData.append("upload_preset", "trip_nexus_upload_preset")

                    const response = await axios.post("https://api.cloudinary.com/v1_1/albertge/image/upload", formData);
                    const imgUrl = response.data.url;

                    // Handle your imgUrl or status here

                    console.log("Form submitted:", values);
                    await actions.createOffer(values);
                    console.log("Form submitted successfully!");
                    alert('Tu oferta se publicó correctamente');
                    setStatus({ success: true });

                } catch (error) {

                    console.error("Error submitting form:", error);
                    alert("Alguna cosa salió mal");
                    console.error('Error uploading file', error);
                    setStatus({ error: true });

                } finally {

                    setSubmitting(false); // Set submitting to false after submission is done
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
                                    <Field type="title" name='offer_title' value={formik.values.offer_title} />
                                    <ErrorMessage name='offer_title' />
                                </div>
                                <div>
                                    <label htmlFor="offer_description">Descripción de la oferta:</label>
                                    <Field type="text" name='offer_description' value={formik.values.offer_description} />
                                    <ErrorMessage name='offer_description' />
                                </div>
                                <div>
                                    <label htmlFor="country">País:</label>
                                    <Field type="text" name='country' value={formik.values.country} />
                                    <ErrorMessage name='country' />
                                </div>
                                <div>
                                    <label htmlFor="city">Ciudad:</label>
                                    <Field type="text" name='city' value={formik.values.city} />
                                    <ErrorMessage name='city' />
                                </div>
                                <div>
                                    <label htmlFor="normal_user_price">Precio para Usuario:</label>
                                    <Field type="number" name='normal_user_price' value={formik.values.normal_user_price} />
                                    <ErrorMessage name='normal_user_price' />
                                </div>
                                {/* <div>
                                <label htmlFor="medium_user_price">Precio para Usuario Medio:</label>
                                <Field type="number" name='medium_user_price' value={formik.values.medium_user_price} />
                                <ErrorMessage name='medium_user_price' />
                            </div>
                            <div>
                                <label htmlFor="high_user_price">Precio para Usuario Alto:</label>
                                <Field type="number" name='high_user_price' value={formik.values.high_user_price} />
                                <ErrorMessage name='high_user_price' />
                            </div> */}
                                <div>
                                    <label htmlFor="premium_user_price">Precio para Usuario Premium:</label>
                                    <Field type="number" name='premium_user_price' value={formik.values.premium_user_price} />
                                    <ErrorMessage name='premium_user_price' />
                                </div>
                                <div>
                                    <label htmlFor="offer_image">Publica tu foto aquí:</label>
                                    <input
                                        type="file"
                                        name="offer_image"
                                        onChange={(event) => {
                                            const selectedFile = event.target.files[0];
                                            console.log("Selected File:", selectedFile);
                                            setSelectedFile(selectedFile); // Set the selected file in state
                                            formik.setFieldValue("offer_image", selectedFile);
                                        }}
                                    />
                                    <ErrorMessage name='offer_image' />
                                    {selectedFile && <ImagePreview file={selectedFile} />}
                                </div>
                                <button type="submit" className="btn btn-primary btn-signup" >Publicar mi oferta</button>
                            </Form>

                        </div>
                    ) : null}
                </div>
            )
            }
        </Formik >
    )
}

export default FormOffers