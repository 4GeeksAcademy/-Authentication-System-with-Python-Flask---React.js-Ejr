import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SignUpBusiness = () => {
  const { store, actions } = useContext(Context);
  let navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        business_name: "",
        nif: "",
        address: "",
        payment_method: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string().email('Formato erróneo para el correo electrónico').required('Obligatorio'),
        password: Yup.string().min(8, 'Debe tener 8 caracteres o más').required('Obligatorio'),
        business_name: Yup.string().min(2, 'Debe tener 2 caracteres o más').required('Obligatorio'),
        nif: Yup.string().min(2, 'Debe tener 2 caracteres o más').required('Obligatorio'),
        address: Yup.string().min(2, 'Debe tener 2 caracteres o más').required('Obligatorio'),
        payment_method: Yup.string().min(2, 'Debe tener 2 caracteres o más').required('Obligatorio')
      })}
      onSubmit={(values, { setSubmitting }) => {
        // Call your async submit function here (You can also use your handleSubmit function)
        console.log("Form submitted:", values);

        actions.signupBusiness(values)
          .then(() => {
            // Handle successful submission
            console.log("Form submitted successfully!");
            navigate("/reviews");
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
              <label htmlFor="business_name" className="form-label">Nombre de la empresa</label>
              <Field name="business_name" type="text" className="form-control" />
              <ErrorMessage name="business_name" />
            </div>
            <div className="mb-3">
              <label htmlFor="nif" className="form-label">NIF</label>
              <Field name="nif" type="text" className="form-control" />
              <ErrorMessage name="nif" />
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
//           <label htmlFor="email" className="form-label">
//             Correo electrónico
//           </label>
//           <input
//             type="email"
//             className="form-control"
//             id="email"
//             aria-describedby="emailHelp"
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="password" className="form-label">
//             Contraseña
//           </label>
//           <input
//             type="password"
//             className="form-control"
//             id="password"
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="business_name" className="form-label">
//             Nombre de la empresa
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="business_name"
//             onChange={(e) => setBusiness_name(e.target.value)}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="address" className="form-label">
//             Dirección
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="address"
//             onChange={(e) => setAddress(e.target.value)}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="nif" className="form-label">
//             NIF
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="nif"
//             onChange={(e) => setNif(parseInt(e.target.value))}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="payment" className="form-label">
//             Método de pago
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="payment"
//             onChange={(e) => setPayment(e.target.value)}
//           />
//         </div>
//         <button type="submit" className="btn btn-primary btn-signupbusiness">
//           Crear mi cuenta
//         </button>
//       </form>
//     </div>
//   );
// };

export default SignUpBusiness;
