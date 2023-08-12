import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const SignUpUser = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { store, actions } = useContext(Context);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  let navigate = useNavigate();
  
  function handleRedirect() {
    window.history.back();
  }

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        username: "",
        firstname: "",
        lastname: "",
        phone_prefix: "",
        phone_number: "",
        passport: "",
        address: "",
        payment_method: "",
        acceptTerms: false,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Campo obligatorio'),
        password: Yup.string().min(8, 'Debe tener 8 caracteres o más').required('Campo obligatorio').matches(
          /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          'Debe contener al menos una mayúscula, un número y un símbolo'
        ),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
          .required('Campo obligatorio'),
        username: Yup.string()
          .min(5, 'Debe tener 5 caracteres o más')
          .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ][A-Za-zÁÉÍÓÚáéíóúÑñ0-9,.*!¡?¿\s-_]*$/, 'Debe comenzar con una letra mayúscula o minúscula ')
          .required('Campo obligatorio!'),
        firstname: Yup.string()
          .min(2, 'Debe tener 2 caracteres o más')
          .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ][A-Za-zÁÉÍÓÚáéíóúÑñ]*$/, 'Debe comenzar con una letra mayúscula o minúscula ')
          .required('Campo obligatorio!'),
        lastname: Yup.string()
          .min(2, 'Debe tener 2 caracteres o más')
          .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ][A-Za-zÁÉÍÓÚáéíóúÑñ]*$/, 'Debe comenzar con una letra mayúscula o minúscula ')
          .required('Campo obligatorio!'),
        phone_prefix: Yup.string().required('Campo obligatorio').min(2, "Debe tener mínimo 2 dígitos").max(2, "Debe tener máximoo 2 dígitos"),
        phone_number: Yup.string().min(7, 'Debe tener al menos 7 dígitos').required('Campo obligatorio'),
        passport: Yup.string().min(2, 'Debe tener 2 caracteres o más').required('Campo obligatorio'),
        address: Yup.string()
          .min(5, 'Debe tener 5 caracteres o más')
          .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ][A-Za-zÁÉÍÓÚáéíóúÑñ0-9,.*!¡?¿\s- ]*$/, 'Debe comenzar con una letra mayúscula o minúscula ')
          .required('Campo obligatorio!'),
        payment_method: Yup.string().min(2, 'Debe tener 2 caracteres o más').required('Campo obligatorio'),
        acceptTerms: Yup.boolean()
          .required('Campo obligatorio')
          .oneOf([true], 'Debes aceptar los términos y condiciones para registrarte'),
      })}


      onSubmit={(values, { setSubmitting }) => {
        // Call your async submit function here (You can also use your handleSubmit function)
        console.log("Form submitted:", values);

        actions.signupUser(values)
          .then(() => {
            // Handle successful submission
            console.log("Form submitted successfully!");
            alert("Tu registro fue todo un éxito!!! Revisa tu correo electrónico.");
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

        <div className="form-container mt-4">
          <Form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo electrónico</label>
              <Field name="email" type="email" className="form-control" />
              <ErrorMessage name="email" />

            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <div className="input-group">
                <Field name="password" type={showPassword ? 'text' : 'password'} className="form-control" />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
              <ErrorMessage name="password" />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
              <div className="input-group">
                <Field
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="form-control"
                  onChange={(e) => {
                    formik.handleChange(e);
                    setPasswordsMatch(e.target.value === formik.values.password);
                  }}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
              {passwordsMatch ? (
                <>
                  <span>Las contraseñas coinciden.</span>
                  <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green', marginLeft: '5px' }} />
                </>
              ) : null}
              <ErrorMessage name="confirmPassword" />
            </div>
            <div className="mb-3 ">
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
              <label htmlFor="passport" className="form-label">Pasaporte</label>
              <Field name="passport" type="text" className="form-control" />
              <ErrorMessage name="passport" />
            </div>
            <div className="d-flex">
            <div className="mb-3 me-5">
              <label htmlFor="phone_prefix" className="form-label">Prefijo Telefónico</label>
              <Field name="phone_prefix" type="text" className="form-control" />
              <ErrorMessage name="phone_prefix" />
            </div>
            <div className="mb-3 ms-5">
              <label htmlFor="phone_number" className="form-label">Número de Teléfono</label>
              <Field name="phone_number" type="text" className="form-control" />
              <ErrorMessage name="phone_number" />
            </div>

            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Dirección</label>
              <Field name="address" type="text" className="form-control" />
              <ErrorMessage name="address" />
            </div>
            <div className="mb-3" id="payment-radio" role="group" aria-labelledby="payment-radio">
              <label htmlFor="payment_method" className="form-label">Método de pago</label>
              <div>
                <label>
                  <Field type="radio" name="payment_method" value="Paypal" className="form-check-input" />
                  Paypal
                </label>
                <label>
                  <Field type="radio" name="payment_method" value="GooglePay" className="form-check-input ms-4" />
                  Google Pay
                </label>
              </div>
              <ErrorMessage name="payment_method" component="div" className="error-message" />
            </div>
            <div>
              <label>
                <Field type="checkbox" name="acceptTerms" />
                Acepto los
                <Link to="/terms">
                  <strong> términos y condiciones</strong>
                </Link>
              </label>
              <ErrorMessage name="acceptTerms" />
            </div>
            <button type="submit" className="btn btn-primary btn-signup">Crear mi cuenta</button>
            <button type="button" onClick={handleRedirect} className='back-button'>Volver</button>

          </Form>
        </div>
      )}
    </Formik>
  );
};


export default SignUpUser