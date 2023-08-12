import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const SignUpBusiness = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const { store, actions } = useContext(Context);
  let navigate = useNavigate();

  function handleRedirect() {
    window.history.back();
  }

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        business_name: "",
        nif: "",
        phone_prefix: "",
        phone_number: "",
        address: "",
        payment_method: "",
        acceptTerms: false,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Formato erróneo para el correo electrónico').required('Campo obligatorio'),
        password: Yup.string().min(8, 'Debe tener 8 caracteres o más').required('Campo obligatorio').matches(
          /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Debe contener al menos una mayúscula, un número y un símbolo'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
          .required('Campo obligatorio'),
        business_name: Yup.string().min(2, 'Debe tener 2 caracteres o más').matches(/^[A-Z][A-Za-z0-9,.*!¡?¿\s]*$/, 'Debe comenzar con una letra mayúscula').required('Campo obligatorio'),
        phone_prefix: Yup.string().required('Campo obligatorio').min(2, "Debe tener mínimo 2 dígitos").max(2, "Debe tener máximoo 2 dígitos"),
        phone_number: Yup.string().min(7, 'Debe tener al menos 7 dígitos').required('Campo obligatorio'),
        nif: Yup.string().min(2, 'Debe tener 2 caracteres o más').required('Campo obligatorio'),
        address: Yup.string()
          .min(10, 'Debe tener 10 caracteres o más')
          .matches(/^[A-ZÁÉÍÓÚÑ][A-Za-zÁÉÍÓÚáéíóúÑñ0-9,.*!¡?¿\s- ]*$/, 'Debe comenzar con una letra mayúscula')
          .required('Campo obligatorio!'),
        payment_method: Yup.string().min(2, 'Debe tener 2 caracteres o más').required('Campo obligatorio'),
        acceptTerms: Yup.boolean()
          .required('Campo obligatorio')
          .oneOf([true], 'Debes aceptar los términos y condiciones para registrarte'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        console.log("Form submitted:", values);
        actions.signupBusiness(values)
          .then(() => {
            console.log("Form submitted successfully!");
            alert("Tu registro fue todo un éxito!!! Revisa tu correo electrónico.");
            navigate("/reviews");
          })
          .catch((error) => {
            console.error("Error submitting form:", error);
            alert("Email already exists");
          })
          .finally(() => {
            setSubmitting(false);
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



export default SignUpBusiness;