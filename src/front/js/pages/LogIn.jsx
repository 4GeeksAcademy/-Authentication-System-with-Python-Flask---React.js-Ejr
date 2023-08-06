import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const LogIn = () => {
  const { store, actions } = useContext(Context);
  const [loginError, setLoginError] = useState("");
  let navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        email: "",
        password: ""
      }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').required('Obligatorio'),
        password: Yup.string().min(8, 'Debe tener 8 caracteres o más').required('Obligatorio'),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          let isLogged = await actions.login(values.email, values.password);
          console.log("is Logged:", isLogged);
          if (isLogged) {
            // Connexion réussie
            alert("Bienvenid@ de nuevo!");
            navigate("/");
          } else {
            // Connexion échouée
            setLoginError("Email and/or password are incorrect");
          }
        } catch (error) {
          // Handle any errors that occurred during login
          console.error("Error during login:", error);
        } finally {
          setSubmitting(false); // Set submitting to false after submission is done
        }
      }}
    >
  {formik => (

<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
<div className="modal-dialog">
  <div className="modal-content">
    <div className="modal-header">
      <h1 className="modal-title fs-5 text-center" id="staticBackdropLabel"><strong>Identifícate</strong></h1>
      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div className="modal-body">
      <Form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email">Correo electrónico</label>
          <Field name="email" type="email"/>
          <ErrorMessage name='email'/>
        </div>
        <div className="mb-3">
          <label htmlFor="password">Contraseña</label>
          <Field name="password" type="password"/>
          <ErrorMessage name='password'/>
        </div>

        <Link to='/signup' > <span data-bs-dismiss="modal">¿Aún no tienes una cuenta? Click aquí!</span></Link>
        <Link to='/forgot_password' > <span data-bs-dismiss="modal">¿Olvidaste la contraseña? Click aquí!</span></Link>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          <button type="submit" className="btn btn-primary"><span data-bs-dismiss="modal">Entrar</span>  </button>
        </div>
      </Form>
    </div>
  </div>
</div>
</div>
)}
</Formik>
  );
};

  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const [loginError, setLoginError] = useState("");
  // const { store, actions } = useContext(Context);
  // let navigate = useNavigate()

  // async function handleLog(e) {
  //   e.preventDefault();
  //   let isLogged = await actions.login(email, password);
  //   console.log("is Logged:", isLogged);
  //   if (isLogged) {
  //     // Connexion réussie
  //     navigate("/");
  //   } else {
  //     // Connexion échouée
  //     setLoginError("Email and/or password are incorrect");
  //   }
  // }

    //   // Create empty context
    // const FormikContext = React.createContext({});
    
    // // Place all of what’s returned by useFormik into context
    // export const Formik = ({ children, ...props }) => {
    //   const formikStateAndHelpers = useFormik(props);
    //   return (
    //     <FormikContext.Provider value={formikStateAndHelpers}>
    //       {typeof children === 'function'
    //         ? children(formikStateAndHelpers)
    //         : children}
    //     </FormikContext.Provider>
    //   );
    // };

  // const formik = useFormik({
  //   initialValues: {
  //     email: "",
  //     password: "",
  //   },
  //   validationSchema: Yup.object({
  //     email: Yup.string().email('Invalid email address').required('Obligatorio'),
  //     password: Yup.string()
  //       .min(8, 'Debe tener 8 carácteres o más')
  //       .required('Obligatorio'),
  //   }),
  //   onSubmit: values => {
  //     alert(JSON.stringify(values, null, 2));
  //   },
  // });

//   return (
//     <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
//       <div className="modal-dialog">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h1 className="modal-title fs-5 text-center" id="staticBackdropLabel"><strong>Identify</strong></h1>
//             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//           </div>
//           <div className="modal-body">
//             <form onSubmit={formik.handleSubmit}>
//               <div className="mb-3">
//                 <label htmlFor="email">Correo electrónico</label>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   value={formik.values.email}
//                 />
//                 {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="password">Contraseña</label>
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   value={formik.values.password}
//                 />
//                 {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
//               </div>

//               <Link to='/signup' > <span data-bs-dismiss="modal">¿Aún no tienes una cuenta? Click aquí!</span></Link>
//               <Link to='/forgot_password' > <span data-bs-dismiss="modal">¿Olvidaste la contraseña? Click aquí!</span></Link>

//               <div className="modal-footer">
//                 <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
//                 <button type="submit" className="btn btn-primary"><span data-bs-dismiss="modal">Entrar</span>  </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

export default LogIn