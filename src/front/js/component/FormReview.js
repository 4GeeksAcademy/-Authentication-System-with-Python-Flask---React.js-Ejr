import React, { useContext, useS } from 'react';
import { Context } from '../store/appContext';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const FormReview = () => {
  const { store, actions } = useContext(Context);
  return (
    <Formik
      initialValues={{
        title: "",
        comment_text: "",
      }}
      validationSchema={Yup.object({
        title: Yup.string()
        .min(10, 'Debe tener 10 caracteres o más')
        .matches(/^[A-ZÁÉÍÓÚÑ][A-Za-zÁÉÍÓÚáéíóúÑñ0-9,.*!¡?¿\s]*$/, 'Debe comenzar con una letra mayúscula')
        .required('Campo obligatorio!'),
        comment_text: Yup.string()
        .min(50, 'Debe tener 50 caracteres o más')
        .matches(/^[A-ZÁÉÍÓÚÑ][A-Za-zÁÉÍÓÚáéíóúÑñ0-9,.*!¡?¿\s]*$/, 'Debe comenzar con una letra mayúscula')
        .required('Campo obligatorio!'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        console.log("Form submitted:", values);
        actions.create_review(values)
          .then(() => {
            console.log("Form submitted succesfuly!");

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
            <div className="div-form-review-content">
              <Form className="form-review-content" onSubmit={formik.handleSubmit}>
                <div className="title-form-review">
                  <label htmlFor="title">Títutlo:</label>
                  <Field type="text" name="title" value={formik.values.title} />
                  <ErrorMessage name='title' />
                </div>
                <div className="comment-form-review">
                  <label htmlFor="comment_text">Comentario:</label>
                  <Field type="text" name="comment_text" value={formik.values.comment_text} />
                  <ErrorMessage name='comment_text' />
                </div>
                <button className='btn-review' type="submit">Publicar mi reseña</button>
              </Form>
            </div>
          ) : null}
        </div>
      )
      }
    </Formik >
  )
}
export default FormReview
