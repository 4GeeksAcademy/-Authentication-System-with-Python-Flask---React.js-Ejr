import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import ImagePreview from './ImagePreview.jsx';


const FormReview = () => {
  const { store, actions } = useContext(Context);
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <Formik
      initialValues={{
        title: "",
        comment_text: "",
      }}
      validationSchema={Yup.object({
        title: Yup.string()
          .min(10, 'Debe tener 10 caracteres o más')
          .matches(/^[A-ZÁÉÍÓÚÑ][A-Za-zÁÉÍÓÚáéíóúÑñ0-9,.*!¡?¿\s- ]*$/, 'Debe comenzar con una letra mayúscula')
          .required('Campo obligatorio!'),
        comment_text: Yup.string()
          .min(50, 'Debe tener 50 caracteres o más')
          .matches(/^[A-ZÁÉÍÓÚÑ][A-Za-zÁÉÍÓÚáéíóúÑñ0-9,.*!¡?¿\s- ]*$/, 'Debe comenzar con una letra mayúscula')
          .required('Campo obligatorio!'),
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

          await actions.create_review({ ...values, review_image: imgUrl });

          console.log("Form submitted successfully!");
          alert('Tu reseña se publicó correctamente');
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
                <div>
                  <label htmlFor="review_image">Publica tu foto aquí:</label>
                  <input
                    type="file"
                    name="review_image"
                    onChange={(event) => {
                      const selectedFile = event.target.files[0];
                      setSelectedFile(selectedFile);
                      formik.setFieldValue("review_image", selectedFile);
                    }}
                  />
                  <ErrorMessage name="review_image" />
                  {selectedFile && <ImagePreview file={selectedFile} />}
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
