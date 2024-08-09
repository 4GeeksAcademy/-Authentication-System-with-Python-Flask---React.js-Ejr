import React, {useContext}from "react";
import{Context} from "../store/appContext"
import "../../styles/login.css";
import Logo from "../../../../public/images/nutri-logo-icon-b.png";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
const LogIn = () => {
    const{actions} = useContext(Context)
    return (
        <div className="login-body d-flex justify-content-center align-items-center">


            <div className="h-75 bg-light rounded col-12 col-lg-6 container container-login">
                <div className="header-container mt-5 h-25 d-flex align-items-center justify-content-between">
                    <div className="logo-img-container d-flex">
                        <img className="logo-img" src={Logo} alt="logo-nutri-4-well" />
                    </div>
                    <h1 className="text-center header-login-title">
                        Inicio de sesión
                    </h1>
                </div>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={Yup.object({
                        email: Yup.string().email('Ingresa un correo válido').required('Requerido'),
                        password: Yup.string().required('Contraseña inválida'),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        // setTimeout(() => {
                        //     alert(JSON.stringify(values, null, 2));
                        //     setSubmitting(false);
                        // }, 400);
                        console.log(values);
                        actions.login(values.email,values.password)
                        
                    }}
                >

                    <Form className="row g-3 d-flex flex-column justify-content-center align-items-center">
                        <div className="col-auto w-75">
                            <Field name="email" type="email" className="form-control" id="exampleFormControlInput1" placeholder="Correo electrónico" />
                            <ErrorMessage name="email" />
                        </div>
                        <div className="col-auto w-75">
                            <Field name="password" type="password" className="form-control" id="inputPassword2" placeholder="Contraseña" />
                            <ErrorMessage name="password" />
                        </div>
                        <div className="register-link-container d-flex justify-content-center">
                            <Link className="register-link" to='/register'>Registrarse</Link>
                        </div>
                        <div className="col-auto d-flex justify-content-center w-100">
                            <button type="submit" className="btn btn-login mb-3 p-2 w-75">Iniciar sesión</button>
                        </div>

                    </Form>
                </Formik>
            </div>
        </div>
    );

}



export default LogIn;
