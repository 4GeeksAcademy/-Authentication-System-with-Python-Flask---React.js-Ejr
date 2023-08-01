import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SignUpUser = () => {
  const { store, actions } = useContext(Context);
  let navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        username: "",
        firstname: "",
        lastname: "",
        pasaporte: "",
        address: "",
        payment_method: ""
      }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').required('Obligatorio'),
        password: Yup.string().min(8, 'Debe tener 8 caracteres o más').required('Obligatorio'),
        username: Yup.string().min(2, 'Debe tener 2 caracteres o más').required('Obligatorio'),
        firstname: Yup.string().min(2, 'Debe tener 2 caracteres o más').required('Obligatorio'),
        lastname: Yup.string().min(2, 'Debe tener 2 caracteres o más').required('Obligatorio'),
        pasaporte: Yup.string().min(2, 'Debe tener 2 caracteres o más').required('Obligatorio'),
        address: Yup.string().min(2, 'Debe tener 2 caracteres o más').required('Obligatorio'),
        payment_method: Yup.string().min(2, 'Debe tener 2 caracteres o más').required('Obligatorio'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        // Call your async submit function here (You can also use your handleSubmit function)
        console.log("Form submitted:", values);

        actions.signupUser(values)
          .then(() => {
            // Handle successful submission
            console.log("Form submitted successfully!");
            navigate("/business_offers");
          })
          .catch((error) => {
            // Handle submission error
            console.error("Error submitting form:", error);
            alert("Email already exists");
          })
          .finally(() => {
            setSubmitting(false); // Set submitting to false after submission is done
          });
      }}
    >
      {formik => (

        <div className="form-container">
          <Form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo electrónico</label>
              <Field name="email" type="email" className="form-control" />
              <ErrorMessage name="email" />

            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage name="password" />
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Nombre de usuario</label>
              <Field name="username" type="text" className="form-control" />
              <ErrorMessage name="username" />
            </div>
            <div className="mb-3">
              <label htmlFor="firstname" className="form-label">Nombre</label>
              <Field name="firstname" type="text" className="form-control" />
              <ErrorMessage name="firstname" />
            </div>
            <div className="mb-3">
              <label htmlFor="lastname" className="form-label">Apellido</label>
              <Field name="lastname" type="text" className="form-control" />
              <ErrorMessage name="lastname" />
            </div>
            <div className="mb-3">
              <label htmlFor="pasaporte" className="form-label">Pasaporte</label>
              <Field name="pasaporte" type="text" className="form-control" />
              <ErrorMessage name="pasaporte" />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Dirección</label>
              <Field name="address" type="text" className="form-control" />
              <ErrorMessage name="address" />
            </div>
            <div className="mb-3">
              <label htmlFor="payment_method" className="form-label">Método de pago</label>
              <Field name="payment_method" type="text" className="form-control" />
              <ErrorMessage name="payment_method" />
            </div>
            <button type="submit" className="btn btn-primary btn-signup">Crear mi cuenta</button>
          </Form>
        </div>
      )}
    </Formik>
  );
};
















//   return (
//     <div className="form-container">
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="email" className="form-label">Correo electrónico</label>
//           <Field type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} required />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="password" className="form-label">Contraseña</label>
//           <Field type="password" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)} />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="username" className="form-label">Nombre de usuario</label>
//           <Field type="text" className="form-control" id="username" onChange={(e) => setUsername(e.target.value)} />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="firstname" className="form-label">Nombre</label>
//           <Field type="text" className="form-control" id="firstname" onChange={(e) => setFirstname(e.target.value)} />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="lastname" className="form-label">Apellido</label>
//           <Field type="text" className="form-control" id="lastname" onChange={(e) => setLastname(e.target.value)} />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="address" className="form-label">Dirección</label>
//           <Field type="text" className="form-control" id="address" onChange={(e) => setAddress(e.target.value)} />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="pasaporte" className="form-label">Pasaporte</label>
//           <Field type="text" className="form-control" id="pasaporte" onChange={(e) => setPasaporte(e.target.value)} />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="payment" className="form-label">Método de pago</label>
//           <Field type="text" className="form-control" id="payment" onChange={(e) => setPayment(e.target.value)} />
//         </div>
//         <button type="submit" className="btn btn-primary btn-signup">Crear mi cuenta</button>
//       </form>
//     </div>
//   )
// }

export default SignUpUser