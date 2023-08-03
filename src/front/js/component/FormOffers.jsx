import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const FormOffers = () => {
    const { store, actions } = useContext(Context);
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
            }}
            validationSchema={Yup.object({
                offer_title: Yup.string().min(10, 'Debe tener 10 caracteres o más').required('Obligatorio'),
                offer_description: Yup.string().min(40, 'Debe tener 40 caracteres o más').required('Obligatorio'),
                country: Yup.string().min(2, 'Debe tener 2 caracteres o más').required('Obligatorio'),
                city: Yup.string().min(2, 'Debe tener 2 caracteres o más').required('Obligatorio'),
                normal_user_price: Yup.number().min(2, 'Debe tener 2 caracteres o más').required('Obligatorio').typeError('Debe ser un número').integer('Debe ser un número entero'),
                // medium_user_price: Yup.number().min(2, 'Debe tener 2 caracteres o más').required('Obligatorio').typeError('Debe ser un número').integer('Debe ser un número entero'),
                // high_user_price: Yup.number().min(2, 'Debe tener 2 caracteres o más').required('Obligatorio').typeError('Debe ser un número').integer('Debe ser un número entero'),
                premium_user_price: Yup.number().min(2, 'Debe tener 2 caracteres o más').required('Obligatorio').typeError('Debe ser un número').integer('Debe ser un número entero'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                // Call your async submit function here (You can also use your handleSubmit function)
                console.log("Form submitted:", values);
                actions.createOffer(values)
                    .then(() => {
                        // Handle successful submission
                        console.log("Form submitted successfully!");
                    })
                    .catch((error) => {
                        // Handle submission error
                        console.error("Error submitting form:", error);
                        alert("Something gets wrong");
                    })
                    .finally(() => {
                        setSubmitting(false); // Set submitting to false after submission is done
                    });
            }}
        >
            {formik => (
                <div>
                    {store.auth ? (
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
                            <button type="submit" className="btn btn-primary btn-signup" >Publicar mi oferta</button>
                        </Form>
                    ) : null}
                </div>
            )
            }
        </Formik>
    )
}

export default FormOffers